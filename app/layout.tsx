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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
