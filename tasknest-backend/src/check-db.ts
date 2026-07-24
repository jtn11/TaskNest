import { db } from "./firebase/firebase";

async function run() {
  try {
    const usersSnapshot = await db.collection("users").get();
    console.log("--- USERS ---");
    usersSnapshot.forEach(doc => {
      console.log(doc.id, "=>", doc.data());
    });

    const workspacesSnapshot = await db.collection("workspace").get();
    console.log("--- WORKSPACES ---");
    for (const workspaceDoc of workspacesSnapshot.docs) {
      console.log(workspaceDoc.id, "=>", workspaceDoc.data());
      const tasksSnapshot = await workspaceDoc.ref.collection("tasks").get();
      console.log(`  Tasks for ${workspaceDoc.id}:`);
      tasksSnapshot.forEach(taskDoc => {
        console.log("  ", taskDoc.id, "=>", taskDoc.data());
      });
    }
  } catch (err) {
    console.error(err);
  }
}

run();
