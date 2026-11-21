import { Field, FieldLabel } from '@/components/ui/field';
import Input from '@/components/ui/input';
import { MenuGroup } from '@/lib/types';

type Props = {
  group?: MenuGroup;
};

export default function GroupFields({ group }: Props) {
  return (
    <>
      <div className='grid gap-3 sm:grid-cols-[1fr_8rem]'>
        <Field>
          <FieldLabel htmlFor='name'>Group name</FieldLabel>
          <Input
            name='name'
            id='name'
            required
            defaultValue={group?.name}
            placeholder='Group name'
          />
        </Field>
        <Field>
          <FieldLabel htmlFor='sortOrder'>Order</FieldLabel>
          <Input
            type='number'
            min={0}
            defaultValue={group?.sortOrder ?? 0}
            name='sortOrder'
            id='sortOrder'
          />
        </Field>
      </div>
      <Field className='flex items-center gap-4'>
        <Input
          type='checkbox'
          name='visible'
          id='visible'
          defaultChecked={group?.visible ?? true}
          className='size-4!'
        />
        <label htmlFor='visible'>Show this group on the public menu</label>
      </Field>
    </>
  );
}
