import {
  ChevronsUpDown,
  ExternalLink,
  FolderTree,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  QrCode,
  Settings,
  Utensils,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { SideNavbar } from './_components/side-navbar';

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <main className='flex h-screen overflow-hidden'>
      {/* <!-- SIDEBAR NAVIGATION --> */}
      <aside className='w-64 bg-navy-900 border-r border-slate-800 flex flex-col justify-between transition-all duration-300 z-30 fixed lg:relative -translate-x-full lg:translate-x-0 h-full'>
        <div>
          {/* <!-- Brand Header --> */}
          <div className='h-20 px-6 flex items-center justify-between border-b border-slate-800'>
            <Link href='/' className='flex items-center gap-3'>
              <div className='w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-navy-900 font-extrabold shadow-lg shadow-amber-500/20'>
                <UtensilsCrossed className='size-5' />
              </div>
              <span className='text-lg font-bold tracking-tight text-white flex items-center gap-1'>
                OPEN <span className='text-amber-400 font-extrabold'>MENU</span>
              </span>
            </Link>
            <button className='lg:hidden text-slate-400 hover:text-white'>
              <X className='size-5' />
            </button>
          </div>

          {/* <!-- Venue Switcher Dropdown --> */}
          <div className='p-4 border-b border-slate-800/80'>
            <div className='p-3 rounded-2xl bg-navy-950/80 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700 transition-colors'>
              <div className='flex items-center gap-2.5 min-w-0'>
                <div className='w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-xs flex-shrink-0'>
                  B
                </div>
                <div className='truncate'>
                  <p className='text-xs font-bold text-white truncate'>
                    Bella Italia Trattoria
                  </p>
                  <p className='text-[10px] text-amber-400 flex items-center gap-1'>
                    <span className='w-1.5 h-1.5 rounded-full bg-amber-400'></span>{' '}
                    Live Menu
                  </p>
                </div>
              </div>
              <ChevronsUpDown className='size-4 text-slate-500 shrink-0' />
            </div>
          </div>

          {/* <!-- Nav Links --> */}
          <SideNavbar />
        </div>

        {/* <!-- Footer User Profile --> */}
        <div className='p-4 border-t border-slate-800'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2.5'>
              <div className='w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-amber-400'>
                MR
              </div>
              <div>
                <p className='text-xs font-bold text-white'>Chef Mario</p>
                <p className='text-[10px] text-slate-400'>Pro Plan</p>
              </div>
            </div>
            <a
              href='signup.html'
              className='p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors'
              title='Log Out'
            >
              <LogOut className='size-4' />
            </a>
          </div>
        </div>
      </aside>

      {/* <!-- MAIN DASHBOARD CONTENT AREA --> */}
      <div className='flex-1 flex flex-col min-w-0 overflow-hidden bg-navy-950'>
        {/* <!-- Top Navbar --> */}
        <header className='h-20 border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between bg-navy-900/50 backdrop-blur-md'>
          <div className='flex items-center gap-4'>
            <button className='lg:hidden p-2 text-slate-400 hover:text-white'>
              <Menu className='size-6' />
            </button>
            <div>
              <h1
                id='page-title'
                className='text-lg sm:text-xl font-bold text-white'
              >
                Dashboard Overview
              </h1>
              <p className='text-xs text-slate-400 hidden sm:block'>
                Manage menu items, prices, and view customer scans in real-time.
              </p>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <a
              href='index.html'
              target='_blank'
              className='hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl glass-card text-xs font-semibold text-amber-400 border border-amber-500/30 hover:border-amber-500'
            >
              <ExternalLink className='size-3.5' />

              <span>Live Menu View</span>
            </a>
            <button className='px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-900 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all'>
              <Plus className='size-4' />

              <span>Add Item</span>
            </button>
          </div>
        </header>

        {/* <!-- Scrollable Content View Grid --> */}
        <div className='flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8'>
          {/* <div className='grid lg:grid-cols-12 gap-8 max-w-7xl mx-auto'> */}
          {children}
          {/* <!-- LEFT/CENTER MAIN WORKSPACE -->
                    <div className="lg:col-span-7 xl:col-span-8 space-y-6">

                        <!-- SECTION 1: OVERVIEW METRICS -->
                        <div id="tab-content-overview" className="space-y-6">
                            
                            <!-- 4 Real-time Metrics Cards -->
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="glass-card p-4 rounded-2xl border border-slate-800">
                                    <div className="flex items-center justify-between text-slate-400 mb-2">
                                        <span className="text-[11px] font-semibold">Total Menu Views</span>
                                        <i data-lucide="eye" className="w-4 h-4 text-amber-400"></i>
                                    </div>
                                    <div className="text-2xl font-extrabold text-white">4,820</div>
                                    <span className="text-[10px] text-amber-400 font-semibold flex items-center gap-1 mt-1">
                                        <i data-lucide="trending-up" className="w-3 h-3"></i> +14.2% this week
                                    </span>
                                </div>

                                <div className="glass-card p-4 rounded-2xl border border-slate-800">
                                    <div className="flex items-center justify-between text-slate-400 mb-2">
                                        <span className="text-[11px] font-semibold">Table QR Scans</span>
                                        <i data-lucide="qr-code" className="w-4 h-4 text-amber-400"></i>
                                    </div>
                                    <div className="text-2xl font-extrabold text-white">1,249</div>
                                    <span className="text-[10px] text-amber-400 font-semibold flex items-center gap-1 mt-1">
                                        <i data-lucide="trending-up" className="w-3 h-3"></i> +8.1% today
                                    </span>
                                </div>

                                <div className="glass-card p-4 rounded-2xl border border-slate-800">
                                    <div className="flex items-center justify-between text-slate-400 mb-2">
                                        <span className="text-[11px] font-semibold">Active Menu Items</span>
                                        <i data-lucide="utensils" className="w-4 h-4 text-amber-400"></i>
                                    </div>
                                    <div className="text-2xl font-extrabold text-white" id="metric-active-items">4</div>
                                    <span className="text-[10px] text-slate-400 font-semibold block mt-1">
                                        Across 3 categories
                                    </span>
                                </div>

                                <div className="glass-card p-4 rounded-2xl border border-slate-800">
                                    <div className="flex items-center justify-between text-slate-400 mb-2">
                                        <span className="text-[11px] font-semibold">Est. Saved Paper</span>
                                        <i data-lucide="leaf" className="w-4 h-4 text-amber-400"></i>
                                    </div>
                                    <div className="text-2xl font-extrabold text-white">$450</div>
                                    <span className="text-[10px] text-amber-400 font-semibold block mt-1">
                                        Zero reprint costs
                                    </span>
                                </div>
                            </div>

                            <!-- Quick Action Banner -->
                            <div className="glass-card p-6 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-navy-900 to-navy-900 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="space-y-1 text-center sm:text-left">
                                    <h3 className="text-base font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
                                        <i data-lucide="zap" className="w-4 h-4 text-amber-400"></i>
                                        Instant Menu Updates
                                    </h3>
                                    <p className="text-xs text-slate-300">Any changes made in the Menu Builder reflect live on customer phones immediately.</p>
                                </div>
                                <button onclick="switchTab('builder')" className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-900 font-bold text-xs whitespace-nowrap shadow-lg">
                                    Open Menu Builder →
                                </button>
                            </div>

                            <!-- Top Popular Items Preview Card -->
                            <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold text-white">Most Viewed Items Today</h3>
                                    <span className="text-xs text-slate-400">Live Analytics</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-navy-950/80 border border-slate-800">
                                        <div className="flex items-center gap-3">
                                            <span className="w-6 text-center text-xs font-extrabold text-amber-400">#1</span>
                                            <div>
                                                <p className="text-xs font-bold text-white">Truffle Margherita Pizza</p>
                                                <p className="text-[10px] text-slate-400">Starters • 342 views</p>
                                            </div>
                                        </div>
                                        <span className="text-xs font-bold text-amber-400">$18.50</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-navy-950/80 border border-slate-800">
                                        <div className="flex items-center gap-3">
                                            <span className="w-6 text-center text-xs font-extrabold text-slate-400">#2</span>
                                            <div>
                                                <p className="text-xs font-bold text-white">Smokey Wagyu Burger</p>
                                                <p className="text-[10px] text-slate-400">Mains • 289 views</p>
                                            </div>
                                        </div>
                                        <span className="text-xs font-bold text-amber-400">$22.00</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <!-- SECTION 2: INTERACTIVE MENU BUILDER -->
                        <div id="tab-content-builder" className="hidden space-y-6">
                            
                            <!-- Search & Filter Controls -->
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                                <div className="relative w-full sm:w-64">
                                    <i data-lucide="search" className="w-4 h-4 absolute left-3 top-3 text-slate-500"></i>
                                    <input type="text" id="builder-search" onkeyup="filterMenuItems()" placeholder="Search menu items..." className="w-full glass-input pl-9 pr-4 py-2 rounded-xl text-xs text-white placeholder-slate-500">
                                </div>
                                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1" id="category-filter-buttons">
                                    <!-- Dynamic Category Filters -->
                                </div>
                            </div>

                            <!-- Menu Items List -->
                            <div id="menu-items-container" className="space-y-3">
                                <!-- Dynamic items rendered here -->
                            </div>

                        </div>

                        <!-- SECTION 3: CATEGORIES MANAGER -->
                        <div id="tab-content-categories" className="hidden space-y-6">
                            <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-sm font-bold text-white">Manage Menu Categories</h3>
                                    <button onclick="addCategoryPrompt()" className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 text-xs font-semibold border border-amber-500/30">
                                        + New Category
                                    </button>
                                </div>
                                <div id="categories-list" className="space-y-2">
                                    <!-- Rendered dynamically -->
                                </div>
                            </div>
                        </div>

                        <!-- SECTION 4: QR CODE GENERATOR -->
                        <div id="tab-content-qr" className="hidden space-y-6">
                            <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
                                <div className="text-left space-y-1">
                                    <h3 className="text-base font-bold text-white">Table QR Stand Generator</h3>
                                    <p className="text-xs text-slate-400">Download high-resolution vector QR stands for your tables or bar counter.</p>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6 items-center">
                                    <!-- QR Box Display -->
                                    <div className="p-6 rounded-2xl bg-white text-navy-900 text-center space-y-3 shadow-2xl max-w-xs mx-auto w-full">
                                        <p className="text-xs font-extrabold tracking-wider uppercase" id="qr-frame-text">SCAN TO VIEW MENU</p>
                                        <div className="w-40 h-40 mx-auto p-2 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center">
                                            <img id="qr-generator-img" src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://openmenu.io/demo" alt="Table QR Code" className="w-full h-full">
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-500" id="qr-subtext">Table #12 • Bella Italia</p>
                                    </div>

                                    <!-- QR Customizer Controls -->
                                    <div className="space-y-4 text-left">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-300 mb-1">Header Frame Text</label>
                                            <input type="text" id="qr-input-header" value="SCAN TO VIEW MENU" oninput="updateQrCustomizer()" className="w-full glass-input px-3.5 py-2 rounded-xl text-xs text-white">
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-300 mb-1">Table / Counter Label</label>
                                            <input type="text" id="qr-input-subtext" value="Table #12 • Bella Italia" oninput="updateQrCustomizer()" className="w-full glass-input px-3.5 py-2 rounded-xl text-xs text-white">
                                        </div>
                                        <button onclick="downloadQrCode()" className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-900 font-extrabold text-xs shadow-lg flex items-center justify-center gap-2">
                                            <i data-lucide="download" className="w-4 h-4"></i>
                                            Download Printable PDF / PNG
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- SECTION 5: SETTINGS -->
                        <div id="tab-content-settings" className="hidden space-y-6">
                            <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4 text-left">
                                <h3 className="text-base font-bold text-white">Restaurant Profile Settings</h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1">Restaurant Name</label>
                                        <input type="text" value="Bella Italia Trattoria" className="w-full glass-input px-3.5 py-2 rounded-xl text-xs text-white">
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1">Currency Symbol</label>
                                        <input type="text" value="$ (USD)" className="w-full glass-input px-3.5 py-2 rounded-xl text-xs text-white">
                                    </div>
                                </div>
                                <button onclick="showToast('Settings saved successfully!')" className="px-5 py-2.5 rounded-xl bg-amber-500 text-navy-900 font-bold text-xs">Save Changes</button>
                            </div>
                        </div>

                    </div>

                    <!-- RIGHT PANEL: LIVE MOBILE SIMULATOR -->
                    <div className="lg:col-span-5 xl:col-span-4 flex justify-center">
                        <div className="sticky top-8 w-full max-w-[320px]">
                            
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                                    Diner Mobile View
                                </span>
                                <span className="text-[10px] text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">Live Sync</span>
                            </div>

                            <!-- Phone Shell -->
                            <div className="rounded-[40px] p-2.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-2xl border border-slate-700/80 glow-amber">
                                <div className="rounded-[32px] bg-navy-950 overflow-hidden border border-slate-800 h-[580px] flex flex-col relative">
                                    
                                    <!-- Phone Notch -->
                                    <div className="w-28 h-4 bg-slate-900 rounded-b-xl mx-auto absolute top-0 left-0 right-0 z-20 flex justify-center items-center">
                                        <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
                                        <div className="w-6 h-1 bg-slate-700 rounded-full"></div>
                                    </div>

                                    <!-- Phone App Header -->
                                    <div className="pt-6 px-3 pb-2 bg-navy-900/90 border-b border-slate-800 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                                                B
                                            </div>
                                            <div className="text-left">
                                                <h4 className="text-xs font-bold text-white truncate max-w-[120px]">Bella Italia</h4>
                                                <p className="text-[9px] text-amber-400">Table #12</p>
                                            </div>
                                        </div>
                                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold">Open</span>
                                    </div>

                                    <!-- Mobile Phone Menu Scroll Area -->
                                    <div className="p-3 overflow-y-auto space-y-3 phone-scroll flex-1 text-left" id="phone-menu-preview">
                                        <!-- Rendered dynamically -->
                                    </div>

                                    <!-- Phone Footer Banner -->
                                    <div className="p-2.5 bg-navy-900 border-t border-slate-800 text-center">
                                        <p className="text-[9px] text-slate-400">Powered by <span className="text-amber-400 font-bold">Open Menu</span></p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div> */}
          {/* </div> */}
        </div>
      </div>
    </main>
  );
}
