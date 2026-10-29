import {
  CloudLightning,
  FileSpreadsheet,
  PlusCircle,
  UploadCloud,
} from 'lucide-react';
import Chip from '../ui/chip';

const Demo = () => {
  return (
    <section id='demo' className='py-20 relative'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center max-w-3xl mx-auto mb-12 space-y-3'>
          <Chip className='bg-amber-500/10 border-amber-500/20'>
            Try It Live
          </Chip>
          <h2 className='text-3xl sm:text-4xl font-extrabold text-white'>
            Experience the Merchant Upload Dashboard
          </h2>
          <p className='text-slate-400 text-sm sm:text-base'>
            Test how easy it is to add menu items or upload menu files right
            here.
          </p>
        </div>

        <div className='max-w-4xl mx-auto rounded-3xl glass-panel border border-slate-700/80 p-6 sm:p-8 shadow-2xl'>
          <div className='flex flex-wrap justify-center gap-2 mb-8 p-1.5 bg-navy-900/90 rounded-2xl border border-slate-800'>
            <button
              id='tab-file'
              className='px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 bg-amber-500 text-navy-900 shadow'
            >
              <UploadCloud className='size-4' />

              <span>Upload Photo / PDF</span>
            </button>
            <button
              id='tab-manual'
              className='px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 text-slate-400 hover:text-white'
            >
              <PlusCircle className='size-4' />

              <span>Add Item Manually</span>
            </button>
            <button
              id='tab-csv'
              className='px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 text-slate-400 hover:text-white'
            >
              <FileSpreadsheet className='size-4' />
              <span>CSV Bulk Import</span>
            </button>
          </div>

          <div id='demo-file-content' className='space-y-6'>
            <div
              id='drop-zone'
              className='border-2 border-dashed border-slate-700 hover:border-amber-500 rounded-2xl p-8 sm:p-12 text-center bg-slate-900/40 transition-colors cursor-pointer group'
            >
              <div className='w-16 h-16 rounded-full bg-amber-500/10 text-amber-400 mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                <CloudLightning className='size-8' />
              </div>
              <h4 className='text-lg font-bold text-white mb-1'>
                Drag and drop your menu PDF or image
              </h4>
              <p className='text-slate-400 text-xs sm:text-sm mb-4'>
                Or click to simulate instant AI extraction from an existing
                image
              </p>
              <span className='inline-block px-4 py-2 rounded-xl bg-slate-800 text-amber-400 text-xs font-semibold border border-slate-700'>
                Click here to run Instant AI Demo
              </span>
            </div>

            <div
              id='ai-extract-result'
              className='hidden p-5 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-4'
            >
              <div className='flex items-center justify-between text-xs text-amber-400 font-bold border-b border-slate-800 pb-3'>
                <span className='flex items-center gap-2'>
                  <i
                    data-lucide='check-circle-2'
                    className='w-4 h-4 text-emerald-400'
                  ></i>
                  AI Extracted 3 Categories & 8 Menu Items
                </span>
                <span className='text-slate-400 font-normal'>
                  Confidence: 99.4%
                </span>
              </div>
              <div className='grid sm:grid-cols-2 gap-3 text-left'>
                <div className='p-3 bg-slate-800/60 rounded-xl border border-slate-700 flex justify-between items-center'>
                  <div>
                    <p className='text-xs font-bold text-white'>
                      Iced Spanish Latte
                    </p>
                    <p className='text-[10px] text-slate-400'>
                      Beverages • $6.50
                    </p>
                  </div>
                  <span className='text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-medium'>
                    Ready
                  </span>
                </div>
                <div className='p-3 bg-slate-800/60 rounded-xl border border-slate-700 flex justify-between items-center'>
                  <div>
                    <p className='text-xs font-bold text-white'>
                      Avocado Toast Supreme
                    </p>
                    <p className='text-[10px] text-slate-400'>
                      Breakfast • $14.00
                    </p>
                  </div>
                  <span className='text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-medium'>
                    Ready
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div id='demo-manual-content' className='hidden space-y-4 text-left'>
            <form id='manualItemForm' className='grid sm:grid-cols-2 gap-4'>
              <div>
                <label className='block text-xs font-semibold text-slate-300 mb-1'>
                  Item Title
                </label>
                <input
                  type='text'
                  id='itemName'
                  placeholder='e.g. Artisanal Garlic Flatbread'
                  required
                  className='w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500'
                />
              </div>
              <div>
                <label className='block text-xs font-semibold text-slate-300 mb-1'>
                  Price ($ USD)
                </label>
                <input
                  type='number'
                  step='0.01'
                  id='itemPrice'
                  placeholder='12.50'
                  required
                  className='w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500'
                />
              </div>
              <div>
                <label className='block text-xs font-semibold text-slate-300 mb-1'>
                  Category
                </label>
                <select
                  id='itemCategory'
                  className='w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500'
                >
                  <option>Starters</option>
                  <option>Main Course</option>
                  <option>Desserts</option>
                  <option>Beverages</option>
                </select>
              </div>
              <div>
                <label className='block text-xs font-semibold text-slate-300 mb-1'>
                  Dietary Tag
                </label>
                <select
                  id='itemTag'
                  className='w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500'
                >
                  <option value='None'>None</option>
                  <option value='Vegan'>Vegan</option>
                  <option value='Gluten-Free'>Gluten-Free</option>
                  <option value='Spicy'>Spicy</option>
                </select>
              </div>
              <div className='sm:col-span-2'>
                <label className='block text-xs font-semibold text-slate-300 mb-1'>
                  Description
                </label>
                <textarea
                  id='itemDesc'
                  rows={2}
                  placeholder='Short description of ingredients...'
                  className='w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500'
                ></textarea>
              </div>
              <div className='sm:col-span-2 pt-2'>
                <button
                  type='submit'
                  className='w-full py-3 rounded-xl bg-amber-500 text-navy-900 font-bold text-sm hover:bg-amber-400 transition-colors'
                >
                  Add To Digital Menu Preview
                </button>
              </div>
            </form>
          </div>

          <div id='demo-csv-content' className='hidden space-y-4 text-center'>
            <div className='p-6 rounded-2xl bg-slate-900/60 border border-slate-700'>
              <i
                data-lucide='file-spreadsheet'
                className='w-12 h-12 text-amber-400 mx-auto mb-3'
              ></i>
              <h4 className='text-base font-bold text-white mb-2'>
                Import Menu via Spreadsheets
              </h4>
              <p className='text-xs text-slate-400 mb-4 max-w-md mx-auto'>
                Upload Excel or CSV formatted files with columns: Name, Price,
                Category, Description, Tag.
              </p>
              <button className='px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-xs rounded-xl border border-slate-600 transition-colors'>
                Sample Menu CSV Download
              </button>
            </div>
          </div>

          <div className='mt-8 pt-6 border-t border-slate-800 text-left'>
            <div className='flex items-center justify-between mb-4'>
              <h4 className='text-xs font-bold text-slate-400 uppercase tracking-wider'>
                Live Merchant Preview (<span id='item-count'>2</span> items)
              </h4>
              <span className='text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full'>
                Updates Instant
              </span>
            </div>
            <div id='demo-items-list' className='space-y-2'></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
