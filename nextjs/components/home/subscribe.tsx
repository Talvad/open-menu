const Subscribe = () => {
  return (
    <section className='py-16 relative'>
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='rounded-3xl bg-linear-to-r from-amber-500 via-amber-600 to-orange-500 p-8 sm:p-12 text-navy-900 relative overflow-hidden shadow-2xl'>
          <div className='absolute -right-10 -bottom-10 opacity-10 text-navy-900'>
            <i data-lucide='utensils' className='w-80 h-80'></i>
          </div>

          <div className='relative z-10 max-w-2xl text-left space-y-4'>
            <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900'>
              Ready to level up your menu experience?
            </h2>
            <p className='text-navy-900/90 font-medium text-base'>
              Join thousands of venue owners saving printing costs and boosting
              guest satisfaction today. Setup takes under 2 minutes.
            </p>

            <form className='pt-4 flex flex-col sm:flex-row gap-3 max-w-md'>
              <input
                type='email'
                placeholder='Enter your business email'
                required
                className='px-4 py-3.5 rounded-xl bg-white/90 placeholder-navy-900/60 text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900 flex-1 font-medium'
              />
              <button
                type='submit'
                className='px-6 py-3.5 rounded-xl bg-navy-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors shadow-lg'
              >
                Get Started Free
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
