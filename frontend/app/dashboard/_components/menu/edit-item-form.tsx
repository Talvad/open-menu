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
};

export default function EditItemForm({ shopId, item, groups }: Props) {
  const [state, formAction, isPending] = useActionState(
    saveItemAction,
    undefined,
  );
  return (
    <details className='mt-2 pl-17'>
      <summary className='cursor-pointer text-sm text-amber-700'>Edit</summary>
      <form action={formAction} className=' p-4'>
        <FormError state={state} />
        <input type='hidden' name='shopId' value={shopId} />
        <input type='hidden' name='itemId' value={item.id} />
        <ItemFields
          shopId={shopId}
          groups={groups}
          item={item}
          defaultGroupId={item.groupId}
        />
        <Button type='submit' disabled={isPending} size='sm'>
          {isPending ? 'Saving Item..' : 'Save Item'}
        </Button>
      </form>
    </details>
  );
}
