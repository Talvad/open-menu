import { MenuGroup, MenuItem } from '@/lib/types';
import Image from 'next/image';
import ToggleItemForm from './toggle-item-form';
import VisibilityItemForm from './visibility-item-form';
import DeleteItemForm from './delete-item-form';
import EditItemForm from './edit-item-form';

export default function ItemRow({
  item,
  shopId,
  shopTimeZone,
  groups,
  price,
}: {
  item: MenuItem;
  shopId: string;
  shopTimeZone: string;
  groups: MenuGroup[];
  price: string;
}) {
  return (
    <li className='py-4 first:pt-0'>
      <div className='flex items-start gap-3'>
        {item.imageUrl ? (
          <div className='relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-[#e6ddd0]'>
            <Image
              src={item.imageUrl}
              fill
              alt={item.name}
              className='rounded-lg object-cover'
            />
          </div>
        ) : (
          <div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#eee8dd] text-xs font-semibold text-[#898477]'>
            No photo
          </div>
        )}
        <div className='min-w-0 flex-1'>
          <div className='flex flex-wrap items-center gap-2'>
            <span className='font-semibold text-forest'>{item.name}</span>
            <span className='text-sm font-medium tabular-nums text-[#716e63]'>{price}</span>
            {!item.available && (
              <span className='rounded-full bg-[#f5dfd9] px-2.5 py-1 text-[10px] font-semibold text-[#943f32]'>
                Sold out
              </span>
            )}
            {!item.visible && (
              <span className='rounded-full bg-[#eee8dd] px-2.5 py-1 text-[10px] font-semibold text-[#5f5c52]'>
                Hidden
              </span>
            )}
          </div>
          {item.description && (
            <p className='mt-1 truncate text-sm text-[#716e63]'>
              {item.description}
            </p>
          )}
        </div>
      </div>

      <div className='mt-3 flex flex-wrap items-start gap-2 pl-0 sm:pl-20'>
        <ToggleItemForm
          shopId={shopId}
          itemId={item.id}
          available={item.available}
        />
        <VisibilityItemForm
          shopId={shopId}
          itemId={item.id}
          visible={item.visible}
        />
        <DeleteItemForm shopId={shopId} itemId={item.id} />
      </div>

      <EditItemForm
        shopId={shopId}
        item={item}
        groups={groups}
        shopTimeZone={shopTimeZone}
      />
    </li>
  );
}
