<!-- Purpose: short, actionable guidance for AI coding agents working on this repo -->
# Copilot / AI Agent Instructions

Purpose: Help an AI coding agent get productive quickly in this monorepo (client, admin, server).

- **Big picture:** This is a mono-repo with two React frontends and an Express/Mongo backend.
  - Public site: [client](client) — consumes backend REST endpoints at `/api/*` (see [client/src/api.js](client/src/api.js)).
  - Admin site: [admin](admin) — React SPA for managing content; protects routes using a localStorage flag and expects auth cookies from the server (see [admin/src/components/ProtectedRoute.js](admin/src/components/ProtectedRoute.js) and [admin/src/Login.js](admin/src/Login.js)).
  - Server: [server](server) — Express API + Mongo models; serves built client via static files and a catch-all route (see [server/server.js](server/server.js)).

- **Key integration points & patterns:**
  - REST endpoints mirror models in [server/models](server/models) and routes in [server/routes](server/routes).
  - Authentication: JWT is issued by [server/routes/authRoutes.js](server/routes/authRoutes.js) and stored in an httpOnly cookie with `secure: true` and `sameSite: 'none'` to allow cross-site cookies for deployed admin (Vercel) <> server (Render). In local dev the frontends use `proxy` in package.json to avoid CORS.
  - Frontends use `fetch` (see [client/src/api.js](client/src/api.js) and [admin/src/Login.js](admin/src/Login.js)); some packages also include `axios` but usage is inconsistent—follow existing `fetch` patterns for new endpoints unless switching project-wide.

- **Developer workflows:**
  - Install & dev:
    - `npm run install-all` (root) — installs `client` and `server` deps.
    - Run server: `npm run server` (uses `nodemon server/server.js`).
    - Run client or admin separately: `cd client && npm start` or `cd admin && npm start`.
  - Production build:
    - `npm run build` (root) builds `client` to `client/build` which `server` serves statically.
    - `heroku-postbuild` runs `install-all` + `build` for Heroku-like deploys.

- **Environment variables and secrets:**
  - The server expects `.env` in `server/` with at least `MONGO_URI` and `JWT_SECRET` (see the startup checks in [server/server.js](server/server.js)).
  - Cookie behavior depends on `NODE_ENV` and HTTPS—local dev uses `proxy`; deployed admin uses `sameSite:'none'` and `secure:true` (see comments in `authRoutes.js`).

- **Project-specific conventions:**
  - Routes use `/api/<resource>` (e.g., `/api/projects`, `/api/skills`, `/api/contact`). Add server-side features by: model -> route -> controller (in the route file) -> frontend API call.
  - Admin route protection is client-side via `localStorage.isLoggedIn`. To verify server-side auth, call `/api/auth/user` which uses `authMiddleware` to validate the JWT cookie.
  - Prefer minimal, focused edits: update related `client`/`admin` components and `server` routes together.

- **Debugging & tests:**
  - Server logs environment and exits on uncaught exceptions/unhandled rejections (see `server/server.js`). Use `console.log` here for quick checks.
  - Frontend tests can be run with `npm test` inside `client` or `admin` (React Testing Library + react-scripts).

- **Where to look when adding a feature:**
  - API: add model in `server/models`, add route in `server/routes`, wire it to `/api/<resource>` and match the pattern used by the existing routes.
  - Client: add fetching helpers in `client/src/api.js` (or in `admin/src` for admin-only features), add components/pages under `src/pages` and wire routes in `App.js`.

- **Examples to follow:**
  - User auth flow: `admin` POSTs to `/api/auth/login` (see [admin/src/Login.js](admin/src/Login.js)) and server sets cookie in `authRoutes.js`.
  - Static serving + catch-all: implemented in [server/server.js](server/server.js).

If anything here is unclear or you'd like me to expand a section (e.g., add examples for adding a new model+route+UI), tell me which part to iterate on.
