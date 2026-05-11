import User from "../models/User.js";
import { signAuthToken, signResetToken, verifyToken } from "../utils/token.js";

export async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already in use" });
    const user = await User.create({ name, email, password });
    const token = signAuthToken(user._id);
    res.status(201).json({ user: user.toSafeJSON(), token });
  } catch (e) { next(e); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });
    const token = signAuthToken(user._id);
    res.json({ user: user.toSafeJSON(), token });
  } catch (e) { next(e); }
}

export async function logout(_req, res) {
  // Stateless JWT — client discards token. Endpoint exists for symmetry.
  res.json({ message: "Logged out" });
}

export async function me(req, res) {
  res.json({ user: req.user.toSafeJSON() });
}

export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    // Always 200 to prevent email enumeration
    if (!user) return res.json({ message: "If that email exists, a reset link was sent" });
    const resetToken = signResetToken(user._id);
    const resetUrl = `${process.env.CLIENT_URL || ""}/reset-password?token=${resetToken}`;
    // TODO: integrate email provider. For now return token in dev.
    if (process.env.NODE_ENV !== "production") {
      return res.json({ message: "Reset link generated", resetUrl, resetToken });
    }
    res.json({ message: "If that email exists, a reset link was sent" });
  } catch (e) { next(e); }
}

export async function resetPassword(req, res, next) {
  try {
    const { token, password } = req.body;
    const decoded = verifyToken(token);
    if (decoded.kind !== "reset") return res.status(400).json({ message: "Invalid token" });
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ message: "Invalid token" });
    user.password = password;
    await user.save();
    const authToken = signAuthToken(user._id);
    res.json({ user: user.toSafeJSON(), token: authToken });
  } catch {
    res.status(400).json({ message: "Invalid or expired token" });
  }
}
