'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

const measurementId = 'G-M7SDQFZ8Z4';
const disabledKey = `ga-disable-${measurementId}` as const;
const tagId = 'coforma-google-analytics';
const campaignParameters = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id'];

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
} & Partial<Record<typeof disabledKey, boolean>>;

export function disableGoogleAnalytics() {
  (window as AnalyticsWindow)[disabledKey] = true;
}

export function trackDemoRequest() {
  const analytics = window as AnalyticsWindow;
  if (analytics[disabledKey] !== false) return;

  analytics.gtag?.('event', 'coforma_demo_request', {
    send_to: measurementId,
    page_location: new URL('/contacto', window.location.origin).href,
  });
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const query = useSearchParams();
  const previousPage = useRef('');

  useEffect(() => {
    const analytics = window as AnalyticsWindow;
    analytics[disabledKey] = false;

    if (!document.getElementById(tagId)) {
      const dataLayer = analytics.dataLayer ?? (analytics.dataLayer = []);
      analytics.gtag = function () { dataLayer.push(arguments); };
      analytics.gtag('js', new Date());
      analytics.gtag('config', measurementId, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });
      const script = document.createElement('script');
      script.id = tagId;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.append(script);
    }

    return disableGoogleAnalytics;
  }, []);

  useEffect(() => {
    if (!pathname) return;
    const page = new URL(pathname, window.location.origin);
    for (const key of campaignParameters) {
      const value = query.get(key);
      if (value) page.searchParams.set(key, value);
    }

    if (page.href === previousPage.current) return;
    const referrer = previousPage.current || (document.referrer ? new URL(document.referrer).origin : '');
    previousPage.current = page.href;
    (window as AnalyticsWindow).gtag?.('event', 'page_view', {
      send_to: measurementId,
      page_location: page.href,
      page_title: document.title,
      page_referrer: referrer,
    });
  }, [pathname, query]);

  return null;
}
