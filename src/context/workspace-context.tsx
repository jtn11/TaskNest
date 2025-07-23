"use client";
import { CreateWorkspace, GetWorkspace } from "@/app/workspaces/workspace";
import router from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

interface WorkSpaceType {
  id: string;
  name: string;
  createdby: string;
}

interface WorkSpaceContextTypes {
  workspace: WorkSpaceType | null;
  handleCreateWorkspace: (name: string) => Promise<void>;
}

const WorkSpaceContext = createContext<WorkSpaceContextTypes | undefined>(
  undefined,
);

export const WorkspaceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [workspace, setWorkspace] = useState(null);

  const { currentUser } = useAuth();
  const handleCreateWorkspace = async (name: string) => {
    const result = await CreateWorkspace(name);
    if (result) {
      setWorkspace(result);
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    const fetchWorkspace = async () => {
      if (currentUser) {
        const data = await GetWorkspace();
        if (data) setWorkspace(data);
      }
    };

    fetchWorkspace();
  }, [currentUser]);

  return (
    <WorkSpaceContext.Provider value={{ workspace, handleCreateWorkspace }}>
      {children}
    </WorkSpaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkSpaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
};
