"use client";

import { useState } from "react";
import { Button } from "@mantine/core";
import {
  ClockIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";

export const TaskNavBar = () => {
  const [activeState, setActiveState] = useState("todo");

  console.log("activeState", activeState);

  return (
    <div className="max-w-full sticky">
      <div className="bg-white border border-gray-100 px-4 py-1">
        <div className="flex flex-wrap gap-2">
          {/* Todo */}
          <Button
            onClick={() => setActiveState("todo")}
            color="white"
            variant={"default"}
            size="xs"
            radius="md"
            leftSection={<ArrowUpOnSquareIcon className="w-4 h-4" />}
            className="
              px-4 rounded-sm font-medium transition-all duration-200
              flex items-center gap-2 border border-gray-200
              "
          >
            Todo
          </Button>

          {/* In-Progress */}
          <Button
            onClick={() => setActiveState("in-progress")}
            variant="default"
            size="xs"
            radius="md"
            leftSection={<ClockIcon className="w-4 h-4 text-yellow-500" />}
            className={`
              px-4 rounded-sm font-medium transition-all duration-200
              flex items-center gap-2 border border-gray-200
              ${activeState === "in-progress" ? "bg-gray-200" : ""}
            `}
          >
            In-Progress
          </Button>

          {/* In-Review */}
          <Button
            onClick={() => setActiveState("in-review")}
            variant="default"
            size="xs"
            radius="md"
            leftSection={
              <ClipboardDocumentListIcon className="w-4 h-4 text-green-600" />
            }
            className={`
              px-4 rounded-sm font-medium transition-all duration-200
              flex items-center gap-2 border border-gray-200
              ${activeState === "in-review" ? "bg-gray-200" : ""}
            `}
          >
            In-Review
          </Button>

          {/* Completed */}
          <Button
            onClick={() => setActiveState("completed")}
            variant="default"
            size="xs"
            radius="md"
            leftSection={<CheckCircleIcon className="w-4 h-4 text-blue-600" />}
            className={`
              px-4 rounded-sm font-medium transition-all duration-200
              flex items-center gap-2 border border-gray-200
              ${activeState === "completed" ? "bg-gray-200" : ""}
            `}
          >
            Completed
          </Button>
        </div>
      </div>
    </div>
  );
};
