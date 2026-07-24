import { getUsersTask } from "./controllers/task-controller";
import { Request, Response } from "express";

async function run() {
  const req = {
    params: { id: "CTGmB54Qc1cOus9kXKWp" },
    query: { limit: "100" },
    user: {
      uid: "HqSsMzjWtsY5txhpBopdAv8vAAQ2",
      email: "test@gmail.com"
    }
  } as any;

  const res = {
    status(code: number) {
      console.log("Status called with:", code);
      return this;
    },
    json(data: any) {
      console.log("JSON called with task count:", data?.tasks?.length);
      console.log("JSON data sample task:", data?.tasks?.[0]);
      console.log("JSON all tasks assignedTo and status:");
      data?.tasks?.forEach((t: any) => {
        console.log(`  - Title: "${t.title}", AssignedTo: "${t.assignedTo}", Status: "${t.status}"`);
      });
    }
  } as any;

  await getUsersTask(req, res);
}

run();
