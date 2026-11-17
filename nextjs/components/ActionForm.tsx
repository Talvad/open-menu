'use client'

import { Fragment, startTransition, useActionState, useEffect, useState, type FormEvent, type ReactNode } from 'react'
import type { ActionState } from '@/actions/types'
import { ui } from './ui'

interface Props {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>
  submitLabel: string
  variant?: 'primary' | 'danger' | 'ghost' | 'small'
  /** Ask for confirmation before submitting. */
  confirm?: string
  /** Clear the form (and remount children, e.g. the image uploader) after a successful save. */
  resetOnSuccess?: boolean
  className?: string
  children?: ReactNode
}

const VARIANT = {
  primary: ui.btnPrimary,
  danger: ui.btnDanger,
  ghost: ui.btn,
  small: ui.btnSmall,
} as const

/**
 * A form wired to a Server Action with pending state and inline error/success messages.
 * Submits via onSubmit (not <form action>) so React does not wipe what the user typed when validation fails.
 */
export function ActionForm({
  action,
  submitLabel,
  variant = 'primary',
  confirm: confirmText,
  resetOnSuccess = false,
  className,
  children,
}: Props) {
  const [state, formAction, pending] = useActionState(action, {} as ActionState)
  const [resetKey, setResetKey] = useState(0)

  useEffect(() => {
    if (state.ok && resetOnSuccess) setResetKey((k) => k + 1)
  }, [state, resetOnSuccess])

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (confirmText && !window.confirm(confirmText)) return
    const formData = new FormData(e.currentTarget)
    startTransition(() => formAction(formData))
  }

  return (
    <form onSubmit={onSubmit} className={className}>
      <Fragment key={resetKey}>{children}</Fragment>
      <div className="flex items-center gap-3">
        <button type="submit" disabled={pending} className={VARIANT[variant]}>
          {pending ? 'Working…' : submitLabel}
        </button>
        {state.error && (
          <p role="alert" className="text-sm text-red-600">
            {state.error}
          </p>
        )}
        {!state.error && state.ok && state.message && <p className="text-sm text-green-700">{state.message}</p>}
      </div>
    </form>
  )
}
