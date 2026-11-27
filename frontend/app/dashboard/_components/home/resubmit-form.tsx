'use client';

import { resubmitShopAction } from '@/actions/shop';
import Button from '@/components/ui/button';
import { FormError } from '@/components/ui/field';
import { useActionState } from 'react';

export function ResubmitButton({ shopId }: { shopId: string }) {
  const [state, formAction, isPending] = useActionState(
    resubmitShopAction,
    undefined,
  );
  return (
    <form action={formAction}>
      <FormError state={state} />
      <input type='hidden' name='shopId' value={shopId} />
      <Button type='submit' size='sm'>
        {isPending
          ? 'Sending it back for review…'
          : 'Resubmit for review'}
      </Button>
    </form>
  );
}
