import { Field, FieldLabel } from '@/components/ui/field';
import Input from '@/components/ui/input';
import Select from '@/components/ui/select';
import Textarea from '@/components/ui/textarea';
import { MenuGroup, MenuItem } from '@/lib/types';
import { utcToLocalDateTime } from '@/lib/time-zone';
import { ImageUpload } from './image-upload';

type Props = {
  shopId: string;
  groups: MenuGroup[];
  item?: MenuItem;
  defaultGroupId: string;
  shopType?: string;
  shopTimeZone: string;
};

export default function ItemFields({
  shopId,
  groups,
  item,
  defaultGroupId,
  shopType,
  shopTimeZone,
}: Props) {
  const attributes = item
    ? Object.entries(item.attributes)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n')
    : '';
  const attributeExample =
    shopType === 'furniture'
      ? 'Material: Teak\nSize: 6x4 ft'
      : 'Weight: 1 kg\nBrand: Amul';
  const variantOptions =
    item?.variant?.options
      .map((option) => `${option.name}: ${option.priceAdjustment}`)
      .join('\n') ?? '';
  const extras =
    item?.extras
      .map((option) => `${option.name}: ${option.priceAdjustment}`)
      .join('\n') ?? '';
  return (
    <>
      <input type='hidden' name='shopTimeZone' value={shopTimeZone} />
      <div className='grid gap-3 sm:grid-cols-[1fr_9rem]'>
        <Field>
          <FieldLabel htmlFor='name'>Item name</FieldLabel>
          <Input
            id='name'
            name='name'
            required
            maxLength={100}
            defaultValue={item?.name}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor='price'>Price</FieldLabel>
          <Input
            id='price'
            name='price'
            type='number'
            required
            min={0}
            step='0.01'
            inputMode='decimal'
            defaultValue={item?.price}
          />
        </Field>
      </div>
      <Field>
        <FieldLabel htmlFor='description'>Description</FieldLabel>
        <Textarea
          id='description'
          name='description'
          rows={2}
          maxLength={400}
          defaultValue={item?.description}
        />
      </Field>

      <div className='grid gap-3 sm:grid-cols-[1fr_8rem]'>
        <Field>
          <FieldLabel htmlFor='groupId'>Group</FieldLabel>
          <Select id='groupId' name='groupId' defaultValue={defaultGroupId}>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor='sortOrder'>Order</FieldLabel>
          <Input
            id='sortOrder'
            name='sortOrder'
            type='number'
            min={0}
            defaultValue={item?.sortOrder ?? 0}
          />
        </Field>
      </div>
      <Field>
        <FieldLabel htmlFor='tags'>Tags, separated by commas</FieldLabel>
        <Input
          id='tags'
          name='tags'
          defaultValue={item?.tags.join(', ')}
          placeholder='Vegetarian, house favourite'
        />
      </Field>
      <Field>
        <FieldLabel htmlFor='attributes'>
          Extra details, one per line
        </FieldLabel>
        <Textarea
          id='attributes'
          name='attributes'
          rows={2}
          defaultValue={attributes}
          placeholder={attributeExample}
        />
      </Field>

      <div className='rounded-xl border border-[#e6ddd0] bg-paper p-4'>
        <h3 className='font-semibold text-forest'>Variants and extras</h3>
        <p className='mt-1 text-xs leading-5 text-[#625f55]'>
          Prices below are added to the item price. Add one choice per line as
          “Name: extra price”.
        </p>
        <Field className='mt-3'>
          <FieldLabel htmlFor='variantName'>Required choice group</FieldLabel>
          <Input
            id='variantName'
            name='variantName'
            defaultValue={item?.variant?.name}
            placeholder='Size'
          />
        </Field>
        <Field className='mt-3'>
          <FieldLabel htmlFor='variantOptions'>Choices</FieldLabel>
          <Textarea
            id='variantOptions'
            name='variantOptions'
            rows={3}
            defaultValue={variantOptions}
            placeholder={'Regular: 0\nLarge: 25'}
          />
        </Field>
        <Field className='mt-3'>
          <FieldLabel htmlFor='extras'>Optional extras</FieldLabel>
          <Textarea
            id='extras'
            name='extras'
            rows={3}
            defaultValue={extras}
            placeholder={'Extra cheese: 20\nOat milk: 15'}
          />
        </Field>
      </div>

      <div className='rounded-xl border border-[#e6ddd0] bg-paper p-4'>
        <h3 className='font-semibold text-forest'>Schedule an offer or status</h3>
        <p className='mt-1 text-xs leading-5 text-[#625f55]'>
          Times use your shop time zone ({shopTimeZone}). The regular
          availability resumes after the schedule ends.
        </p>
        <div className='mt-3 grid gap-3 sm:grid-cols-2'>
          <Field>
            <FieldLabel htmlFor='scheduleStartsAt'>Starts</FieldLabel>
            <Input
              id='scheduleStartsAt'
              name='scheduleStartsAt'
              type='datetime-local'
              defaultValue={
                item?.schedule
                  ? utcToLocalDateTime(item.schedule.startsAt, shopTimeZone)
                  : ''
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor='scheduleEndsAt'>Ends</FieldLabel>
            <Input
              id='scheduleEndsAt'
              name='scheduleEndsAt'
              type='datetime-local'
              defaultValue={
                item?.schedule
                  ? utcToLocalDateTime(item.schedule.endsAt, shopTimeZone)
                  : ''
              }
            />
          </Field>
        </div>
        <div className='mt-3 grid gap-3 sm:grid-cols-2'>
          <Field>
            <FieldLabel htmlFor='scheduleAvailability'>
              Availability during the window
            </FieldLabel>
            <Select
              id='scheduleAvailability'
              name='scheduleAvailability'
              defaultValue={
                item?.schedule?.availability === undefined
                  ? 'unchanged'
                  : item.schedule.availability
                    ? 'available'
                    : 'sold-out'
              }
            >
              <option value='unchanged'>Keep regular availability</option>
              <option value='available'>Available</option>
              <option value='sold-out'>Mark sold out</option>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor='scheduleSpecialPrice'>
              Special price (optional)
            </FieldLabel>
            <Input
              id='scheduleSpecialPrice'
              name='scheduleSpecialPrice'
              type='number'
              min={0}
              step='0.01'
              inputMode='decimal'
              defaultValue={item?.schedule?.specialPrice}
            />
          </Field>
        </div>
        <Field className='mt-3'>
          <FieldLabel htmlFor='scheduleLabel'>Offer label (optional)</FieldLabel>
          <Input
            id='scheduleLabel'
            name='scheduleLabel'
            maxLength={60}
            defaultValue={item?.schedule?.label}
            placeholder='Lunch special'
          />
        </Field>
        {item?.schedule && (
          <label className='mt-3 flex items-center gap-2 text-sm text-forest'>
            <input type='checkbox' name='clearSchedule' />
            Clear this schedule
          </label>
        )}
      </div>

      <ImageUpload
        shopId={shopId}
        initialKey={item?.imageKey}
        initialUrl={item?.imageUrl}
      />

      <Field className='flex flex-wrap gap-4 text-sm'>
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
      </Field>
    </>
  );
}
