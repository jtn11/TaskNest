"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth-context";
import { useWorkspace } from "./workspace-context";
import { GetCurrentUsersTask } from "@/app/dashboard/tasks/task";
import { GetOverViewTasks } from "@/app/dashboard/overview/overview";

interface TaskContextType {
  tasks: Task[];
  overViewTasks: Task[];
  triggerListRefresh: () => void;
}

interface Task {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  assignedTo: string;
  status: string;
  priority: string;
  createdAt: string;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();
  const { activeWorkspace, token } = useWorkspace();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [overViewTasks, setOverViewTasks] = useState<Task[]>([]);

  const [refreshList, setRefrestList] = useState(false);

  const triggerListRefresh = () => {
    setRefrestList((prev) => !prev);
  };

  //Overview Tasks of Workspace

  useEffect(() => {
    const handleTask = async () => {
      const workspaceId = activeWorkspace?.id;
      if (!currentUser || !workspaceId) return;
      const taskByStatus = await GetOverViewTasks(workspaceId, token);
      console.log("Added task ", taskByStatus);
      setOverViewTasks(taskByStatus || []);
    };
    handleTask();
  }, [currentUser, activeWorkspace, refreshList]);

  // Tasks for LoggedIn User
  useEffect(() => {
    const handleTask = async () => {
      const workspaceId = activeWorkspace?.id;
      if (!currentUser || !workspaceId) return;
      const taskByStatus = await GetCurrentUsersTask(workspaceId, token);
      console.log("Tasks of Current User", taskByStatus);
      setTasks(taskByStatus || []);
    };
    handleTask();
  }, [currentUser, activeWorkspace, token, refreshList]);

  return (
    <TaskContext.Provider value={{ tasks, overViewTasks, triggerListRefresh }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within and TaskProvider");
  }
  return context;
};
