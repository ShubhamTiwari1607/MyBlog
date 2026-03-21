# MyBlog - Next.js + Better Auth + Drizzle + MySQL

A modern blog application built with **Next.js App Router**, **Better Auth**, **Drizzle ORM**, and **MySQL**.

It includes:

- Email/password authentication (sign up, sign in, sign out)
- Real-time navbar auth state
- User-specific dashboard
- Blog read-history tracking per signed-in user
- Styled, production-style navigation and auth pages

---

## Tech Stack

- **Frontend / App Framework:** Next.js 16 (App Router), React 19
- **Auth:** Better Auth (`better-auth`, `@better-auth/drizzle-adapter`)
- **Database:** MySQL
- **ORM / Migrations:** Drizzle ORM + Drizzle Kit
- **Styling:** Tailwind CSS v4

---

## Features and Implementation

## 1) Authentication System

### What users see

- `/signup` page for registration
- `/signin` and `/login` pages for sign in
- Signed-in state in navbar (`Hi, <user>`, Dashboard, Sign out)
- Signed-out state in navbar (Sign In, Login, Sign Up)

### How it is implemented

- Better Auth server config in `lib/auth.js`:
  - `secret` and `baseURL` from env
  - Drizzle adapter with MySQL provider
  - `nextCookies()` plugin for App Router cookie handling
- API route in `app/api/auth/[...all]/route.js` using:
  - `toNextJsHandler(auth)`
- Client auth form component:
  - `app/auth/_components/EmailPasswordAuthForm.jsx`
  - Calls `/api/auth/sign-up/email` and `/api/auth/sign-in/email`
  - Uses `credentials: "include"` to persist session cookies

---

## 2) Better Auth + Drizzle + MySQL Integration

### What matters

- Drizzle schema exports required Better Auth model keys:
  - `user`, `session`, `account`, `verification`

### How it is implemented

- Schema file: `lib/schema.js`
- Drizzle config: `drizzle.config.js`
- Migration runner script: `scripts/run-migrations.mjs`
- NPM scripts:
  - `npm run db:generate`
  - `npm run db:migrate`

Detailed guide: `docs/BETTER_AUTH_NEXTJS_DRIZZLE_MYSQL.md`

---

## 3) Production-style Navbar

### What users see

- Sticky, clean top header
- Left side: brand + primary navigation
- Right side: auth-aware controls

### How it is implemented

- Root layout: `app/layout.js`
- Auth state widget:
  - `app/auth/_components/AuthStatus.jsx`
  - Fetches `/api/auth/get-session`
  - Updates instantly after auth actions via custom `auth:changed` event
  - Uses `cache: "no-store"` to prevent stale session UI

---

## 4) User-specific Dashboard

### What users see

- `/dashboard` page
- If signed in: sees own account info + read blogs
- If signed out: sees sign-in prompt

### How it is implemented

- Dashboard page: `app/dashboard/page.jsx`
- Session fetched from Better Auth endpoint (`/api/auth/get-session`)
- Read history loaded per current user email

---

## 5) Blog Read-Tracking (Per User)

### What users see

- Opening a blog marks it as read
- Dashboard shows only blogs read by the current signed-in user

### How it is implemented

- Shared blog source:
  - `lib/blog-data.js`
- Read-history helpers:
  - `lib/read-history.js`
- Blog detail tracking:
  - `app/blog/[id]/page.js`
  - On open:
    1. fetch session
    2. if signed in, save blog read record for that user
- Storage key strategy:
  - `myapp:readBlogs:<user-email-lowercase>`

This isolates read history by user identity.

Detailed design notes: `docs/DASHBOARD_READ_HISTORY_IMPLEMENTATION.md`

---

## Project Structure

```text
app/
  api/auth/[...all]/route.js      # Better Auth route handler
  auth/_components/
    AuthStatus.jsx                # Navbar auth state + sign out
    EmailPasswordAuthForm.jsx     # Shared sign in / sign up form
  blog/
    page.js                       # Blog list
    [id]/page.js                  # Blog detail + read tracking
  dashboard/page.jsx              # User-specific dashboard
  signin/page.jsx                 # Sign in page
  signup/page.jsx                 # Sign up page
  login/page.jsx                  # Alternate sign in page
  layout.js                       # Global layout + navbar

lib/
  auth.js                         # Better Auth server setup
  schema.js                       # Drizzle schema for Better Auth models
  blog-data.js                    # Shared blog content source
  read-history.js                 # User-scoped read-history storage logic

drizzle.config.js                 # Drizzle Kit config
scripts/run-migrations.mjs        # Non-interactive migration runner
docs/
  BETTER_AUTH_NEXTJS_DRIZZLE_MYSQL.md
  DASHBOARD_READ_HISTORY_IMPLEMENTATION.md
```

---

## Environment Variables

Use `.env.local` (recommended in dev):

```env
BETTER_AUTH_SECRET=your-long-random-secret
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_TRUSTED_ORIGINS=http://localhost:3000,http://localhost:3001

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your-db-password
DB_NAME=blog
```

Also see `.env.example`.

---

## Setup and Run

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `.env.local`.

3. Generate and apply database migrations:

```bash
npm run db:generate
npm run db:migrate
```

4. Start development server:

```bash
npm run dev
```

5. Open app:

- [http://localhost:3000](http://localhost:3000)

---

## Docker (App + MySQL with one command)

This project includes:

- `Dockerfile` (Next.js standalone runtime image)
- `docker-compose.yml` (app + mysql services)
- `.env.docker.example` (compose env template)

### Quick start

1. Create docker env file:

```bash
cp .env.docker.example .env.docker
```

2. Start both services:

```bash
docker compose --env-file .env.docker up -d --build
```

3. Open app:

- [http://localhost:3000](http://localhost:3000)

4. (First run) apply migrations from host:

```bash
npm run db:generate
npm run db:migrate
```

Use your `.env.local` DB settings to target `localhost:3306`, or run migrations inside a disposable node container if preferred.

### Stop services

```bash
docker compose --env-file .env.docker down
```

### Remove DB volume too

```bash
docker compose --env-file .env.docker down -v
```

---

## Available Scripts

- `npm run dev` - Run Next.js dev server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run db:generate` - Generate Drizzle migration SQL
- `npm run db:migrate` - Apply Drizzle migrations

---

## Important Notes

- Current read-history persistence uses browser localStorage, scoped by user email.
  - Good for fast prototyping and user-specific behavior.
  - Not shared across devices/browsers.
- For production cross-device history, move read-tracking to MySQL with a dedicated table (user_id, blog_id, read_at) and API-backed reads/writes.

---

## Verification Checklist

- Sign up works and user gets session cookie.
- Sign in works and navbar switches to signed-in state instantly.
- Sign out works and signed-in UI disappears immediately.
- Opening `/blog/[id]` while signed in adds that blog to `/dashboard`.
- Dashboard shows only the signed-in user’s read history.

---

## Authoring Notes

This repository includes feature docs for maintainers and future contributors:

- `docs/BETTER_AUTH_NEXTJS_DRIZZLE_MYSQL.md`
- `docs/DASHBOARD_READ_HISTORY_IMPLEMENTATION.md`
