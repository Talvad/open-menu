'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

function AddItemForm() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <button className='px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-900 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all'>
            <Plus className='size-4' />
            <span>Add Item</span>
          </button>
        }
      />
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className='flex items-center gap-2'>
          <div className='grid flex-1 gap-2'>
            <Label htmlFor='link' className='sr-only'>
              Link
            </Label>
            <Input
              id='link'
              defaultValue='https://ui.shadcn.com/docs/installation'
              readOnly
            />
          </div>
        </div>
        <DialogFooter className='sm:justify-start'>
          <DialogClose render={<Button type='button'>Close</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { AddItemForm };
