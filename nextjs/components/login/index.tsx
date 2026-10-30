import { Lock, LogIn, Mail, Sparkles } from 'lucide-react';
import { Input } from '../base_ui/input';

const Login = () => {
  return (
    <form id='login-form' className=' space-y-4'>
      <div>
        <label className='block text-xs font-semibold text-slate-300 mb-1.5'>
          Email Address
        </label>
        <Input
          icon={Mail}
          type='email'
          id='email'
          name='email'
          required
          placeholder='you@example.com'
        />
      </div>

      <div>
        <div className='flex justify-between items-center mb-1.5'>
          <label className='block text-xs font-semibold text-slate-300'>
            Password
          </label>
          {/* <a href='#' className='text-xs text-amber-400 hover:underline'>
            Forgot password?
          </a> */}
        </div>
        <Input
          icon={Lock}
          type='password'
          id='password'
          name='password'
          required
          placeholder='••••••••••••'
        />
      </div>

      <button
        type='submit'
        className='w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-900 font-extrabold text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2'
      >
        <span>Sign In to Dashboard</span>
        <LogIn className='size-4' />
      </button>
    </form>
  );
};

export default Login;
