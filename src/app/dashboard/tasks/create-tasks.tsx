export const CreateUsersTask = async (
  title: string,
  description: string,
  assignedTo: string,
  status: string,
  priority: string,
  workspaceId: string,
  token: string,
) => {
  try {
    const res = await fetch(
      `http://localhost:8000/api/workspace/${workspaceId}/tasks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          assignedTo,
          status,
          priority,
        }),
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to add Task ,${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error Creating Task", error);
    return null;
  }
};
