import { body, validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
  next();
};

export const signupRules = [
  body("name").trim().isLength({ min: 1, max: 100 }).withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email required").normalizeEmail(),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
];

export const loginRules = [
  body("email").isEmail().withMessage("Valid email required").normalizeEmail(),
  body("password").isLength({ min: 1 }).withMessage("Password required"),
];

export const forgotRules = [body("email").isEmail().normalizeEmail()];

export const resetRules = [
  body("token").isString().notEmpty(),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
];
