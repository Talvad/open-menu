'use client';

import { useReportWebVitals } from 'next/web-vitals';

type ReportWebVitalsCallback = Parameters<typeof useReportWebVitals>[0];

const reportWebVitals: ReportWebVitalsCallback = (metric) => {
  const report = {
    name: metric.name,
    value: metric.value,
    delta: metric.delta,
    rating: metric.rating,
    navigationType: metric.navigationType,
    path: new URL(metric.navigationURL || window.location.href).pathname,
  };

  window.dispatchEvent(
    new CustomEvent('open-menu:web-vitals', { detail: report }),
  );

  if (process.env.NODE_ENV === 'development') {
    console.info('[web-vitals]', report);
  }

  const endpoint = process.env.NEXT_PUBLIC_WEB_VITALS_ENDPOINT;
  if (!endpoint) return;

  const body = new Blob([JSON.stringify(report)], {
    type: 'application/json',
  });
  if (navigator.sendBeacon(endpoint, body)) return;

  void fetch(endpoint, {
    method: 'POST',
    body,
    keepalive: true,
  }).catch((error: unknown) => {
    console.error('Unable to report Web Vitals', error);
  });
};

export function WebVitals() {
  useReportWebVitals(reportWebVitals);
  return null;
}
