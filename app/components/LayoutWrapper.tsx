'use client';

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  
  // Hide Header and Footer on admin and auth pages
  const isAdminRoute = pathname?.startsWith("/admin");
  const isAuthRoute = pathname?.startsWith("/auth");
  const hidePublicLayout = isAdminRoute || isAuthRoute;

  return (
    <>
      {!hidePublicLayout && <Header />}
      <div className="flex-1" style={{ paddingTop: "var(--header-height, 0px)" }}>
        {children}
      </div>
      {!hidePublicLayout && <Footer />}
    </>
  );
}
