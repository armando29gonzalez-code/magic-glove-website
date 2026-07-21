import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "Magic Glove Window Cleaning | Free Estimates",
  description:
    "Residential & commercial window cleaning, solar panel cleaning, tint removal, and storefront maintenance across Los Angeles & San Bernardino Counties.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

const GOOGLE_ADS_ID = "AW-18166038580";
const GOOGLE_ADS_FORM_SUBMISSION_LABEL = "vWInCJ73j9QcELSAn9ZD";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* Google Ads global site tag */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>

        {/*
          Google Ads Free Estimate Form Submission conversion.
          Google generated this as a click snippet, but the site calls it only after
          /api/estimate succeeds so fake/failed button clicks are not counted.
        */}
        <Script id="google-ads-form-submission-conversion" strategy="afterInteractive">
          {`
            (function () {
              const sendTo = '${GOOGLE_ADS_ID}/${GOOGLE_ADS_FORM_SUBMISSION_LABEL}';

              window.gtag_report_conversion = function (url) {
                const callback = function () {
                  if (typeof url !== 'undefined') {
                    window.location = url;
                  }
                };

                if (typeof window.gtag === 'function') {
                  window.gtag('event', 'conversion', {
                    send_to: sendTo,
                    event_callback: callback
                  });
                }

                return false;
              };

              if (window.__magicGloveGoogleAdsPatch) return;
              window.__magicGloveGoogleAdsPatch = true;

              const originalFetch = window.fetch;
              if (typeof originalFetch !== 'function') return;

              window.fetch = async function (...args) {
                const response = await originalFetch.apply(this, args);

                try {
                  const request = args[0];
                  const options = args[1] || {};
                  const url = typeof request === 'string' ? request : request && request.url;
                  const method = (options.method || (request && request.method) || 'GET').toUpperCase();

                  if (url && String(url).includes('/api/estimate') && method === 'POST' && response.ok) {
                    response.clone().json().then(function (data) {
                      if (data && data.ok && typeof window.gtag_report_conversion === 'function') {
                        window.gtag_report_conversion();
                      }
                    }).catch(function () {});
                  }
                } catch (error) {}

                return response;
              };
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
