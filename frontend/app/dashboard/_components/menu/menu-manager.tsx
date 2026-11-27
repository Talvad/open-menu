import { ShopMenu } from '@/lib/types';
import CreateGroupForm from './create-group-form';
import AllGroupForm from './all-group-forms';
import NoGroupIndicator from './no-group-indicator';
import { MenuCsvTools } from './menu-csv-tools';

type Props = { menu: ShopMenu };

export default function MenuManager({ menu }: Props) {
  const { shop, groups, items } = menu;
  return (
    <div className='space-y-6'>
      <MenuCsvTools shopId={shop.id} groups={groups} items={items} />
      <CreateGroupForm shopId={shop.id} />
      {groups.length === 0 && <NoGroupIndicator />}
      <AllGroupForm shop={shop} groups={groups} items={items} />
    </div>
  );
}
