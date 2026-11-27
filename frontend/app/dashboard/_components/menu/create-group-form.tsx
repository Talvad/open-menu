'use client';
import { saveGroupAction } from '@/actions/menu';
import Button from '@/components/ui/button';
import { FormError } from '@/components/ui/field';
import { useActionState } from 'react';
import GroupFields from './group-fields';

export default function CreateGroupForm({ shopId }: { shopId: string }) {
  const [state, formAction, isPending] = useActionState(
    saveGroupAction,
    undefined,
  );
  return (
    <details className='overflow-hidden rounded-2xl border border-dashed border-[#c9bba8] bg-paper'>
      <summary className='cursor-pointer list-none px-5 py-4 font-semibold text-forest marker:hidden hover:bg-white'>
        <span className='mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#f5dfd9] text-primary'>
          +
        </span>
        Add a menu group
      </summary>
      <div className='border-t border-[#eee7dc] bg-background p-4 sm:p-5'>
        <form
          action={formAction}
          className='rounded-2xl border border-[#e6ddd0] bg-paper p-4 sm:p-5'
        >
          <FormError state={state} />
          <input type='hidden' name='shopId' value={shopId} />
          <GroupFields />
          <Button type='submit' disabled={isPending} size='sm'>
            {isPending ? 'Adding group…' : 'Add group'}
          </Button>
        </form>
      </div>
    </details>
  );
}
