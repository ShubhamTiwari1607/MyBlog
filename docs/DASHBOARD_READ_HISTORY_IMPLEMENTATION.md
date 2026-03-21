# Dashboard Read-History Feature (Implementation Notes)

This document explains how the **user-specific dashboard** and **blog read tracking** were implemented in this project.

---

## Goal

Build a dashboard where:

1. A signed-in user can see blogs they have read.
2. Users can only see **their own** read history.
3. Navbar reflects this by linking signed-in users to `Dashboard`.

---

## High-level approach

The feature is implemented in three layers:

1. **Shared blog data source**  
   Centralized blog metadata so list/detail/dashboard all read from one source.
2. **Per-user read-history store**  
   Stores read history in browser `localStorage`, namespaced by user email.
3. **UI integration**  
   Blog detail marks reads; Dashboard shows only current user’s reads; navbar points to Dashboard.

---

## Files added and updated

### Added

- `lib/blog-data.js`  
  Shared blog list and helper `getBlogById(id)`.

- `lib/read-history.js`  
  Read-history helpers:
  - `getReadBlogsForUser(email)`
  - `markBlogAsRead(email, blog)`

- `app/dashboard/page.jsx`  
  Dashboard UI that:
  - fetches current session via `/api/auth/get-session`
  - resolves current user email
  - loads only that user’s read history

### Updated

- `app/blog/page.js`  
  Replaced inline blog array with import from `lib/blog-data.js`.

- `app/blog/[id]/page.js`  
  Converted to client page that:
  - loads selected blog by id
  - checks session
  - marks blog as read for that signed-in user

- `app/auth/_components/AuthStatus.jsx`  
  Changed signed-in navigation from `Profile` to `Dashboard`.

---

## Data model used for read tracking

Read history items are stored as:

```json
{
  "id": 1,
  "title": "Next.js Guide",
  "body": "short summary...",
  "readAt": "2026-03-21T12:34:56.000Z"
}
```

Storage key format:

```text
myapp:readBlogs:<lowercased-user-email>
```

This guarantees each user has an isolated history bucket.

---

## Read tracking flow

1. User opens a blog detail route (`/blog/[id]`).
2. Page fetches session from `/api/auth/get-session` (`credentials: include`, `cache: no-store`).
3. If session has `user.email`, call:
   - `markBlogAsRead(email, blog)`
4. `markBlogAsRead`:
   - loads existing items for that user
   - removes older duplicate for same blog id
   - prepends latest read item with new `readAt`
   - saves back to user-specific key

Result: dashboard shows newest reads first and each blog appears once.

---

## Dashboard filtering flow

1. Dashboard loads current session.
2. If user is signed in:
   - reads localStorage key for **that user email**
   - renders list
3. If no user:
   - shows signed-out state and sign-in CTA

No cross-user leakage occurs because user A and user B have different storage keys.

---

## Why localStorage was chosen

For this stage, localStorage gives:

- fast implementation
- no backend migration required
- clear user-specific behavior for one browser/device

### Limitation

History is device/browser specific.  
If you need cross-device sync, move read history to MySQL with a table like:

- `user_id` (fk)
- `blog_id`
- `read_at`

Then fetch from API instead of localStorage.

---

## Event and reactivity behavior

Auth UI and dashboard use session checks with `cache: "no-store"` to avoid stale data.

Additionally, auth flows dispatch/listen to `auth:changed` so navbar/dashboard can refresh state quickly after sign-in/sign-out.

---

## User-visible result

- Signed-in user sees **Dashboard** in navbar.
- Opening any blog detail marks it as read for that user.
- Dashboard shows “Read blogs” list for current user only.
- Signed-out users cannot see personal history and are prompted to sign in.

