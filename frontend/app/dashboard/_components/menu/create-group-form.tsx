'use client';
import { saveGroupAction } from '@/actions/menu';
import Button from '@/components/ui/button';
import { Field, FieldLabel, FormError } from '@/components/ui/field';
import Input from '@/components/ui/input';
import { MenuGroup } from '@/lib/types';
import { useActionState } from 'react';
import GroupFields from './group-fields';

type Props = {
  shopId: string;
  group?: MenuGroup;
};

export default function CreateGroupForm({ shopId, group }: Props) {
  const [state, formAction, isPending] = useActionState(
    saveGroupAction,
    undefined,
  );
  return (
    <details className='rounded-xl border border-stone-200 bg-white p-4 shadow-sm'>
      <summary className='cursor-pointer font-semibold'>+ Add a group</summary>
      <div className='p-4'>
        <form
          action={formAction}
          className='border border-gray-300 rounded-2xl p-4'
        >
          <FormError state={state} />
          <input type='hidden' name='shopId' value={shopId} />
          <GroupFields />
          <Button type='submit' disabled={isPending} size='sm'>
            {isPending ? 'Adding Group..' : ' Add Group'}
          </Button>
        </form>
      </div>
    </details>
  );
}
