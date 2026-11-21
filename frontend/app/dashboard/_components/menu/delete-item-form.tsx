'use client';

import { deleteItemAction, toggleItemAction } from '@/actions/menu';
import Button from '@/components/ui/button';
import { useActionState } from 'react';

type Props = {
  shopId: string;
  itemId: string;
};

export default function DeleteItemForm({ shopId, itemId }: Props) {
  const [state, formAction, isPending] = useActionState(
    deleteItemAction,
    undefined,
  );
  return (
    <form action={formAction}>
      <input type='hidden' name='shopId' value={shopId} />
      <input type='hidden' name='itemId' value={itemId} />
      <Button size='xs' variant='outline'>
        {isPending ? 'Deleting...' : 'Delete'}
      </Button>
    </form>
  );
}
