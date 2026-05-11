import User from "../models/User.js";
import { verifyToken } from "../utils/token.js";

export async function protect(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: "Not authorized" });
    const decoded = verifyToken(token);
    if (decoded.kind === "reset") return res.status(401).json({ message: "Invalid token" });
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
