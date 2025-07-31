"use client";
import { CreateWorkspace, GetWorkspace } from "@/app/workspaces/workspace";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { GetWorkspaceMembers } from "@/app/workspaces/members";
import { admin } from "../../tasknest-backend/src/firebase/firebase";

interface WorkSpaceType {
  id: string;
  name: string;
  createdby: string;
  members: [];
  createdBy?: string;
  assignedBy?: string;
  createdAt?: string | { seconds: number; nanoseconds: number };
}

interface UserType {
  uid: string;
  username: string;
  email?: string;
}

interface WorkSpaceContextTypes {
  workspaces: WorkSpaceType[];
  activeWorkspace: WorkSpaceType | null;
  handleCreateWorkspace: (name: string) => Promise<void>;
  setmembers: React.Dispatch<React.SetStateAction<UserType[]>>;
  setActiveWorkspace: React.Dispatch<
    React.SetStateAction<WorkSpaceType | null>
  >;
  members: UserType[];
}

const WorkSpaceContext = createContext<WorkSpaceContextTypes | undefined>(
  undefined,
);

export const WorkspaceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { currentUser } = useAuth();
  const router = useRouter();

  const [workspaces, setWorkspaces] = useState<WorkSpaceType[]>([]);
  const [activeWorkspace, setActiveWorkspace] = useState<WorkSpaceType | null>(
    null,
  );
  const [members, setmembers] = useState<UserType[]>([]);

  const tokenref = useRef<string | null>(null);

  useEffect(() => {
    const fetchCurrentUserToken = async () => {
      if (!currentUser) {
        return console.log("User not LoggedIn");
      }
      const token = await currentUser.getIdToken();
      tokenref.current = token;
    };
    fetchCurrentUserToken();
  }, [currentUser]);

  const handleCreateWorkspace = async (name: string) => {
    if (!currentUser) return;
    const token = tokenref.current;
    if (!token) {
      return console.log("token not available");
    }
    const result = await CreateWorkspace(name, token);
    if (result) {
      setWorkspaces((prev) => [...prev, result]); // append new workspace
      setActiveWorkspace(result); // make it the active workspace
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    const fetchWorkspace = async () => {
      if (currentUser) {
        const token = tokenref.current;
        if (!token) {
          return console.log("token not available");
        }
        const data = await GetWorkspace(token);
        if (data) {
          setWorkspaces(data);
        }
        if (data.length > 0 && !activeWorkspace) {
          setActiveWorkspace(data[data.length - 1]);
        }
        console.log("WholeData", data);
      }
    };
    fetchWorkspace();
  }, [tokenref.current]);

  const fetchmembers = async (workspaceId: string) => {
    if (!currentUser) return;

    const token = tokenref.current;
    if (!token) {
      console.warn("Token not available yet");
      return;
    }
    const data = await GetWorkspaceMembers(workspaceId, token);
    if (data) setmembers(data);
    console.log("fetchmember's Data", data);
  };

  useEffect(() => {
    if (activeWorkspace) fetchmembers(activeWorkspace.id);
  }, [activeWorkspace]);

  useEffect(() => {
    console.log("Updated Workspaces:", workspaces);
  }, [workspaces]);

  useEffect(() => {
    console.log("Updated Active Workspace:", activeWorkspace);
  }, [activeWorkspace]);

  return (
    <WorkSpaceContext.Provider
      value={{
        workspaces,
        activeWorkspace,
        setActiveWorkspace,
        handleCreateWorkspace,
        members,
        setmembers,
      }}
    >
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
