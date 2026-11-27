'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';

export function MenuShareKit({
  menuUrl,
  shopName,
}: {
  menuUrl: string;
  shopName: string;
}) {
  const [message, setMessage] = useState('');

  async function shareMenu() {
    try {
      if (navigator.share) {
        await navigator.share({ title: `${shopName} menu`, url: menuUrl });
        setMessage('Menu link shared.');
        return;
      }
      await navigator.clipboard.writeText(menuUrl);
      setMessage('Menu link copied.');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setMessage('Could not share the link. Copy it from the menu address above.');
    }
  }

  function downloadQr() {
    const svg = document.querySelector<SVGSVGElement>('#shop-menu-qr svg');
    if (!svg) {
      setMessage('QR code is not ready yet. Try again.');
      return;
    }

    const downloadSvg = svg.cloneNode(true) as SVGSVGElement;
    downloadSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    downloadSvg.setAttribute('width', '1024');
    downloadSvg.setAttribute('height', '1024');
    const serialized = new XMLSerializer().serializeToString(downloadSvg);
    const url = URL.createObjectURL(
      new Blob([serialized], { type: 'image/svg+xml;charset=utf-8' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = `${shopName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-menu-qr.svg`;
    link.click();
    URL.revokeObjectURL(url);
    setMessage('Print-ready QR downloaded.');
  }

  return (
    <div className='mt-5 flex flex-wrap items-center gap-4 border-t border-[#d9e2d3] pt-5'>
      <div
        id='shop-menu-qr'
        className='rounded-xl border border-[#d9e2d3] bg-white p-2'
      >
        <QRCodeSVG
          value={menuUrl}
          size={112}
          level='H'
          includeMargin
          title={`QR code for ${shopName} menu`}
        />
      </div>
      <div className='flex flex-col items-start gap-2'>
        <p className='max-w-sm text-sm font-medium text-forest'>
          Put this QR on tables, packaging, or your counter.
        </p>
        <div className='flex flex-wrap gap-2'>
          <button
            type='button'
            onClick={downloadQr}
            className='rounded-full bg-forest px-4 py-2 text-sm font-semibold text-paper hover:bg-[#19382e]'
          >
            Download print-ready QR
          </button>
          <button
            type='button'
            onClick={shareMenu}
            className='rounded-full border border-forest/20 bg-paper px-4 py-2 text-sm font-semibold text-forest hover:bg-white'
          >
            Share menu link
          </button>
        </div>
        <p className='min-h-5 text-xs text-[#586657]' aria-live='polite'>
          {message}
        </p>
      </div>
    </div>
  );
}
