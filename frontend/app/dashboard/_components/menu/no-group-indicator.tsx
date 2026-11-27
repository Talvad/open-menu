export default function NoGroupIndicator() {
  return (
    <div className='rounded-2xl border border-dashed border-[#d9d0c3] bg-paper px-5 py-8'>
      <p className='font-bricolage text-lg font-bold text-forest'>
        Your menu starts with a group.
      </p>
      <p className='mt-2 max-w-xl text-sm leading-6 text-[#716e63]'>
        Create a section—like “Breakfast”, “Drinks”, or “Living room”—then add
        your items to it.
      </p>
    </div>
  );
}
