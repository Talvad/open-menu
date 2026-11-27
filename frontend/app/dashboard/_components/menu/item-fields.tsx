import { Field, FieldLabel } from '@/components/ui/field';
import Input from '@/components/ui/input';
import Select from '@/components/ui/select';
import Textarea from '@/components/ui/textarea';
import { MenuGroup, MenuItem } from '@/lib/types';
import { ImageUpload } from './image-upload';

type Props = {
  shopId: string;
  groups: MenuGroup[];
  item?: MenuItem;
  defaultGroupId: string;
  shopType?: string;
};

export default function ItemFields({
  shopId,
  groups,
  item,
  defaultGroupId,
  shopType,
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
  return (
    <>
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
