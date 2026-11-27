'use client';
import { saveItemAction } from '@/actions/menu';
import Button from '@/components/ui/button';
import { FormError } from '@/components/ui/field';
import { MenuGroup, MenuItem } from '@/lib/types';
import { useActionState } from 'react';
import ItemFields from './item-fields';

type Props = {
  shopId: string;
  item: MenuItem;
  groups: MenuGroup[];
  shopTimeZone: string;
};

export default function EditItemForm({ shopId, item, groups, shopTimeZone }: Props) {
  const [state, formAction, isPending] = useActionState(
    saveItemAction,
    undefined,
  );
  return (
    <details className='mt-3 sm:pl-20'>
      <summary className='cursor-pointer list-none text-xs font-semibold text-primary underline decoration-primary/30 underline-offset-4 marker:hidden hover:decoration-primary'>
        Edit item details
      </summary>
      <form
        action={formAction}
        className='mt-3 rounded-2xl border border-[#e6ddd0] bg-background p-4 sm:p-5'
      >
        <FormError state={state} />
        <input type='hidden' name='shopId' value={shopId} />
        <input type='hidden' name='itemId' value={item.id} />
        <ItemFields
          shopId={shopId}
          groups={groups}
          item={item}
          shopTimeZone={shopTimeZone}
          defaultGroupId={item.groupId}
        />
        <Button type='submit' disabled={isPending} size='sm'>
          {isPending ? 'Saving changes…' : 'Save item changes'}
        </Button>
      </form>
    </details>
  );
}
