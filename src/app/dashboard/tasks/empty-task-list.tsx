import { Square3Stack3DIcon } from "@heroicons/react/16/solid";
import { Button } from "@mantine/core";

export const EmptyTaskList = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="p-5 flex justify-center items-center mt-50 mr-35">
        <Square3Stack3DIcon className="w-20 h-20 text-gray-500" />
      </div>
      <div>
        <span className="p-5 flex justify-center items-center mr-35">
          Create New Task
        </span>
      </div>
    </div>
  );
};
