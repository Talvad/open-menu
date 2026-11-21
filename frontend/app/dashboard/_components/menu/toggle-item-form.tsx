'use client';

import { toggleItemAction } from '@/actions/menu';
import Button from '@/components/ui/button';
import { useActionState } from 'react';

type Props = {
  shopId: string;
  itemId: string;
  available: boolean;
};

export default function ToggleItemForm({ shopId, itemId, available }: Props) {
  const [state, formAction, isPending] = useActionState(
    toggleItemAction,
    undefined,
  );
  return (
    <form action={formAction}>
      <input type='hidden' name='shopId' value={shopId} />
      <input type='hidden' name='itemId' value={itemId} />
      <input type='hidden' name='field' value='available' />
      <input type='hidden' name='value' value={String(!available)} />
      <Button size='xs' variant='outline'>
        {isPending
          ? available
            ? 'Marking as sold...'
            : 'Marking as available...'
          : available
            ? 'Mark sold out'
            : 'Mark available'}
      </Button>
    </form>
  );
}
