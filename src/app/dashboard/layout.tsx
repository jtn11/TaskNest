"use client";
import { ReactNode, useState } from "react";
import { SideBar } from "../components/sidebar";
import { NavBar } from "../components/navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {isSidebarOpen && <SideBar setSidebarOpen={setSidebarOpen} />}

      <div className="flex-1 flex flex-col">
        <NavBar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
