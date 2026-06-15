import { useWorkspace } from "@/context/workspace-context";
import { PlusIcon, HomeIcon } from "@heroicons/react/24/outline";
import { Menu, Group, Divider, Avatar, Tooltip } from "@mantine/core";
import { useRouter } from "next/navigation";

export const WorkSpaceDropdown = () => {
  const { workspaces, setActiveWorkspace } = useWorkspace();
  const router = useRouter();

  return (
    <Menu shadow="md" width={220} position="bottom-end" withArrow>
      <Menu.Target>
        <div>
          <Tooltip className="text-xs" label="Switch Workspace">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-transparent hover:border-slate-200/40 cursor-pointer transition-all duration-150">
              <HomeIcon className="w-4.5 h-4.5" />
            </div>
          </Tooltip>
        </div>
      </Menu.Target>

      <Menu.Dropdown className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-xl shadow-lg p-1.5 min-w-[200px]">
        <Menu.Label className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          <Group className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <HomeIcon className="w-3.5 h-3.5 text-slate-400 mr-2" />
              <span>Workspaces</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">
              {workspaces.length}
            </span>
          </Group>
        </Menu.Label>

        <div className="space-y-0.5 my-1">
          {workspaces.map((WorkSpace) => (
            <Menu.Item
              key={WorkSpace.id}
              className="flex items-center px-3 py-1.5 hover:bg-slate-100/60 rounded-lg transition-colors duration-150 cursor-pointer"
              onClick={() => setActiveWorkspace(WorkSpace)}
            >
              <div className="flex items-center space-x-2.5">
                <Avatar
                  color="blue"
                  radius="xl"
                  size="sm"
                  className="w-5 h-5 flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                >
                  {WorkSpace.name.charAt(0).toUpperCase()}
                </Avatar>
                <span className="text-sm font-medium text-slate-700">
                  {WorkSpace.name}
                </span>
              </div>
            </Menu.Item>
          ))}
        </div>

        <Divider className="border-t border-slate-100 my-1" />

        <Menu.Item
          className="flex items-center w-full px-3 py-2 text-left hover:bg-blue-50 text-blue-600 hover:text-blue-700 rounded-lg transition-colors duration-150 font-medium text-sm cursor-pointer"
          onClick={() => router.push("/workspaces")}
          leftSection={
            <PlusIcon className="w-4 h-4 text-blue-500 shrink-0 mr-1" />
          }
        >
          Add Workspace
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
