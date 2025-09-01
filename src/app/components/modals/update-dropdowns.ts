import { UpdateTask } from "../../dashboard/tasks/update-task";

export const updateTasks = async (
  token: string,
  selectedListId: string,
  workspaceId: string,
  updates: { [key: string]: string },
) => {
  try {
    console.log("This userToken is for taskupdate", token);
    console.log("workspaceId", workspaceId);
    console.log("selectedListId", selectedListId);
    if (!selectedListId || !workspaceId || !token) {
      return;
    }

    console.log("Sending to backend", {
      selectedListId,
      workspaceId,
      updates,
      token,
    });
    await UpdateTask(selectedListId, workspaceId, updates, token);
    console.log(" Task updated successfully");
  } catch (err) {
    console.error("Failed to update task:", err);
  }
};
