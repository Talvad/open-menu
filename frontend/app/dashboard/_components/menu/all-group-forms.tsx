import { MenuGroup, MenuItem } from '@/lib/types';
import EditGroupForm from './edit-group-form';

type Props = {
  shopId: string;
  groups: MenuGroup[];
  items: MenuItem[];
};

export default function AllGroupForm({
  shopId,
  groups = [],
  items = [],
}: Props) {
  if (groups.length === 0)
    return (
      <p className='text-stone-500'>
        No groups yet. Add one (for example “Breakfast” or “Furniture”), then
        add items to it.
      </p>
    );
  return (
    <>
      {groups.map((group) => {
        const groupItems = items.filter((i) => i.groupId === group.id);
        return (
          <div
            key={group.id}
            className='rounded-xl border border-stone-200 bg-white p-4 shadow-sm'
          >
            <div className='flex flex-wrap items-center gap-2'>
              <h3 className='text-lg font-bold'>{group.name}</h3>
              {!group.visible && (
                <span className='rounded-full bg-stone-200 px-2 py-0.5 text-xs'>
                  Hidden
                </span>
              )}
              <span className='text-xs text-stone-500'>
                {groupItems.length} item{groupItems.length === 1 ? '' : 's'}
              </span>
            </div>

            <EditGroupForm shopId={shopId} group={group} />

            <details className='mt-4'>
              <summary className={`inline-flex cursor-pointer`}>
                <div className='inline-flex items-center justify-center rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-amber-700 disabled:opacity-50'>
                  + Add item to {group.name}
                </div>
              </summary>
              <div className=' p-10'>hi</div>
              {/* <ActionForm
                action={saveItemAction}
                submitLabel='Add item'
                resetOnSuccess
                className='mt-4 space-y-3'
              >
                <input type='hidden' name='shopId' value={shop.id} />
                <ItemFields
                  shopId={shop.id}
                  groups={groups}
                  defaultGroupId={group.id}
                  shopType={shop.type}
                />
              </ActionForm> */}
            </details>
          </div>
        );
      })}
    </>
  );
}
