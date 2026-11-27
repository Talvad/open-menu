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
        <span className='rounded-full border border-[#d9d0c3] bg-paper px-3 py-1.5 text-xs font-semibold text-[#716e63] transition-colors hover:border-[#c94f3d] hover:text-primary'>
          {isPending ? 'Deleting...' : 'Delete'}
        </span>
      </DropdownTrigger>
      <DropdownMenu className='p-0! min-w-fit'>
        <DropdownItem className='p-0!'>
          <form action={formAction}>
            <input type='hidden' name='shopId' value={shopId} />
            <input type='hidden' name='itemId' value={itemId} />
            <button type='submit' className='cursor-pointer px-3 py-2 text-xs font-semibold text-primary'>
              Delete item
            </button>
          </form>
        </DropdownItem>
      </DropdownMenu>
    </DropdownRoot>
  );
}
