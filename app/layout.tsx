import "./globals.css";
import SidebarLayout from "./components/SidebarLayout";

export const metadata = {
  title: "SupplyMind",
  description: "AI-Powered Procurement Engine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SidebarLayout>{children}</SidebarLayout>
      </body>
    </html>
  );
}
