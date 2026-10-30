import { Metadata } from 'next';
import { SettingsForm } from './_components/settings-form';

export const metadata: Metadata = {
  title: 'Dashboard | Settings',
};
export default function DashboardSettingsPage() {
  return (
    <div className='space-y-6'>
      <SettingsForm />
    </div>
  );
}
