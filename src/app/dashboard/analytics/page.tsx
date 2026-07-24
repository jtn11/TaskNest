"use client";
import React, { useEffect } from "react";
import { useTasks } from "@/context/task-context";
import { useWorkspace } from "@/context/workspace-context";
import { useAuth } from "@/context/auth-context";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";

interface MemberData {
  name: string;
  completed: number;
  pending: number;
  total: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    name: string;
    value: string | number | boolean;
    color?: string;
    fill?: string;
  }[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-slate-200/80 p-3 rounded-xl shadow-lg select-none">
        {label && (
          <p className="text-xs font-bold text-slate-800 mb-1.5">{label}</p>
        )}
        <div className="space-y-1">
          {payload.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full border border-white/20"
                style={{ backgroundColor: item.color || item.fill }}
              />
              <span className="text-xs text-slate-500 font-medium">
                {item.name}:
              </span>
              <span className="text-xs font-extrabold text-slate-800">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const AnalyticsDashboard = () => {
  const { tasks, triggerListRefresh } = useTasks();
  const { activeWorkspace, members } = useWorkspace();
  const { currentUser } = useAuth();

  useEffect(() => {
    triggerListRefresh();
  }, []);

  if (!activeWorkspace?.id) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-slate-500 font-semibold text-sm">
        Select or create a workspace to view your analytics dashboard.
      </div>
    );
  }

  // Personal statistics calculations
  const personalStats = {
    completed: 0,
    inProgress: 0,
    pending: 0,
  };

  tasks.forEach((task) => {
    if (task.assignedTo?.toLowerCase() !== currentUser?.email?.toLowerCase()) {
      return;
    }
    const status = task.status ? task.status.toLowerCase() : "";
    if (status === "completed") {
      personalStats.completed++;
    } else if (status === "in-progress" || status === "review") {
      personalStats.inProgress++;
    } else {
      personalStats.pending++;
    }
  });

  const totalUserTasks = tasks.filter(
    (task) => task.assignedTo?.toLowerCase() === currentUser?.email?.toLowerCase()
  ).length;
  const userCompletionRate =
    totalUserTasks > 0 ? (personalStats.completed / totalUserTasks) * 100 : 0;

  const personalChartData = [
    {
      name: "Completed",
      value: personalStats.completed,
      fill: "url(#pieCompleted)",
    },
    {
      name: "In Progress",
      value: personalStats.inProgress,
      fill: "url(#pieInProgress)",
    },
    { name: "Pending", value: personalStats.pending, fill: "url(#piePending)" },
  ].filter((item) => item.value > 0);

  // Workspace statistics calculations
  const workspaceCompletedTaskCount = tasks.filter(
    (task) => task.status?.toLowerCase() === "completed",
  ).length;

  const completionPercentage =
    tasks.length > 0
      ? (workspaceCompletedTaskCount / tasks.length) * 100
      : 0;

  const teamTasks: MemberData[] = members.map((member) => {
    const memberTasks = tasks.filter(
      (task) => task.assignedTo?.toLowerCase() === member.email?.toLowerCase(),
    );
    const completed = memberTasks.filter(
      (task) => task.status?.toLowerCase() === "completed",
    ).length;
    const pending = memberTasks.filter(
      (task) => task.status?.toLowerCase() !== "completed",
    ).length;

    return {
      name:
        member.username ||
        (member.email ? member.email.split("@")[0] : "unknown"),
      completed,
      pending,
      total: memberTasks.length,
    };
  });

  // Priority Stats
  const priorityStats = {
    high: tasks.filter((t) => t.priority?.toLowerCase() === "high")
      .length,
    medium: tasks.filter((t) => t.priority?.toLowerCase() === "medium")
      .length,
    low: tasks.filter((t) => t.priority?.toLowerCase() === "low")
      .length,
  };
  const totalWorkspaceTasks = tasks.length;

  // Status Stats
  const statusStats = {
    backlog: tasks.filter((t) => t.status?.toLowerCase() === "backlog")
      .length,
    todo: tasks.filter((t) => t.status?.toLowerCase() === "todo")
      .length,
    inProgress: tasks.filter(
      (t) => t.status?.toLowerCase() === "in-progress",
    ).length,
    review: tasks.filter((t) => t.status?.toLowerCase() === "review")
      .length,
    completed: workspaceCompletedTaskCount,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-slate-50/20 min-h-screen">
      {/* SVG Gradient definitions for Recharts */}
      <svg width={0} height={0} className="absolute">
        <defs>
          <linearGradient id="completedGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.95} />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.95} />
          </linearGradient>
          <linearGradient id="pendingGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#d97706" stopOpacity={0.9} />
          </linearGradient>
          <linearGradient id="pieCompleted" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={0.95} />
            <stop offset="100%" stopColor="#059669" stopOpacity={0.95} />
          </linearGradient>
          <linearGradient id="pieInProgress" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.95} />
            <stop offset="100%" stopColor="#2563eb" stopOpacity={0.95} />
          </linearGradient>
          <linearGradient id="piePending" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.95} />
            <stop offset="100%" stopColor="#d97706" stopOpacity={0.95} />
          </linearGradient>
        </defs>
      </svg>

      {/* Premium Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/60 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2 select-none">
            Workspace Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Real-time workload metrics, completion progress, and team
            performance overview.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200/80 rounded-xl px-4 py-2 shadow-sm select-none shrink-0 self-start sm:self-auto hover:border-slate-300 transition-colors">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-700">
            {activeWorkspace?.name || "Workspace"}
          </span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Tasks Card */}
        <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between cursor-default group">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Workspace Tasks
            </span>
            <span className="text-2xl font-extrabold text-slate-800 block">
              {tasks.length}
            </span>
            <span className="text-[11px] font-semibold text-slate-500 block">
              {workspaceCompletedTaskCount} completed •{" "}
              {tasks.length - workspaceCompletedTaskCount} active
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <ClipboardDocumentListIcon className="w-5 h-5 text-blue-600" />
          </div>
        </div>

        {/* Your Completions Card */}
        <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between cursor-default group">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Your Completions
            </span>
            <span className="text-2xl font-extrabold text-slate-800 block">
              {personalStats.completed}
            </span>
            <span className="text-[11px] font-semibold text-slate-500 block">
              Out of {totalUserTasks} assigned tasks
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <CheckCircleIcon className="w-5 h-5 text-emerald-600" />
          </div>
        </div>

        {/* Completion Rate Card */}
        <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between cursor-default group">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Completion Rate
            </span>
            <span className="text-2xl font-extrabold text-slate-800 block">
              {completionPercentage.toFixed(1)}%
            </span>
            <span className="text-[11px] font-semibold text-slate-500 block">
              Workspace average performance
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <ArrowTrendingUpIcon className="w-5 h-5 text-indigo-600" />
          </div>
        </div>

        {/* Active Members Card */}
        <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between cursor-default group">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Workspace Members
            </span>
            <span className="text-2xl font-extrabold text-slate-800 block">
              {members.length}
            </span>
            <span className="text-[11px] font-semibold text-slate-500 block">
              {teamTasks.filter((t) => t.total > 0).length} active contributors
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <UserGroupIcon className="w-5 h-5 text-amber-600" />
          </div>
        </div>
      </div>

      {/* Main Visualizations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Your Task Progress - Donut Chart (2 columns span) */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Personal Performance
            </span>
            <h2 className="text-lg font-bold text-slate-800 leading-snug">
              Your Task Progress
            </h2>
          </div>

          <div className="my-6 relative flex items-center justify-center">
            {totalUserTasks === 0 ? (
              <div className="h-[250px] flex flex-col items-center justify-center text-center px-4">
                <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-3">
                  <DocumentCheckIcon className="w-6 h-6 text-slate-400" />
                </div>
                <span className="text-sm font-semibold text-slate-600">
                  No tasks assigned
                </span>
                <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
                  Add tasks in this workspace and assign them to yourself to see
                  progress.
                </p>
              </div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={personalChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                      labelLine={false}
                    >
                      {personalChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.fill}
                          className="outline-none"
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center text overlay */}
                <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none select-none">
                  <span className="text-3xl font-extrabold text-slate-800 leading-none">
                    {userCompletionRate.toFixed(0)}%
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1.5">
                    Completed
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Chart Legend Footer */}
          {totalUserTasks > 0 && (
            <div className="flex items-center justify-center gap-6 border-t border-slate-100 pt-4 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-slate-600">
                  Completed ({personalStats.completed})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="text-slate-600">
                  In Progress ({personalStats.inProgress})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-slate-600">
                  Pending ({personalStats.pending})
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Team Workload Breakdown - Bar Chart (3 columns span) */}
        <div className="lg:col-span-3 bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Workspace Workload
            </span>
            <h2 className="text-lg font-bold text-slate-800 leading-snug">
              Team Workload Breakdown
            </h2>
          </div>

          <div className="my-6">
            {tasks.length === 0 ? (
              <div className="h-[250px] flex flex-col items-center justify-center text-center px-4">
                <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-3">
                  <UserGroupIcon className="w-6 h-6 text-slate-400" />
                </div>
                <span className="text-sm font-semibold text-slate-600">
                  No workspace data
                </span>
                <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
                  Tasks added to the workspace will populate team workload
                  graphs.
                </p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={teamTasks}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f1f5f9"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="completed"
                    name="Completed"
                    fill="url(#completedGrad)"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={32}
                  />
                  <Bar
                    dataKey="pending"
                    name="Pending"
                    fill="url(#pendingGrad)"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={32}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Bar Chart Legend Footer */}
          {tasks.length > 0 && (
            <div className="flex items-center justify-center gap-6 border-t border-slate-100 pt-4 text-xs font-semibold select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-gradient-to-r from-blue-500 to-blue-600" />
                <span className="text-slate-600">Completed Tasks</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-gradient-to-r from-amber-500 to-amber-600" />
                <span className="text-slate-600">Pending Tasks</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Grid: Priority Breakdown + Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Breakdown */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Workspace Priorities
            </span>
            <h2 className="text-lg font-bold text-slate-800 leading-snug">
              Priority Breakdown
            </h2>
          </div>

          <div className="space-y-4 pt-2">
            {/* High Priority Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-rose-600 flex items-center gap-1.5 uppercase tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  High Priority
                </span>
                <span className="text-slate-700 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-md">
                  {priorityStats.high} tasks
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${totalWorkspaceTasks > 0 ? (priorityStats.high / totalWorkspaceTasks) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Medium Priority Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-amber-600 flex items-center gap-1.5 uppercase tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Moderate Priority
                </span>
                <span className="text-slate-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md">
                  {priorityStats.medium} tasks
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${totalWorkspaceTasks > 0 ? (priorityStats.medium / totalWorkspaceTasks) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Low Priority Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-500 flex items-center gap-1.5 uppercase tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                  Low Priority
                </span>
                <span className="text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                  {priorityStats.low} tasks
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-400 rounded-full transition-all duration-500"
                  style={{
                    width: `${totalWorkspaceTasks > 0 ? (priorityStats.low / totalWorkspaceTasks) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Status Distribution Breakdown */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Work Stages
            </span>
            <h2 className="text-lg font-bold text-slate-800 leading-snug">
              Workspace Status Distribution
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            {/* Backlog Pill */}
            <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col items-center justify-center text-center shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Backlog
              </span>
              <span className="text-xl font-extrabold text-slate-700 mt-1">
                {statusStats.backlog}
              </span>
            </div>

            {/* Todo Pill */}
            <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col items-center justify-center text-center shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                To Do
              </span>
              <span className="text-xl font-extrabold text-slate-700 mt-1">
                {statusStats.todo}
              </span>
            </div>

            {/* In Progress Pill */}
            <div className="bg-blue-50/30 border border-blue-100/50 p-3 rounded-xl flex flex-col items-center justify-center text-center shadow-sm">
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">
                In Progress
              </span>
              <span className="text-xl font-extrabold text-blue-600 mt-1">
                {statusStats.inProgress}
              </span>
            </div>

            {/* Review Pill */}
            <div className="bg-purple-50/30 border border-purple-100/50 p-3 rounded-xl flex flex-col items-center justify-center text-center shadow-sm">
              <span className="text-[10px] font-bold text-purple-500 uppercase tracking-wider">
                In Review
              </span>
              <span className="text-xl font-extrabold text-purple-600 mt-1">
                {statusStats.review}
              </span>
            </div>

            {/* Completed Pill */}
            <div className="bg-emerald-50/30 border border-emerald-100/50 p-3 rounded-xl flex flex-col items-center justify-center text-center col-span-2 sm:col-span-1 shadow-sm">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                Completed
              </span>
              <span className="text-xl font-extrabold text-emerald-700 mt-1">
                {statusStats.completed}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
