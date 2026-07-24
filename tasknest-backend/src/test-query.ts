import { db } from "./firebase/firebase";

async function run() {
  try {
    const workspaceId = "CTGmB54Qc1cOus9kXKWp";
    const email = "test4@gmail.com";
    
    console.log("Query 1: No onlymine");
    const q1 = db.collection("workspace").doc(workspaceId).collection("tasks")
      .orderBy("createdAt", "desc").limit(5);
    const s1 = await q1.get();
    console.log("Query 1 succeeded, count:", s1.size);

    console.log("Query 2: With onlymine");
    const q2 = db.collection("workspace").doc(workspaceId).collection("tasks")
      .where("assignedTo", "==", email)
      .orderBy("createdAt", "desc").limit(5);
    const s2 = await q2.get();
    console.log("Query 2 succeeded, count:", s2.size);
  } catch (err: any) {
    console.error("QUERY FAILED:", err.message);
  }
}

run();
