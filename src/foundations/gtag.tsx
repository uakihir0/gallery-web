import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";

export const GA_ID = "G-R1R7GDEPNV";

// PV を測定
export const pageview = (path: string) => {
  window.gtag("config", GA_ID, {
    page_path: path,
  });
};

// GA イベントを発火
export const event = ({ action, category, label, value = "" }: Event) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label ? JSON.stringify(label) : "",
    value,
  });
};

// _app.tsx で読込
export const usePageView = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (path: string) => pageview(path);
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);
};

// _app.tsx で読込
export const GoogleAnalytics = () => (
  <>
    <Script
      defer
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      strategy="afterInteractive"
    />
    <Script
      defer
      dangerouslySetInnerHTML={{
        __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());    
              gtag('config', '${GA_ID}');
            `,
      }}
      strategy="afterInteractive"
    />
  </>
);

// イベントを型で管理
type ContactEvent = {
  action: "submit_form";
  category: "contact";
};

type ClickEvent = {
  action: "click";
  category: "other";
};

export type Event = (ContactEvent | ClickEvent) & {
  label?: Record<string, string | number | boolean>;
  value?: string;
};
