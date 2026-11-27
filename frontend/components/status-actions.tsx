'use client';
import { setStatusAction } from '@/actions/admin';
import { Shop } from '@/lib/types';
import { useActionState } from 'react';
import Button from './ui/button';
import Input from './ui/input';
import { Field, FormError } from './ui/field';

/** Admin controls: which transitions are offered depends on the current status. */
export function StatusActions({ shop }: { shop: Shop }) {
  const [state, formAction, isPending] = useActionState(
    setStatusAction,
    undefined,
  );
  const s = shop.status;

  return (
    <div className='space-y-4'>
      <FormError state={state} />
      {(s === 'PENDING' || s === 'REJECTED' || s === 'SUSPENDED') && (
        <form action={formAction}>
          <input type='hidden' name='shopId' value={shop.id} />
          <input type='hidden' name='status' value='APPROVED' />
          <Button type='submit' size='xs' variant='outline' disabled={isPending}>
            {s === 'SUSPENDED' ? 'Restore shop' : 'Approve shop'}
          </Button>
        </form>
      )}

      {(s === 'PENDING' || s === 'APPROVED') && (
        <form action={formAction}>
          <input type='hidden' name='shopId' value={shop.id} />
          <input
            type='hidden'
            name='status'
            value={s === 'PENDING' ? 'REJECTED' : 'SUSPENDED'}
          />
          <Field>
            <Input
              name='reason'
              maxLength={300}
              required={s === 'PENDING'}
              placeholder={
                s === 'PENDING'
                  ? 'Add a note for the owner (required)'
                  : 'Why are you pausing this shop? (optional)'
              }
            />
          </Field>
          <Button type='submit' size='xs' variant='outline' disabled={isPending}>
            {s === 'PENDING' ? 'Decline shop' : 'Pause shop'}
          </Button>
        </form>
      )}
    </div>
  );
}
