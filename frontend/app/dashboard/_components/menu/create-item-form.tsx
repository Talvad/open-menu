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
      <summary className={`inline-flex cursor-pointer`}>
        <div className='inline-flex items-center justify-center rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-amber-700 disabled:opacity-50'>
          + Add item to {group.name}
        </div>
      </summary>
      <form action={formAction}>
        <FormError state={state} />
        <input type='hidden' name='shopId' value={shop.id} />
        <ItemFields
          shopId={shop.id}
          groups={groups}
          shopType={shop.type}
          defaultGroupId={group.id}
        />
        <Button type='submit' disabled={isPending} size='sm'>
          {isPending ? 'Saving item...' : 'Save item'}
        </Button>
      </form>
    </details>
  );
}
