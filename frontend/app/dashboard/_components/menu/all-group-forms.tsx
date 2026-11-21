import { MenuGroup, MenuItem, Shop } from '@/lib/types';
import EditGroupForm from './edit-group-form';
import CreateItemForm from './create-item-form';
import ItemRow from './item-row';
import { formatMoney } from '@/lib/format';

type Props = {
  shop: Shop;
  groups: MenuGroup[];
  items: MenuItem[];
};

export default function AllGroupForm({ shop, groups = [], items = [] }: Props) {
  const money = (n: number) => formatMoney(n, shop.currency);
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
            <ul className='mt-4 divide-y divide-stone-100'>
              {groupItems.map((item) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  shopId={shop.id}
                  groups={groups}
                  price={money(item.price)}
                />
              ))}
            </ul>
            <CreateItemForm groups={groups} group={group} shop={shop} />
          </div>
        );
      })}
    </>
  );
}
