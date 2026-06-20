"use client";
import React from "react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

interface EmptyStatusViewProps {
  status: string;
}

export const EmptyStatusView: React.FC<EmptyStatusViewProps> = ({ status }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-slate-500 p-8 mt-20 max-w-md mx-auto">
      <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-4 shadow-sm">
        <ClipboardDocumentIcon className="w-8 h-8" />
      </div>
      <h2 className="text-lg font-bold text-slate-800">
        No tasks in &apos;{status}&apos;
      </h2>
      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
        There are no tasks with the status &quot;{status}&quot; assigned to you.
      </p>
      <p className="text-xs text-slate-400 mt-2">Create a new task or check other categories.</p>
    </div>
  );
};

