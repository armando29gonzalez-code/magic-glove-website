import "./globals.css";

export const metadata = {
  title: "Magic Glove Window Cleaning | Free Estimates",
  description:
    "Residential & commercial window cleaning, solar panel cleaning, tint removal, and storefront maintenance across Los Angeles & San Bernardino Counties.",

  // ✅ Favicons / app icons
  icons: {
    icon: [
      { url: "/favicon.ico" }, // classic
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },

  // ✅ Optional but recommended if you have it
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
