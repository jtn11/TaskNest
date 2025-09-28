"use client";
import React from "react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

interface EmptyStatusViewProps {
  status: string;
}

export const EmptyStatusView: React.FC<EmptyStatusViewProps> = ({ status }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-gray-500 p-8 mt-20">
      <ClipboardDocumentIcon className="w-24 h-24 text-gray-300 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700">
        No tasks in '{status}'
      </h2>
      <p className="mt-2">
        There are no tasks with the status "{status}" assigned to you.
      </p>
      <p className="mt-1">Create a new task or check other categories.</p>
    </div>
  );
};
