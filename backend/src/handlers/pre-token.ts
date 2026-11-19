/**
 * Cognito "Pre token generation" trigger, event version V2_0 (needs the Essentials or Plus feature plan).
 * Runs every time tokens are issued: sign-in AND refresh, so group changes show up within one token lifetime.
 *
 * It turns group membership into OAuth scopes on the ACCESS token, which API Gateway's JWT authorizer enforces
 * per route before any Lambda runs:
 *   owner  → openmenu/shop.read, openmenu/shop.write
 *   admin  → the two above + openmenu/admin
 * and adds two small custom claims (om_role, om_email) because access tokens carry no email by default.
 *
 * Only this trigger can grant these scopes (they are not defined on the app client), so users cannot ask for them.
 * Must never throw: an exception here blocks sign-in.
 */

import { SCOPES } from '../lib/constants';

// Minimal local types: avoids depending on a specific @types/aws-lambda version for the V2 event shape.
interface PreTokenGenerationV2Event {
  triggerSource: string;
  request: {
    userAttributes: Record<string, string>;
    groupConfiguration?: { groupsToOverride?: string[] };
  };
  response: {
    claimsAndScopeOverrideDetails?: {
      accessTokenGeneration?: {
        claimsToAddOrOverride?: Record<string, string>;
        scopesToAdd?: string[];
      };
    };
  };
}

export const handler = async <T extends PreTokenGenerationV2Event>(
  event: T,
): Promise<T> => {
  const groups = event.request.groupConfiguration?.groupsToOverride ?? [];
  const isAdmin = groups.includes('admin');

  const scopesToAdd: string[] = [SCOPES.shopRead, SCOPES.shopWrite];
  if (isAdmin) scopesToAdd.push(SCOPES.admin);

  event.response = {
    claimsAndScopeOverrideDetails: {
      accessTokenGeneration: {
        scopesToAdd,
        claimsToAddOrOverride: {
          om_role: isAdmin ? 'admin' : 'owner',
          om_email: event.request.userAttributes.email ?? '',
        },
      },
    },
  };
  return event;
};
