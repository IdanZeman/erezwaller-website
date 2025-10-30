import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ארז ולר – שיפוצים וקבלנות",
  description: "קבלן והנדימן מקצועי עם מעל 15 שנות ניסיון: שיפוצים, תחזוקה ובנייה",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🔨</text></svg>" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
