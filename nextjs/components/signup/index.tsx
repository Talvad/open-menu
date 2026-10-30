import { ArrowRight, Lock, Mail, Store, User } from 'lucide-react';
import { Input } from '../base_ui/input';

const Signup = () => {
  return (
    <form id='signup-form' className='space-y-4'>
      <div>
        <label
          htmlFor='name'
          className='block text-xs font-semibold text-slate-300 mb-1.5'
        >
          Full Name
        </label>

        <Input
          icon={User}
          type='text'
          id='name'
          name='name'
          required
          placeholder='Chef Mario Rossi'
        />
      </div>
      <div>
        <label className='block text-xs font-semibold text-slate-300 mb-1.5'>
          Shop / Restaurant Name
        </label>
        <Input
          icon={Store}
          type='text'
          id='shopName'
          name='shopName'
          required
          placeholder='Bella Italia Trattoria'
        />
      </div>

      <div>
        <label
          id='email-label'
          className='block text-xs font-semibold text-slate-300 mb-1.5'
        >
          Business Email
        </label>
        <Input
          icon={Mail}
          type='email'
          id='email'
          name='email'
          required
          placeholder='owner@restaurant.com'
        />
      </div>

      <div>
        <label className='block text-xs font-semibold text-slate-300 mb-1.5'>
          Password
        </label>
        <Input
          icon={Lock}
          type='password'
          id='password'
          name='password'
          required
          placeholder='••••••••••••'
        />
      </div>
      <div>
        <label className='block text-xs font-semibold text-slate-300 mb-1.5'>
          Confirm Password
        </label>
        <Input
          icon={Lock}
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          required
          placeholder='••••••••••••'
        />
      </div>

      <button
        type='submit'
        className='w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-900 font-extrabold text-sm transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2'
      >
        <span id='signup-submit-text'>Create Shop Owner Account</span>
        <ArrowRight className='size-4' />
      </button>
    </form>
  );
};

export default Signup;
