# WanderLog - A Travel Blog

WanderLog is a simple college project made of **two separate applications**:

- `backend/` - Node.js + Express REST API (MongoDB, sessions, authentication). Runs on port 5000.
- `frontend/` - Vue 3 single-page app (Vite, Vue Router, Bootstrap 4, SASS, PWA). Runs on port 3000 and calls the API.

## Features
- Browse recent and all travel posts (no login needed)
- Signup / login / logout with sessions and cookies
- Create posts (login required) from a Vue form that calls the API
- "My Posts" page showing only your posts
- Frontend + backend validation, responsive Bootstrap 4 layout
- Basic PWA (manifest, service worker, offline page)
- Jest + Supertest tests

## Technology Stack
HTML5, CSS3/SASS, Bootstrap 4, JavaScript ES6, Vue 3, Vue Router, Vite, fetch (AJAX), Node.js, Express, MongoDB, Mongoose, bcryptjs, express-session, connect-mongo, cors, Jest, Supertest.

## Folder Structure
```
backend/   app.js, models/, routes/, middleware/, tests/, .env.example
frontend/  index.html, vite.config.js, public/ (manifest, service worker, offline page, icons), src/ (views/, components/, router.js, api.js, auth.js, scss/)
```

## Installation
```
cd backend  && npm install
cd ../frontend && npm install
```

## MongoDB Configuration (Atlas)
1. Create a free cluster at https://www.mongodb.com/atlas.
2. Create a database user and allow your IP under Network Access.
3. Click Connect > Drivers, copy the connection string and put it in `MONGODB_URI` in `backend/.env` (add `/wanderlog` as the database name).

## Environment Variables (backend/.env)
| Name | Description |
|------|-------------|
| PORT | API port (default 5000) |
| MONGODB_URI | MongoDB connection string |
| SESSION_SECRET | Long random string used to sign the session cookie |
| FRONTEND_URL | Address of the frontend (allowed by CORS), e.g. http://localhost:3000 |
| NODE_ENV | `development` locally, `production` when deployed (enables secure cookies) |

Copy `backend/.env.example` to `backend/.env` and fill it in. Never commit `.env`.

The frontend reads the API address from `VITE_API_URL` in `frontend/.env` (copy `frontend/.env.example`; default http://localhost:5000).

## Run
Open two terminals:
```
cd backend  && npm start     # API on http://localhost:5000
cd frontend && npm run dev   # website on http://localhost:3000
```
For production run `npm run build` in `frontend/` and serve the `dist/` folder (`npm run preview` to try it).

## Tests
```
cd backend && npm test
```
Tests need no database.

## HTTPS
Deploy on a platform that provides HTTPS (Render, Railway, etc.). With `NODE_ENV=production` the API trusts the proxy and sets `Secure` session cookies. Local development uses plain HTTP.
Note: the session cookie is `SameSite=Lax`, so the frontend and backend must be on the same site when deployed (e.g. `www.example.com` and `api.example.com`). On localhost, different ports count as the same site, so it works out of the box.

## Screenshots
_Add screenshots here (home, explore, post, create post)._

## GitHub
```
git add .
git commit -m "WanderLog project"
git push
```
