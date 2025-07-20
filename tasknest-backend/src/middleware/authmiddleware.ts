import { Request, Response, NextFunction } from "express";
import { admin } from "../firebase/firebase";
import { auth, messaging } from "firebase-admin";

export interface AuthRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

// Middleware function to verify Firebase ID token
export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  // authHeader if have token  : Bearer <tokenid>
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Missing or invalid authorisation header" });
  }

  const tokenId = authHeader.split(" ")[1];
  try {
    // verify token using firebase admin sdk
    const decodedToken = await admin.auth().verifyIdToken(tokenId);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorised : Invalid token", error });
  }
};
