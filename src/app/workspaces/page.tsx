"use client";

import { useWorkspace } from "@/context/workspace-context";
import { useState } from "react";

export default function WorkspacePage() {
  const [name, setName] = useState("");
  const { handleCreateWorkspace } = useWorkspace();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleCreateWorkspace(name);
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create Your Workspace
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Workspace Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. TaskNest Team"
            />
          </div>

          <div>
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Workspace URL{" "}
              <span className="text-xs text-gray-400">(optional)</span>
            </label>
            <input
              id="url"
              type="text"
              //   value={url}
              //   onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. tasknest-team"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <span>Create WorkSpace</span>
          </button>
        </form>
      </div>
    </main>
  );
}