'use client';
import { deleteGroupAction, saveGroupAction } from '@/actions/menu';
import { FormError } from '@/components/ui/field';
import { MenuGroup } from '@/lib/types';
import { useActionState } from 'react';
import GroupFields from './group-fields';
import Button from '@/components/ui/button';

type Props = {
  shopId: string;
  group: MenuGroup;
};

export default function EditGroupForm({ shopId, group }: Props) {
  const [state, formAction, isPending] = useActionState(
    saveGroupAction,
    undefined,
  );
  const [deletestate, deleteFormAction, isDeletePending] = useActionState(
    deleteGroupAction,
    undefined,
  );
  return (
    <details>
      <summary className='inline-flex cursor-pointer list-none rounded-full border border-[#d9d0c3] bg-paper px-3 py-1.5 text-xs font-semibold text-forest transition-colors hover:bg-[#eee8dd] marker:hidden'>
        Edit group
      </summary>
      <div className='m-2 space-y-3 rounded-2xl border border-[#e6ddd0] bg-background p-3 sm:m-3 sm:p-4'>
        <form action={formAction} className='rounded-xl bg-paper p-3 sm:p-4'>
          <FormError state={state} />
          <input type='hidden' name='shopId' value={shopId} />
          <input type='hidden' name='groupId' value={group.id} />
          <GroupFields group={group} />

          <Button type='submit' disabled={isPending} size='sm'>
            {isPending ? 'Saving group…' : 'Save group'}
          </Button>
        </form>
        <form action={deleteFormAction} className='px-4'>
          <input type='hidden' name='shopId' value={shopId} />
          <input type='hidden' name='groupId' value={group.id} />

          <Button
            variant='outline'
            type='submit'
            disabled={isDeletePending}
            size='sm'
          >
            {isDeletePending ? 'Deleting group…' : 'Delete group'}
          </Button>
        </form>
      </div>
    </details>
  );
}
