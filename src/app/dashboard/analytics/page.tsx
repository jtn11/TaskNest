"use client";
import { useTasks } from "@/context/task-context";
import { useWorkspace } from "@/context/workspace-context";
import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface MemberData {
  name: string;
  tasksCompleted: number;
}

interface PersonalData {
  name: string;
  value: number;
}

const COLORS = ["#2563EB", "#ffc658", "#82ca9d"];

const AnalyticsDashboard = () => {
  const { tasks, overViewTasks } = useTasks();
  const { members } = useWorkspace();

  const personalStats = {
    completed: 0,
    pending: 0,
    review: 0,
  };

  tasks.forEach((task) => {
    if (task.status === "completed") personalStats.completed++;
    else if (["todo", "backlog"].includes(task.status)) personalStats.pending++;
    else if (task.status === "review") personalStats.review++;
  });

  const personalTasks: PersonalData[] = [
    { name: "Completed", value: personalStats.completed },
    { name: "Pending", value: personalStats.pending },
    { name: "Review ", value: personalStats.review },
  ];

  const workspaceCompletedTaskCount = overViewTasks.filter(
    (task) => task.status === "completed",
  ).length;

  const teamTasks: MemberData[] = members.map((member) => {
    const completedCount = overViewTasks.filter(
      (task) => task.status === "completed" && task.assignedTo === member.email,
    ).length;

    return {
      name: member.email ? member.email.split("@")[0] : "unknown user",
      tasksCompleted: completedCount,
    };
  });

  const completionPercentage =
    (workspaceCompletedTaskCount / overViewTasks.length) * 100 || 0;

  return (
    <div className="p-6 font-sans min-h-screen bg-gray-100 overflow-y-hidden">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Workspace Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Total Workspace-Tasks
          </h2>
          <p className="text-4xl font-bold text-indigo-600 mt-2">
            {overViewTasks.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Your Completions
          </h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">
            {personalStats.completed}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Completion Rate
          </h2>
          <p className="text-4xl font-bold text-indigo-600 mt-2">
            {completionPercentage.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Your Task Progress
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={personalTasks}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                labelLine={false}
              >
                {personalTasks.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Team Task Completion
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teamTasks}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tasksCompleted" fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
