import { admin } from "./firebase/firebase";

async function run() {
  try {
    const uid = "HUyi9UUW0dOPHOS5j1gscrE6fRs1"; // test4@gmail.com
    await admin.auth().updateUser(uid, {
      password: "password"
    });
    console.log("Successfully updated password for test4@gmail.com to 'password'");
  } catch (err: any) {
    console.error("FAILED to update password:", err.message);
  }
}

run();
