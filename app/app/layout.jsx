import "./globals.css";

export const metadata = {
  title: "Magic Glove Window Cleaning | Free Estimates",
  description:
    "Residential & commercial window cleaning, solar panel cleaning, tint removal, and storefront maintenance across Los Angeles & San Bernardino Counties."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
