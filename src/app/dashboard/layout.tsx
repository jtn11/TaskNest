"use client"
import { ReactNode, useState } from "react";
import { SideBar } from "../components/sidebar";
import { NavBar } from "../components/navbar";


type Section = 'overview' | 'tasks' | 'inbox' | 'analytics';


interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [ActiveSection, setActiveSection] = useState<Section>('overview');

    return (
        <div className="flex min-h-screen">
            {isSidebarOpen &&
                (<SideBar setSidebarOpen={setSidebarOpen}
                    ActiveSection={ActiveSection}
                    setActiveSection={setActiveSection}
                />)}

            <div className="flex-1 flex flex-col">
                <NavBar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main className="p-5">
                    {ActiveSection == 'overview' && <div> OverView</div>}
                    {ActiveSection == 'tasks' && <div>Tasks</div>}
                    {ActiveSection == 'inbox' && <div>Inbox</div>}
                    {ActiveSection == 'analytics' && <div>Analytics</div>}

                </main>
            </div>
        </div>

    )
}