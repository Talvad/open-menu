import CreateShopForm from './create-shop-form';

export default function CreateShop() {
  return (
    <section className={` mx-auto max-w-4xl px-4 pb-14 pt-10 font-sans`}>
      <h1 className='font-bricolage m-0 text-[34px] font-bold tracking-[-0.02em]'>
        Create your shop
      </h1>
      <p className='m-0 mt-2 max-w-140 text-base text-[#44403C]'>
        Tell us about your shop. An administrator reviews new shops before the
        public menu goes live.
      </p>

      <div className='mt-7 flex flex-wrap items-start gap-6'>
        {/* Form */}
        <CreateShopForm />

        {/* Info Sidebar */}
        <aside className='box-border max-w-[320px] flex-[1_1_260px] rounded-[14px] border border-[#FDE68A] bg-[#FFFBEB] p-5'>
          <h2 className='m-0 mb-3 text-base font-bold text-[#78350F]'>
            What happens next
          </h2>
          <ol className='m-0 flex list-decimal flex-col gap-2.5 pl-5 text-sm leading-normal text-[#44403C]'>
            <li>
              Your shop is saved as <strong>Pending approval</strong>.
            </li>
            <li>Add your groups and items while you wait.</li>
            <li>An administrator reviews and approves it.</li>
            <li>Your menu goes live at its web address.</li>
          </ol>
        </aside>
      </div>
    </section>
  );
}
