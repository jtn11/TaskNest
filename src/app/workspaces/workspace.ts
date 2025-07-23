import { useAuth } from "@/context/AuthContext";
import { getAuth } from "firebase/auth";

// GET Workspace
export const GetWorkspace = async () => {
  const { currentUser } = getAuth();
  try {
    if (!currentUser) {
      throw new Error("User not Authenticated");
    }
    const token = await currentUser.getIdToken();
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
export const CreateWorkspace = async (name: string) => {
  const { currentUser } = useAuth();

  try {
    if (!currentUser) {
      throw new Error("user not Authenticated");
    }
    const token = await currentUser.getIdToken();
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
