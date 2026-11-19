import type { Auth } from '../lib/auth'
import type { ApiEvent, Result } from '../lib/http'

export interface Ctx {
  event: ApiEvent
  auth: Auth
}

export type Handler = (ctx: Ctx) => Promise<Result>

export function pathParam(event: ApiEvent, name: string): string {
  return event.pathParameters?.[name] ?? ''
}
