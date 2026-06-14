"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth-context";
import { useWorkspace } from "./workspace-context";
import { GetCurrentUsersTask } from "@/app/dashboard/tasks/task";
import { GetOverViewTasks } from "@/context/overview";

interface TaskContextType {
  tasks: Task[];
  overViewTasks: Task[];
  triggerListRefresh: () => void;
  fetchTasks: (
    workspaceId: string,
    token: string,
    cursor?: number,
  ) => Promise<void>;
  hasMore: boolean;
  loading: boolean;
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
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [refreshList, setRefrestList] = useState(false);

  const triggerListRefresh = () => {
    setRefrestList((prev) => !prev);
  };

  const fetchTasks = async (
    workspaceId: string,
    token: string,
    cursor?: number,
  ) => {
    const data = await GetOverViewTasks(workspaceId, token, cursor);

    setTasks((prev) => [prev, ...data.tasks]);
    setCursor(data.nextCursor);
    setHasMore(data.hasMore);

    setLoading(false);
  };

  //Overview Tasks of Workspace

  useEffect(() => {
    const handleTask = async () => {
      const workspaceId = activeWorkspace?.id;
      if (!currentUser || !workspaceId) return;
      // // const taskByStatus = await GetOverViewTasks(workspaceId, token);
      // console.log("Added task ", taskByStatus);
      // setOverViewTasks(taskByStatus || []);
      fetchTasks(workspaceId, token);
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
    <TaskContext.Provider
      value={{
        tasks,
        overViewTasks,
        triggerListRefresh,
        fetchTasks,
        hasMore,
        loading,
      }}
    >
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
