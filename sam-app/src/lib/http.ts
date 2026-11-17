import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda'
import type { ZodType } from 'zod'

export type ApiEvent = APIGatewayProxyEventV2WithJWTAuthorizer

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
  }
}

export interface Result {
  status: number
  body: unknown
}

export const ok = (body: unknown): Result => ({ status: 200, body })
export const created = (body: unknown): Result => ({ status: 201, body })

export function json(status: number, body: unknown, headers: Record<string, string> = {}) {
  return {
    statusCode: status,
    headers: { 'content-type': 'application/json', ...headers },
    body: JSON.stringify(body),
  }
}

export function errorResponse(e: unknown) {
  if (e instanceof HttpError) return json(e.status, { message: e.message })
  console.error('Unhandled error', e)
  return json(500, { message: 'Something went wrong' })
}

export function parseBody<T>(event: { body?: string | undefined; isBase64Encoded?: boolean }, schema: ZodType<T>): T {
  let raw: unknown
  try {
    const text = event.body
      ? event.isBase64Encoded
        ? Buffer.from(event.body, 'base64').toString('utf8')
        : event.body
      : '{}'
    raw = JSON.parse(text)
  } catch {
    throw new HttpError(400, 'Body must be valid JSON')
  }
  const parsed = schema.safeParse(raw)
  if (!parsed.success) {
    const msg = parsed.error.issues
      .slice(0, 3)
      .map((i) => (i.path.length ? `${i.path.join('.')}: ${i.message}` : i.message))
      .join('; ')
    throw new HttpError(400, msg || 'Invalid request')
  }
  return parsed.data
}
