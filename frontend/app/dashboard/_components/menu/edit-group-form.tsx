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
      <summary className='inline rounded-md border border-stone-300 bg-white px-2 py-1 text-xs hover:bg-stone-100 disabled:opacity-50 cursor-pointer font-semibold'>
        Edit group
      </summary>
      <div className='p-4 border border-gray-300 rounded-2xl m-4'>
        <form action={formAction} className=' p-4'>
          <FormError state={state} />
          <input type='hidden' name='shopId' value={shopId} />
          <input type='hidden' name='groupId' value={group.id} />
          <GroupFields group={group} />

          <Button type='submit' disabled={isPending} size='sm'>
            {isPending ? 'Saving Group..' : ' Save Group'}
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
            {isDeletePending ? 'Deleting Group..' : ' Delete Group'}
          </Button>
        </form>
      </div>
    </details>
  );
}
