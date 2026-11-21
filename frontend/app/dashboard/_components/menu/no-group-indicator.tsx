import React from 'react';

type Props = {};

export default function NoGroupIndicator({}: Props) {
  return (
    <p className='text-stone-500'>
      No groups yet. Add one (for example “Breakfast” or “Furniture”), then add
      items to it.
    </p>
  );
}
