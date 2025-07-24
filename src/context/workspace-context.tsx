"use client";
import { CreateWorkspace, GetWorkspace } from "@/app/workspaces/workspace";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";

interface WorkSpaceType {
    id: string;
    name: string;
    createdby: string;
    members: [];
    createdBy?: string;
    assignedBy?: string;
    createdAt?: string | { seconds: number; nanoseconds: number };
}

interface WorkSpaceContextTypes {
    workspaces: WorkSpaceType[];
    activeWorkspace: WorkSpaceType | null;
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

    const { currentUser } = useAuth();
    const router = useRouter();

    const [workspaces, setWorkspaces] = useState<WorkSpaceType[]>([]);
    const [activeWorkspace, setActiveWorkspace] = useState<WorkSpaceType | null>(null);

    const handleCreateWorkspace = async (name: string) => {
        if (!currentUser) return;
        const token = await currentUser.getIdToken();
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
                const token = await currentUser.getIdToken();
                const data = await GetWorkspace(token);
                if (data) setWorkspaces(data);
                if (data.length > 0 && !activeWorkspace) {
                    setActiveWorkspace(data[data.length - 1]);
                }
                console.log("WholeData", data);
            }
        };

        fetchWorkspace();
    }, [currentUser]);

    useEffect(() => {
        console.log("Updated Workspaces:", workspaces);
    }, [workspaces]);

    useEffect(() => {
        console.log("Updated Active Workspace:", activeWorkspace);
    }, [activeWorkspace]);

    return (
        <WorkSpaceContext.Provider value={{ workspaces, activeWorkspace, handleCreateWorkspace }}>
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
