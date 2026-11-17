import type { PreSignUpTriggerHandler } from 'aws-lambda'
import {
  AdminLinkProviderForUserCommand,
  CognitoIdentityProviderClient,
  ListUsersCommand,
} from '@aws-sdk/client-cognito-identity-provider'

const cognito = new CognitoIdentityProviderClient({})

/**
 * Runs before a user is created. For a first-time Google sign-in (PreSignUp_ExternalProvider) it looks for an
 * existing email/password user with the same email and links the Google identity to it, so both ways of signing in
 * land in ONE account (same `sub`, same shop, same groups).
 *
 * Safety: we only link when Google says the email is verified AND the existing account's email is verified.
 * Linking to an unverified account would let someone pre-register a victim's email and take over their Google login.
 *
 * Any failure is logged and the sign-in continues (a separate account is created instead). Never throw here.
 */
export const handler: PreSignUpTriggerHandler = async (event) => {
  if (event.triggerSource !== 'PreSignUp_ExternalProvider') return event

  const attrs = event.request.userAttributes
  const email = attrs.email?.trim().toLowerCase()
  if (!email || attrs.email_verified !== 'true' || /["\\]/.test(email)) return event

  // userName looks like "Google_109876543210987654321"
  const sep = event.userName.indexOf('_')
  if (sep < 1) return event
  const providerName = event.userName.slice(0, sep)
  const providerUserId = event.userName.slice(sep + 1)

  try {
    const found = await cognito.send(
      new ListUsersCommand({ UserPoolId: event.userPoolId, Filter: `email = "${email}"`, Limit: 10 }),
    )
    const native = found.Users?.find(
      (u) =>
        u.UserStatus !== 'EXTERNAL_PROVIDER' &&
        u.Attributes?.some((a) => a.Name === 'email_verified' && a.Value === 'true'),
    )
    if (!native?.Username) return event

    await cognito.send(
      new AdminLinkProviderForUserCommand({
        UserPoolId: event.userPoolId,
        DestinationUser: { ProviderName: 'Cognito', ProviderAttributeValue: native.Username },
        SourceUser: {
          ProviderName: providerName,
          ProviderAttributeName: 'Cognito_Subject',
          ProviderAttributeValue: providerUserId,
        },
      }),
    )
  } catch (e) {
    console.error('Could not link Google account to existing user', e)
  }
  return event
}
