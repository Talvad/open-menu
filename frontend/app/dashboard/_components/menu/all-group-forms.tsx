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
            className='rounded-2xl border border-[#e6ddd0] bg-paper p-4 shadow-[0_8px_24px_rgba(47,54,43,0.04)] sm:p-5'
          >
            <div className='flex flex-wrap items-center gap-2'>
              <h3 className='text-lg font-bold'>{group.name}</h3>
              {!group.visible && (
                <span className='rounded-full bg-[#eee8dd] px-2.5 py-1 text-[10px] font-semibold text-[#5f5c52]'>
                  Hidden
                </span>
              )}
              <span className='text-xs text-[#716e63]'>
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
