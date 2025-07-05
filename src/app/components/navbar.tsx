"use client"
import {Bars3Icon,UserCircleIcon , PencilSquareIcon } from '@heroicons/react/24/solid'

interface NavBarProps {
    isSidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

export const NavBar = ({ isSidebarOpen, setSidebarOpen }: NavBarProps) => {
    return (
        <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    {/* Hamburger appears only when sidebar is closed */}
                    {!isSidebarOpen && (
                        <button
                            className="p-2 text-gray-600"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Bars3Icon className='w-5 h-5'/>
                        </button>
                    )}

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="flex items-center">
                    
                    <div className="flex items-center space-x-2">

                        <div className='flex items-center gap-1 rounded-full p-2 hover:bg-gray-200 cursor-pointer'>
                        <PencilSquareIcon className='w-5 h-5'/>
                        </div>

                        <div className="w-8 h-8 rounded-full flex items-center justify-center">
                            <UserCircleIcon className='w-7 h-7'/>
                        </div>
                        <span className="text-sm font-medium text-gray-700">John Doe</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
