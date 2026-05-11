# StackWise Backend

Express + MongoDB + JWT auth. Deploy to Render.

## Local

```bash
cp .env.example .env   # fill MONGODB_URI + JWT_SECRET
npm install
npm run dev            # http://localhost:5000
```

## Endpoints

| Method | Path                       | Auth | Body                          |
| ------ | -------------------------- | ---- | ----------------------------- |
| POST   | /api/auth/signup           | —    | `{ name, email, password }`   |
| POST   | /api/auth/login            | —    | `{ email, password }`         |
| POST   | /api/auth/logout           | —    |                               |
| GET    | /api/auth/me               | JWT  |                               |
| POST   | /api/auth/forgot-password  | —    | `{ email }`                   |
| POST   | /api/auth/reset-password   | —    | `{ token, password }`         |

Auth header: `Authorization: Bearer <token>`.

## Deploy to Render

1. New Web Service → connect this repo (root `backend/`).
2. Build: `npm install` · Start: `npm start`.
3. Env vars: `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CLIENT_URL`, `NODE_ENV=production`.
4. Set frontend `VITE_API_URL` to the Render URL.

## MongoDB Atlas

Create a free cluster, add a DB user, whitelist `0.0.0.0/0` (or Render IPs), copy the SRV URI into `MONGODB_URI`.
