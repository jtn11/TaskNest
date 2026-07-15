"use client";
import { useState } from "react";
import { TaskList } from "./tasks-list";
import { TaskNavBar } from "./tasks-navbar";

export default function Tasks() {
  const [activeState, setActiveState] = useState("todo");
  const [filterMode, setFilterMode] = useState<"all" | "mine">("all");

  return (
    <div className="flex flex-col h-screen">
      <TaskNavBar
        activeState={activeState}
        setActiveState={setActiveState}
        filterMode={filterMode}
        setFilterMode={setFilterMode}
      />
      <div className="flex-1 overflow-y-auto mt-2">
        <TaskList status={activeState} filterMode={filterMode} />
      </div>
    </div>
  );
}
