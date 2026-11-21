import { MenuGroup, MenuItem, Shop } from '@/lib/types';
import EditGroupForm from './edit-group-form';
import CreateItemForm from './create-item-form';

type Props = {
  shop: Shop;
  groups: MenuGroup[];
  items: MenuItem[];
};

export default function AllGroupForm({ shop, groups = [], items = [] }: Props) {
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

            <EditGroupForm shopId={shop.id} group={group} />
            <CreateItemForm groups={groups} group={group} shop={shop} />
          </div>
        );
      })}
    </>
  );
}
