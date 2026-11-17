import {
  deleteGroupAction,
  deleteItemAction,
  saveGroupAction,
  saveItemAction,
  toggleItemAction,
} from '@/actions/menu';
import { formatMoney } from '@/lib/format';
import { ActionForm } from './ActionForm';
import { ImageUpload } from './ImageUpload';
import { ui } from './ui';
import { ShopMenu, MenuGroup, MenuItem } from '@/lib/types';

/**
 * Group + item management. Used by the owner dashboard AND the admin "edit as owner" screen:
 * it only needs a ShopMenu, and the API decides who may write.
 */
export function MenuManager({ menu }: { menu: ShopMenu }) {
  const { shop, groups, items } = menu;
  const money = (n: number) => formatMoney(n, shop.currency);

  return (
    <div className='space-y-6'>
      <details className={ui.card}>
        <summary className='cursor-pointer font-semibold'>
          + Add a group
        </summary>
        <ActionForm
          action={saveGroupAction}
          submitLabel='Add group'
          resetOnSuccess
          className='mt-4 space-y-3'
        >
          <input type='hidden' name='shopId' value={shop.id} />
          <GroupFields />
        </ActionForm>
      </details>

      {groups.length === 0 && (
        <p className='text-stone-500'>
          No groups yet. Add one (for example “Breakfast” or “Furniture”), then
          add items to it.
        </p>
      )}

      {groups.map((group) => {
        const groupItems = items.filter((i) => i.groupId === group.id);
        return (
          <section key={group.id} className={ui.card}>
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

            <div className='mt-2 flex flex-wrap gap-2'>
              <details className='w-full'>
                <summary
                  className={`${ui.btnSmall} inline-block cursor-pointer`}
                >
                  Edit group
                </summary>
                <div className='mt-3 space-y-3 rounded-lg bg-stone-50 p-3'>
                  <ActionForm
                    action={saveGroupAction}
                    submitLabel='Save group'
                    className='space-y-3'
                  >
                    <input type='hidden' name='shopId' value={shop.id} />
                    <input type='hidden' name='groupId' value={group.id} />
                    <GroupFields group={group} />
                  </ActionForm>
                  <ActionForm
                    action={deleteGroupAction}
                    submitLabel='Delete group and its items'
                    variant='danger'
                    confirm={`Delete "${group.name}" and all ${groupItems.length} item(s) in it?`}
                  >
                    <input type='hidden' name='shopId' value={shop.id} />
                    <input type='hidden' name='groupId' value={group.id} />
                  </ActionForm>
                </div>
              </details>
            </div>

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

            <details className='mt-4'>
              <summary
                className={`${ui.btnPrimary} inline-flex cursor-pointer`}
              >
                + Add item to {group.name}
              </summary>
              <ActionForm
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
              </ActionForm>
            </details>
          </section>
        );
      })}
    </div>
  );
}

function GroupFields({ group }: { group?: MenuGroup }) {
  return (
    <>
      <div className='grid gap-3 sm:grid-cols-[1fr_8rem]'>
        <div>
          <label className={ui.label}>Group name</label>
          <input
            name='name'
            required
            maxLength={60}
            defaultValue={group?.name}
            className={ui.input}
          />
        </div>
        <div>
          <label className={ui.label}>Order</label>
          <input
            name='sortOrder'
            type='number'
            min={0}
            defaultValue={group?.sortOrder ?? 0}
            className={ui.input}
          />
        </div>
      </div>
      <label className='flex items-center gap-2 text-sm'>
        <input
          type='checkbox'
          name='visible'
          defaultChecked={group?.visible ?? true}
        />
        Show this group on the public menu
      </label>
    </>
  );
}

function ItemRow({
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
          <img
            src={item.imageUrl}
            alt=''
            className='h-14 w-14 shrink-0 rounded-lg object-cover'
          />
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

      <div className='mt-2 flex flex-wrap items-start gap-2 pl-[4.25rem]'>
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
      </details>
    </li>
  );
}

function ItemFields({
  shopId,
  groups,
  item,
  defaultGroupId,
  shopType,
}: {
  shopId: string;
  groups: MenuGroup[];
  item?: MenuItem;
  defaultGroupId: string;
  shopType?: string;
}) {
  const attributes = item
    ? Object.entries(item.attributes)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n')
    : '';
  const attributeExample =
    shopType === 'furniture'
      ? 'Material: Teak\nSize: 6x4 ft'
      : 'Weight: 1 kg\nBrand: Amul';

  return (
    <>
      <div className='grid gap-3 sm:grid-cols-[1fr_9rem]'>
        <div>
          <label className={ui.label}>Item name</label>
          <input
            name='name'
            required
            maxLength={100}
            defaultValue={item?.name}
            className={ui.input}
          />
        </div>
        <div>
          <label className={ui.label}>Price</label>
          <input
            name='price'
            type='number'
            required
            min={0}
            step='0.01'
            inputMode='decimal'
            defaultValue={item?.price}
            className={ui.input}
          />
        </div>
      </div>

      <div>
        <label className={ui.label}>Description</label>
        <textarea
          name='description'
          rows={2}
          maxLength={400}
          defaultValue={item?.description}
          className={ui.input}
        />
      </div>

      <div className='grid gap-3 sm:grid-cols-[1fr_8rem]'>
        <div>
          <label className={ui.label}>Group</label>
          <select
            name='groupId'
            defaultValue={defaultGroupId}
            className={ui.input}
          >
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={ui.label}>Order</label>
          <input
            name='sortOrder'
            type='number'
            min={0}
            defaultValue={item?.sortOrder ?? 0}
            className={ui.input}
          />
        </div>
      </div>

      <div>
        <label className={ui.label}>Tags (comma separated)</label>
        <input
          name='tags'
          defaultValue={item?.tags.join(', ')}
          placeholder='veg, spicy, popular'
          className={ui.input}
        />
      </div>

      <div>
        <label className={ui.label}>
          Extra details (one per line, “Name: value”)
        </label>
        <textarea
          name='attributes'
          rows={2}
          defaultValue={attributes}
          placeholder={attributeExample}
          className={ui.input}
        />
      </div>

      <ImageUpload
        shopId={shopId}
        initialKey={item?.imageKey}
        initialUrl={item?.imageUrl}
      />

      <div className='flex flex-wrap gap-4 text-sm'>
        <label className='flex items-center gap-2'>
          <input
            type='checkbox'
            name='available'
            defaultChecked={item?.available ?? true}
          />
          Available (in stock)
        </label>
        <label className='flex items-center gap-2'>
          <input
            type='checkbox'
            name='visible'
            defaultChecked={item?.visible ?? true}
          />
          Show on the public menu
        </label>
      </div>
    </>
  );
}
