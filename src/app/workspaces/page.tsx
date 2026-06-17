"use client";

import { useWorkspace } from "@/context/workspace-context";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function WorkspacePage() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleCreateWorkspace, workspaces } = useWorkspace();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") return;
    setIsSubmitting(true);
    try {
      await handleCreateWorkspace(name);
    } catch (err) {
      console.error("Error creating workspace:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push("/dashboard");
  };

  return (
    <main className="relative flex items-center justify-center min-h-screen bg-slate-50 overflow-hidden px-4">
      {/* Decorative gradient blur spots */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-blue-100 rounded-full blur-3xl -ml-60 -mt-60 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-indigo-100 rounded-full blur-3xl -mr-40 -mb-40 opacity-40 pointer-events-none" />

      <div className="w-full max-w-lg z-10 space-y-6">
        {/* Back button (only if user has other workspaces) */}
        {workspaces && workspaces.length > 0 && (
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-700 bg-white border border-slate-200/80 rounded-full px-4 py-2 shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            <span>Go back to dashboard</span>
          </button>
        )}

        {/* Card Container */}
        <div className="bg-white/90 backdrop-blur-md shadow-2xl border border-slate-200/80 rounded-[32px] p-8 md:p-10 space-y-8">
          {/* Logo & Header */}
          <div className="text-center space-y-3">
            <div className="mx-auto w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/10">
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
              Create a new workspace
            </h1>
            <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
              Workspaces are shared hubs where your team can collaborate on projects, track tasks, and chat in real-time.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Workspace Name Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="block text-xs font-bold text-slate-500 uppercase tracking-wider"
              >
                Workspace Name
              </label>
              <input
                id="name"
                type="text"
                required
                disabled={isSubmitting}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  // Auto-generate URL slug
                  setUrl(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
                }}
                className="w-full px-4 py-2.5 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl text-sm text-slate-700 bg-white placeholder-slate-400 focus:outline-none shadow-sm transition-all"
                placeholder="e.g. Acme Corporation, Design Team"
              />
            </div>

            {/* Subdomain Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="url"
                className="block text-xs font-bold text-slate-500 uppercase tracking-wider"
              >
                Workspace URL <span className="text-[10px] text-slate-400 normal-case font-normal">(optional)</span>
              </label>
              <div className="flex items-center rounded-xl border border-slate-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 overflow-hidden shadow-sm bg-white transition-all">
                <span className="bg-slate-50/80 px-4 py-2.5 text-xs font-semibold text-slate-400 select-none border-r border-slate-200 flex items-center h-full">
                  tasknest.com/
                </span>
                <input
                  id="url"
                  type="text"
                  disabled={isSubmitting}
                  value={url}
                  onChange={(e) => setUrl(e.target.value.toLowerCase().replace(/[^a-z0-9\-]+/g, ""))}
                  className="w-full px-4 py-2.5 text-sm text-slate-700 bg-transparent placeholder-slate-400 focus:outline-none border-none"
                  placeholder="acme-corp"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || name.trim() === ""}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-300 text-white py-3 rounded-xl font-bold shadow-md hover:shadow-indigo-500/10 transition-all duration-150 active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Creating Workspace...</span>
                </>
              ) : (
                <span>Create Workspace</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
