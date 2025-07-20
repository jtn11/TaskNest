"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function WorkspacePage() {
  const [workspaceName, setWorkspaceName] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();
  const router = useRouter();

  const CreateWorkspace = async (name: string) => {
    try {
      if (!currentUser) {
        throw new Error("user not Authenticated");
      }
      const token = await currentUser.getIdToken();
      const res = await fetch("http://localhost:8000/api/workspace", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }
      const data = await res.json();
      console.log("Workspace Created", data);
      return data;
    } catch (error) {
      console.error("Error creating workspace ", error);
    }
  };

  const handleCreateWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await CreateWorkspace(workspaceName);
    if (result) {
      router.push("/dashboard");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create Your Workspace
        </h1>

        <form onSubmit={handleCreateWorkspace} className="space-y-5">
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
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
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
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {loading ? "Creating..." : "Create Workspace"}
          </button>
        </form>
      </div>
    </main>
  );
}
