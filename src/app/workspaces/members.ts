import { AuthRequest } from "../../../tasknest-backend/src/middleware/authmiddleware";

export const GetWorkspaceMembers = async (
  workspaceId: string,
  token: string,
) => {
  try {
    const res = await fetch(
      `http://localhost:8000/api/workspace/${workspaceId}/members`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    if (!res.ok) throw new Error(`Failed to fetch members: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.log("Error fetching members", error);
    return [];
  }
};

export const AddWorkspaceMember = async (
  workspaceId: string,
  email: string,
  token: string,
) => {
  try {
    const res = await fetch(
      `http://localhost:8000/api/workspace/${workspaceId}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      },
    );
    console.log(workspaceId, email);
    if (!res.ok) throw new Error(`failed to add Member ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error adding member", error);
    return null;
  }
};
