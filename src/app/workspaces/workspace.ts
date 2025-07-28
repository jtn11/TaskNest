import { useAuth } from "@/context/AuthContext";

// GET Workspace
export const GetWorkspace = async (token: string) => {
  try {
    const res = await fetch("http://localhost:8000/api/workspace", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch Workspace${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching workspace", error);
    return null;
  }
};

// POST Method
export const CreateWorkspace = async (name: string, token: string) => {
  try {
    const res = await fetch("http://localhost:8000/api/workspace", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }
    const data = await res.json();
    console.log("Workspace Created", data);
    return data;
  } catch (error) {
    console.error("Error creating workspace ", error);
  }
};
