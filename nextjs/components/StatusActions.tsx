import { setStatusAction } from '@/actions/admin';
import { ActionForm } from './ActionForm';
import { ui } from './ui';
import { Shop } from '@/lib/types';

/** Admin controls: which transitions are offered depends on the current status. */
export function StatusActions({ shop }: { shop: Shop }) {
  const s = shop.status;
  return (
    <div className='space-y-4'>
      {(s === 'PENDING' || s === 'REJECTED' || s === 'SUSPENDED') && (
        <ActionForm
          action={setStatusAction}
          submitLabel={s === 'SUSPENDED' ? 'Reinstate' : 'Approve'}
        >
          <input type='hidden' name='shopId' value={shop.id} />
          <input type='hidden' name='status' value='APPROVED' />
        </ActionForm>
      )}

      {(s === 'PENDING' || s === 'APPROVED') && (
        <ActionForm
          action={setStatusAction}
          submitLabel={s === 'PENDING' ? 'Reject' : 'Suspend'}
          variant='danger'
          className='space-y-2'
        >
          <input type='hidden' name='shopId' value={shop.id} />
          <input
            type='hidden'
            name='status'
            value={s === 'PENDING' ? 'REJECTED' : 'SUSPENDED'}
          />
          <input
            name='reason'
            maxLength={300}
            required={s === 'PENDING'}
            placeholder={
              s === 'PENDING'
                ? 'Reason shown to the owner (required)'
                : 'Reason (optional)'
            }
            className={ui.input}
          />
        </ActionForm>
      )}
    </div>
  );
}
