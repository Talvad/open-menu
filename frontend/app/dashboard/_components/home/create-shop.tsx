import CreateShopForm from './create-shop-form';
import { Check } from 'lucide-react';

export default function CreateShop() {
  return (
    <section className='mx-auto max-w-5xl pb-14 pt-6 font-sans sm:pt-10'>
      <p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-primary'>
        Your next chapter starts here
      </p>
      <h1 className='mt-3 font-bricolage text-4xl font-bold tracking-[-0.06em] text-forest sm:text-5xl'>
        Let’s put your shop on the map.
      </h1>
      <p className='mt-3 max-w-2xl text-sm leading-6 text-[#716e63] sm:text-base sm:leading-7'>
        Tell us a little about your business. Once your shop is approved, your
        very own menu link is ready to share.
      </p>

      <div className='mt-8 grid items-start gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.7fr)]'>
        <CreateShopForm />

        <aside className='rounded-2xl border border-[#d9e2d3] bg-[#edf1e8] p-5 sm:p-6'>
          <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-forest'>
            From here to live
          </p>
          <h2 className='mt-2 font-bricolage text-xl font-bold tracking-[-0.04em] text-forest'>
            A few small steps.
          </h2>
          <ol className='mt-5 space-y-4'>
            {[
              'Your shop joins the review queue.',
              'Add groups and items while you wait.',
              'Once approved, your shareable menu is live.',
            ].map((step) => (
              <li key={step} className='flex gap-3 text-sm leading-5 text-[#586657]'>
                <Check aria-hidden='true' className='mt-0.5 h-4 w-4 shrink-0 text-primary' />
                {step}
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}
