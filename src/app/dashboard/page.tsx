"use client";

import {
  AcademicCapIcon,
  BuildingLibraryIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/solid";

export default function DashboardPage() {
  return (
    <div className="w-full flex flex-col">
      <div className="p-5 flex justify-center items-center mt-50 mr-35">
        <Square3Stack3DIcon className="w-20 h-20 text-gray-500" />
      </div>
      <div>
        <span className="p-5 flex justify-center items-center mr-35">
          Assign Task
        </span>
      </div>
    </div>
  );
}
