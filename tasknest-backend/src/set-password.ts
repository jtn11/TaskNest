import { admin } from "./firebase/firebase";

async function run() {
  try {
    const uid = "HqSsMzjWtsY5txhpBopdAv8vAAQ2"; // test@gmail.com
    await admin.auth().updateUser(uid, {
      password: "password"
    });
    console.log("Successfully updated password for test@gmail.com to 'password'");
  } catch (err: any) {
    console.error("FAILED to update password:", err.message);
  }
}

run();
