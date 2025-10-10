"use client";
import { ReactNode, useEffect, useState } from "react";
import { SideBar } from "../components/sidebar";
import { NavBar } from "../components/navbar";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isUserToggled, setIsUserToggled] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      // Only auto-toggle sidebar if user hasn't manually toggled it
      if (!isUserToggled) {
        setSidebarOpen(window.innerWidth >= 768);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isUserToggled]); // rerun effect if manual toggle status changes

  const shouldShowNavBar =
    pathname !== "/dashboard/inbox" && pathname !== "/dashboard/analytics";

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
    setIsUserToggled(true);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {isSidebarOpen && <SideBar setSidebarOpen={toggleSidebar} />}{" "}
      {/* 👈 use new toggle */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {shouldShowNavBar && (
          <NavBar
            isSidebarOpen={isSidebarOpen}
            setSidebarOpen={toggleSidebar}
          />
        )}

        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
