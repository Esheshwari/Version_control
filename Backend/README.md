# Backend (GitHub Clone)

Quick start:

1. Copy `.env.example` -> `.env` and fill values (MONGODB_URI, JWT_SECRET_KEY)
2. Install dependencies

```powershell
cd Backend
npm install
```

3. Start server

```powershell
npm run start
# or for development with auto-reload
npm run dev
```

Endpoints:
- `POST /signup` { username, email, password }
- `POST /login` { email, password }
- `GET /users` (protected)
- `GET /user/:id` (protected)
- `PUT /user/update/:id` (protected)
- `DELETE /user/delete/:id` (protected)

Repo endpoints (no auth enforced yet):
- `POST /repo/create`
- `GET /repo/all`
- `GET /repo/:id`
- `GET /repo/name/:name`
- `GET /repo/user/:userID`
- `PUT /repo/update/:id`
- `DELETE /repo/delete/:id`
- `PATCH /repo/toggle/:id`

Issues:
- `POST /issue/create` (expects repo id param?)
- `PUT /issue/update/:id`
- `DELETE /issue/delete/:id`
- `GET /issue/all` (expects repo id param?)
- `GET /issue/:id`

Notes:
- The API uses JWT in `Authorization: Bearer <token>` for protected routes.
- Provide a real MongoDB URI in `.env` before starting.
