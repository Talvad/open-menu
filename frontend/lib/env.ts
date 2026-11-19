// Lazy getters: the app can build without secrets, and fails loudly the moment one is actually used.
// NOTE: no 'server-only' import here - proxy.ts uses this module.

function required(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing environment variable ${name}. See web/.env.example`)
  return value
}

export const env = {
  get appUrl() {
    return (process.env.APP_URL ?? 'http://localhost:3000').replace(/\/$/, '')
  },
  get apiUrl() {
    return required('API_URL').replace(/\/$/, '')
  },
  get cognitoDomain() {
    return required('COGNITO_DOMAIN').replace(/\/$/, '')
  },
  get clientId() {
    return required('COGNITO_CLIENT_ID')
  },
  get userPoolId() {
    return required('COGNITO_USER_POOL_ID')
  },
}
