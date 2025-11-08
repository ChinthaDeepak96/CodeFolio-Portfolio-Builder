# CodeFolio (monorepo)

This workspace contains two apps:

- `backend` — Express + MongoDB API
- `frontend` — Vite + React frontend

Quick start (macOS / zsh):

1. Install dependencies for both projects:

```bash
# from repo root
npm install
npm run install-all
```

2. Start both dev servers (single command):

```bash
npm run dev
```

This runs `nodemon` for the backend and `vite` for the frontend. Backend defaults to port `5000` and frontend to `5173`.

Notes
- Add required env vars in `backend/.env` (do NOT commit):
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `PORT` (optional)
  - `NODE_ENV=development`
- `frontend`'s TypeScript config allows importing JavaScript files.
- If you accidentally committed secrets, rotate them and scrub git history.
