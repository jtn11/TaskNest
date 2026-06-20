import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

export const EmptyTaskList = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-slate-500 p-8 mt-20 max-w-md mx-auto">
      <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-4 shadow-sm">
        <Square3Stack3DIcon className="w-8 h-8" />
      </div>
      <h2 className="text-lg font-bold text-slate-800">No tasks yet</h2>
      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
        There are no tasks in this workspace. Get started by creating your first task.
      </p>
    </div>
  );
};

