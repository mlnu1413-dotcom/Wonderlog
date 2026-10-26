# WanderLog Backend

REST API for the WanderLog travel blog: Node.js, Express, MongoDB (Mongoose), bcryptjs, express-session + connect-mongo, Jest/Supertest.

## Setup
```
npm install
cp .env.example .env    # fill in MONGODB_URI and SESSION_SECRET
npm start               # http://localhost:5000
npm test
```

## Environment variables
| Name | Description |
|------|-------------|
| PORT | API port (default 5000) |
| MONGODB_URI | MongoDB Atlas connection string |
| SESSION_SECRET | Long random string for signing the session cookie |
| FRONTEND_URL | Frontend address allowed by CORS (e.g. http://localhost:3000) |
| NODE_ENV | `production` enables secure cookies |

## Endpoints
- `GET /api/health`
- `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- `GET /api/posts`, `GET /api/posts/:id`, `POST /api/posts` (login required), `GET /api/my-posts` (login required)

Sessions use an HttpOnly, SameSite=Lax cookie; run behind HTTPS in production.
