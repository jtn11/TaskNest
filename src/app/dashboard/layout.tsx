"use client";
import { ReactNode, useState } from "react";
import { SideBar } from "../components/sidebar";
import { NavBar } from "../components/navbar";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const shouldShowNavBar =
    pathname !== "/dashboard/inbox" && pathname !== "/dashboard/analytics";

  return (
    <div className="flex h-screen overflow-hidden">
      {isSidebarOpen && <SideBar setSidebarOpen={setSidebarOpen} />}

      <div className="flex-1 flex flex-col overflow-hidden">
        {shouldShowNavBar && (
          <NavBar
            isSidebarOpen={isSidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        )}

        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
