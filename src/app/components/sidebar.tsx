"use client"
import { HomeIcon, AcademicCapIcon, InboxIcon, ChartPieIcon, ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'


interface SideBarProps {
    setSidebarOpen: (open: boolean) => void;
    ActiveSection: 'overview' | 'tasks' | 'inbox' | 'analytics';
    setActiveSection: (section: 'overview' | 'tasks' | 'inbox' | 'analytics') => void;
}

export const SideBar = ({ setSidebarOpen, ActiveSection, setActiveSection }: SideBarProps) => {


    return (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col min-h-screen">
            <div className="p-6 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-900">TaskNest</h1>
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="text-gray-600 hover:text-gray-800"
                >
                    <ChevronDoubleLeftIcon className='w-4 h-4' />
                </button>
            </div>

            <div className='p-3'>

                <div
                    className={`flex h-8 px-2 gap-4 items-center rounded cursor-pointer ${ActiveSection !== 'overview' ? ' hover:bg-gray-100' : " "}`}
                    onClick={() => setActiveSection('overview')}
                >
                    <HomeIcon className={`w-4 h-4 ${ActiveSection === 'overview' ? 'text-blue-500' : 'text-gray-600'}`} />
                    <span className={`text-sm font-medium ${ActiveSection === 'overview' ? 'text-blue-500' : 'text-gray-800'}`}>
                        Overview
                    </span>
                </div>


                <div
                    className={`flex h-8 px-2 gap-4 items-center rounded cursor-pointer ${ActiveSection !== 'tasks' ? ' hover:bg-gray-100' : " "}`}
                    onClick={() => setActiveSection('tasks')}
                >
                    <AcademicCapIcon className={`w-4 h-4 ${ActiveSection === 'tasks' ? 'text-blue-500' : 'text-gray-600'}`} />
                    <span className={`text-sm font-medium ${ActiveSection === 'tasks' ? 'text-blue-500' : 'text-gray-800'}`}>
                        Tasks
                    </span>
                </div>

                <div
                    className={`flex h-8 px-2 gap-4 items-center rounded cursor-pointer ${ActiveSection !== 'inbox' ? ' hover:bg-gray-100' : " "}`}
                    onClick={() => setActiveSection('inbox')}
                >
                    <InboxIcon className={`w-4 h-4 ${ActiveSection === 'inbox' ? 'text-blue-500' : 'text-gray-600'}`} />
                    <span className={`text-sm font-medium ${ActiveSection === 'inbox' ? 'text-blue-500' : 'text-gray-800'}`}>
                        Inbox
                    </span>
                </div>

                <div
                    className={`flex h-8 px-2 gap-4 items-center rounded cursor-pointer ${ActiveSection !== 'analytics' ? ' hover:bg-gray-100' : " "}`}
                    onClick={() => setActiveSection('analytics')}
                >
                    <ChartPieIcon className={`w-4 h-4 ${ActiveSection === 'analytics' ? 'text-blue-500' : 'text-gray-600'}`} />
                    <span className={`text-sm font-medium ${ActiveSection === 'analytics' ? 'text-blue-500' : 'text-gray-800'}`}>
                        Analytics
                    </span>
                </div>

            </div>
        </div>
    );
};
