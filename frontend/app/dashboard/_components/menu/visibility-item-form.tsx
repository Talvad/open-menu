'use client';

import { toggleItemAction } from '@/actions/menu';
import Button from '@/components/ui/button';
import { useActionState } from 'react';

type Props = {
  shopId: string;
  itemId: string;
  visible: boolean;
};

export default function VisibilityItemForm({ shopId, itemId, visible }: Props) {
  const [state, formAction, isPending] = useActionState(
    toggleItemAction,
    undefined,
  );
  return (
    <form action={formAction}>
      <input type='hidden' name='shopId' value={shopId} />
      <input type='hidden' name='itemId' value={itemId} />
      <input type='hidden' name='field' value='visible' />
      <input type='hidden' name='value' value={String(!visible)} />
      <Button size='xs' variant='outline'>
        {isPending
          ? visible
            ? 'Hiding...'
            : 'Showing...'
          : visible
            ? 'Hide'
            : 'Show'}
      </Button>
    </form>
  );
}
