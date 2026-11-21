import { ShopMenu } from '@/lib/types';
import CreateGroupForm from './create-group-form';
import AllGroupForm from './all-group-forms';

type Props = { menu: ShopMenu };

export default function MenuManager({ menu }: Props) {
  const { shop, groups, items } = menu;
  return (
    <div className='space-y-6'>
      <CreateGroupForm shopId={shop.id} />
      <AllGroupForm shopId={shop.id} groups={groups} items={items} />
    </div>
  );
}
