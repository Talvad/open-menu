import type { PostConfirmationTriggerHandler } from 'aws-lambda';
import {
  AdminAddUserToGroupCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { ddb, keys, TABLE } from '../lib/db';

const cognito = new CognitoIdentityProviderClient({});

/**
 * Runs after a user confirms their email on the Hosted UI.
 * - adds the user to the "owner" group
 * - writes an owner profile record
 *
 * Failures are logged, not thrown: throwing here would block the user's sign-up.
 * The API treats every non-admin user as an owner anyway, so the group is a convenience.
 */
export const handler: PostConfirmationTriggerHandler = async (event) => {
  if (event.triggerSource !== 'PostConfirmation_ConfirmSignUp') return event;

  const { sub, email } = event.request.userAttributes;

  try {
    await cognito.send(
      new AdminAddUserToGroupCommand({
        UserPoolId: event.userPoolId,
        Username: event.userName,
        GroupName: 'owner',
      }),
    );
  } catch (e) {
    console.error('Could not add user to owner group', e);
  }

  try {
    await ddb.send(
      new PutCommand({
        TableName: TABLE,
        Item: {
          ...keys.ownerProfile(sub),
          entity: 'OWNER',
          sub,
          email,
          createdAt: new Date().toISOString(),
        },
        ConditionExpression: 'attribute_not_exists(PK)',
      }),
    );
  } catch (e) {
    console.error('Could not write owner profile', e);
  }

  return event;
};
