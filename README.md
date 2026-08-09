# School Interaction System (React + Node/Express)

React (Vite) frontend and Express API for the Balmiki Education Foundation school management app.

## Stack

| Layer | Location | Tech |
|-------|----------|------|
| Frontend | `client/` | React, React Router, Vite |
| Backend | `server/` | Express, mysql2, JWT, multer |
| Database | `server/sql/` | MySQL / MariaDB |

## Setup

### 1. Database

1. Import `server/sql/school.sql`.
2. Run `server/sql/extra_tables.sql` for gallery and video tables.

### 2. API server

```bash
cd server
copy .env.example .env
npm install
npm run dev
```

API: `http://localhost:5000`

### 3. React app

```bash
cd client
npm install
npm run dev
```

App: `http://localhost:5173` (proxies `/api` and `/uploads` to the server)

From the repo root you can also run:

```bash
npm run install:all
npm run dev:server
npm run dev:client
```

## Features

- Teacher and student/parent login
- Student registration
- Principal-only teacher registration (teacher id `5`)
- Notices, picture gallery, MP4 video lectures
- Events and attendance placeholders

© 2026 Azene wube Acadamy — Developed by Birehanu Kassa
