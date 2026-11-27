'use client';
import { MenuGroup, Shop } from '@/lib/types';
import ItemFields from './item-fields';
import Button from '@/components/ui/button';
import { useActionState } from 'react';
import { saveItemAction } from '@/actions/menu';
import { FormError } from '@/components/ui/field';

type Props = {
  group: MenuGroup;
  groups: MenuGroup[];
  shop: Shop;
};

export default function CreateItemForm({ shop, group, groups }: Props) {
  const [state, formAction, isPending] = useActionState(
    saveItemAction,
    undefined,
  );
  return (
    <details className='mt-4'>
      <summary className='inline-flex cursor-pointer list-none items-center gap-2 rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-[#19382e] marker:hidden'>
        <span aria-hidden='true'>+</span>
        Add an item
      </summary>
      <form
        action={formAction}
        className='mt-4 rounded-2xl border border-[#e6ddd0] bg-background p-4 sm:p-5'
      >
        <FormError state={state} />
        <input type='hidden' name='shopId' value={shop.id} />
        <ItemFields
          shopId={shop.id}
          groups={groups}
          shopType={shop.type}
          defaultGroupId={group.id}
        />
        <Button type='submit' disabled={isPending} size='sm'>
          {isPending ? 'Saving item…' : `Save ${group.name} item`}
        </Button>
      </form>
    </details>
  );
}
