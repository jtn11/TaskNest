"use client";
import { TaskList } from "./tasks-list";
import { TaskNavBar } from "./tasks-navbar";

export default function Tasks() {
  return (
    <div className="flex flex-col h-screen">
      <TaskNavBar />
      <div className="flex-1 overflow-y-auto">
        <TaskList />
      </div>
    </div>
  );
}
