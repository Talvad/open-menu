import { saveShopAction } from '@/actions/shop';
import { ActionForm } from './ActionForm';
import { ui } from './ui';
import { SHOP_TYPES, TYPE_LABELS, CURRENCIES } from '@/lib/constants';
import { Shop } from '@/lib/types';

/** Create (no shop) or edit (shop) the shop details. The web address can only be chosen once. */
export function ShopForm({ shop }: { shop?: Shop }) {
  return (
    <ActionForm
      action={saveShopAction}
      submitLabel={shop ? 'Save changes' : 'Create shop'}
      className='space-y-4'
    >
      {shop && <input type='hidden' name='shopId' value={shop.id} />}

      <div>
        <label className={ui.label} htmlFor='name'>
          Shop name
        </label>
        <input
          id='name'
          name='name'
          required
          minLength={2}
          maxLength={80}
          defaultValue={shop?.name}
          className={ui.input}
        />
      </div>

      {!shop && (
        <div>
          <label className={ui.label} htmlFor='slug'>
            Web address
          </label>
          <div className='flex items-center gap-2'>
            <span className='text-sm text-stone-500'>/</span>
            <input
              id='slug'
              name='slug'
              required
              minLength={3}
              maxLength={40}
              pattern='[a-z0-9]+(-[a-z0-9]+)*'
              placeholder='my-shop'
              className={ui.input}
            />
          </div>
          <p className='mt-1 text-xs text-stone-500'>
            Lowercase letters, numbers and hyphens. It cannot be changed later.
          </p>
        </div>
      )}

      <div className='grid gap-4 sm:grid-cols-2'>
        <div>
          <label className={ui.label} htmlFor='type'>
            Type of shop
          </label>
          <select
            id='type'
            name='type'
            defaultValue={shop?.type ?? 'restaurant'}
            className={ui.input}
          >
            {SHOP_TYPES.map((t) => (
              <option key={t} value={t}>
                {TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={ui.label} htmlFor='currency'>
            Currency
          </label>
          <select
            id='currency'
            name='currency'
            defaultValue={shop?.currency ?? 'INR'}
            className={ui.input}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={ui.label} htmlFor='description'>
          Short description
        </label>
        <textarea
          id='description'
          name='description'
          rows={2}
          maxLength={300}
          defaultValue={shop?.description}
          className={ui.input}
        />
      </div>

      <div className='grid gap-4 sm:grid-cols-2'>
        <div>
          <label className={ui.label} htmlFor='phone'>
            Phone
          </label>
          <input
            id='phone'
            name='phone'
            maxLength={20}
            defaultValue={shop?.phone}
            className={ui.input}
          />
        </div>
        <div>
          <label className={ui.label} htmlFor='whatsapp'>
            WhatsApp number
          </label>
          <input
            id='whatsapp'
            name='whatsapp'
            maxLength={20}
            placeholder='919876543210'
            defaultValue={shop?.whatsapp}
            className={ui.input}
          />
          <p className='mt-1 text-xs text-stone-500'>
            With country code. Adds a “Send on WhatsApp” button to your menu.
          </p>
        </div>
      </div>

      <div>
        <label className={ui.label} htmlFor='address'>
          Address
        </label>
        <input
          id='address'
          name='address'
          maxLength={200}
          defaultValue={shop?.address}
          className={ui.input}
        />
      </div>
    </ActionForm>
  );
}
