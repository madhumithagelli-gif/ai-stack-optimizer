import jwt from "jsonwebtoken";

export function signAuthToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

export function signResetToken(userId) {
  return jwt.sign({ id: userId, kind: "reset" }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_RESET_EXPIRES_IN || "15m",
  });
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
