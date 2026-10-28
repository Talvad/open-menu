import { Layers } from 'lucide-react';

const Logo = () => {
  return (
    <div className='inline-flex gap-1 items-center border p-1'>
      <Layers className='size-4' />
      <div className='flex flex-col'>
        <span className='text-xs font-bold leading-3'>Open</span>
        <span className='text-xs font-light leading-3'>Menu</span>
      </div>
    </div>
  );
};

export default Logo;
