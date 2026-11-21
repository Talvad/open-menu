import { MenuGroup, MenuItem } from '@/lib/types';
import Image from 'next/image';

export default function ItemRow({
  item,
  shopId,
  groups,
  price,
}: {
  item: MenuItem;
  shopId: string;
  groups: MenuGroup[];
  price: string;
}) {
  return (
    <li className='py-3'>
      <div className='flex items-start gap-3'>
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <div className='relative h-14 w-14 shrink-0 rounded-lg'>
            <Image
              src={item.imageUrl}
              fill
              alt={item.name}
              className='rounded-lg object-cover'
            />
          </div>
        ) : (
          <div className='h-14 w-14 shrink-0 rounded-lg bg-stone-100' />
        )}
        <div className='min-w-0 flex-1'>
          <div className='flex flex-wrap items-center gap-2'>
            <span className='font-medium'>{item.name}</span>
            <span className='text-sm text-stone-600'>{price}</span>
            {!item.available && (
              <span className='rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700'>
                Sold out
              </span>
            )}
            {!item.visible && (
              <span className='rounded-full bg-stone-200 px-2 py-0.5 text-xs'>
                Hidden
              </span>
            )}
          </div>
          {item.description && (
            <p className='truncate text-sm text-stone-500'>
              {item.description}
            </p>
          )}
        </div>
      </div>

      {/* <div className='mt-2 flex flex-wrap items-start gap-2 pl-[4.25rem]'>
        <ActionForm
          action={toggleItemAction}
          submitLabel={item.available ? 'Mark sold out' : 'Mark available'}
          variant='small'
        >
          <input type='hidden' name='shopId' value={shopId} />
          <input type='hidden' name='itemId' value={item.id} />
          <input type='hidden' name='field' value='available' />
          <input type='hidden' name='value' value={String(!item.available)} />
        </ActionForm>
        <ActionForm
          action={toggleItemAction}
          submitLabel={item.visible ? 'Hide' : 'Show'}
          variant='small'
        >
          <input type='hidden' name='shopId' value={shopId} />
          <input type='hidden' name='itemId' value={item.id} />
          <input type='hidden' name='field' value='visible' />
          <input type='hidden' name='value' value={String(!item.visible)} />
        </ActionForm>
        <ActionForm
          action={deleteItemAction}
          submitLabel='Delete'
          variant='small'
          confirm={`Delete "${item.name}"?`}
        >
          <input type='hidden' name='shopId' value={shopId} />
          <input type='hidden' name='itemId' value={item.id} />
        </ActionForm>
      </div>

      <details className='mt-2 pl-[4.25rem]'>
        <summary className='cursor-pointer text-sm text-amber-700'>
          Edit
        </summary>
        <ActionForm
          action={saveItemAction}
          submitLabel='Save item'
          className='mt-3 space-y-3 rounded-lg bg-stone-50 p-3'
        >
          <input type='hidden' name='shopId' value={shopId} />
          <input type='hidden' name='itemId' value={item.id} />
          <ItemFields
            shopId={shopId}
            groups={groups}
            item={item}
            defaultGroupId={item.groupId}
          />
        </ActionForm>
      </details> */}
    </li>
  );
}
