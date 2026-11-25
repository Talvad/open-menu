'use client';

import { deleteItemAction, toggleItemAction } from '@/actions/menu';
import Button from '@/components/ui/button';
import {
  DropdownItem,
  DropdownMenu,
  DropdownRoot,
  DropdownTrigger,
} from '@/components/ui/dropdown';
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
    <DropdownRoot>
      <DropdownTrigger>
        <span className='px-1 py-0.5 rounded-xs text-xs border border-primary text-primary bg-transparent transition-colors hover:bg-stone-50'>
          {isPending ? 'Deleting...' : 'Delete'}
        </span>
      </DropdownTrigger>
      <DropdownMenu className='p-0! min-w-fit'>
        <DropdownItem className='p-0!'>
          <form action={formAction}>
            <input type='hidden' name='shopId' value={shopId} />
            <input type='hidden' name='itemId' value={itemId} />
            <button type='submit' className=' px-3 py-1 text-xs font-semibold'>
              Confirm
            </button>
          </form>
        </DropdownItem>
      </DropdownMenu>
    </DropdownRoot>
  );
}
