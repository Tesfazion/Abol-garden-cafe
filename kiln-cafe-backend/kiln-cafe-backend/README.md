# Kiln Coffee House — API

Node.js/Express + TypeScript + MongoDB (via Mongoose) backend for menu,
orders, bookings, and role-based auth.

## Setup

```bash
npm install
cp .env.example .env       # then edit MONGO_URI, JWT_SECRET
npm run seed               # creates admin user + sample menu
npm run dev                # http://localhost:8869
```

Requires a running MongoDB instance. Locally, the quickest way:

```bash
docker run --name kiln-db -p 27017:27017 -d mongo:latest
```

Or install MongoDB locally: https://www.mongodb.com/docs/manual/installation/

## Auth model

- JWT bearer tokens, 7-day expiry (configurable).
- Roles: `CUSTOMER`, `STAFF`, `ADMIN`. Staff/Admin can manage menu, orders,
  and bookings; customers only see their own orders/bookings.
- Guests can place orders and bookings without an account (`guestEmail` /
  contact fields instead of a user relation) — no login wall on checkout.
- Passwords hashed with bcrypt (12 rounds). Auth endpoints are rate-limited
  separately and more tightly than general API traffic.

## API reference

All routes are prefixed `/api`. Protected routes require
`Authorization: Bearer <token>`.

### Auth
| Method | Route | Access |
|---|---|---|
| POST | `/auth/register` | Public |
| POST | `/auth/login` | Public |

### Menu
| Method | Route | Access |
|---|---|---|
| GET | `/menu` | Public — `?category=coffee` optional filter |
| GET | `/menu/:id` | Public |
| POST | `/menu` | Staff/Admin |
| PATCH | `/menu/:id` | Staff/Admin |
| DELETE | `/menu/:id` | Staff/Admin — soft delete (sets `available: false`) |

### Orders
| Method | Route | Access |
|---|---|---|
| POST | `/orders` | Public (guest) or authenticated |
| GET | `/orders/mine` | Authenticated |
| GET | `/orders/:id` | Authenticated |
| GET | `/orders` | Staff/Admin — `?status=` optional filter |
| PATCH | `/orders/:id/status` | Staff/Admin — enforces valid status transitions |

Pricing is always recalculated server-side from the current `MenuItem`
prices — the client only sends item IDs and quantities, never prices.

### Bookings
| Method | Route | Access |
|---|---|---|
| POST | `/bookings` | Public (guest) or authenticated |
| GET | `/bookings/mine` | Authenticated |
| GET | `/bookings/:id` | Authenticated |
| DELETE | `/bookings/:id` | Authenticated — cancel own booking |
| GET | `/bookings` | Staff/Admin — `?date=&status=` optional filters |
| PATCH | `/bookings/:id/status` | Staff/Admin |

**Double-booking prevention:** each date+time slot has a seat capacity
(default 24, overridable per-slot via `TableCapacity`). A new booking is
rejected with `409` if it would push the sum of party sizes for that slot
over capacity. This is a capacity model, not per-table assignment — simpler
for an MVP, and it directly prevents the overbooking failure mode.

### Admin
| Method | Route | Access |
|---|---|---|
| GET | `/admin/summary` | Staff/Admin — pending orders, today's bookings, today's revenue |

## Security measures in place

- `helmet` for standard security headers.
- CORS locked to `CORS_ORIGIN` (set to your deployed frontend URL).
- `express-rate-limit` on all routes, tighter limits on `/auth/*`.
- Input validation on every mutating route via `zod`.
- Centralized error handler — stack traces never leak in production.
- Passwords never returned in API responses.
- Server-side price calculation (client can't manipulate order totals).

## Connecting the frontend

In the Next.js app, set `API_BASE_URL=http://localhost:4000/api` and
replace the placeholder logic in `app/api/bookings/route.ts` and
`app/api/orders/route.ts` with real `fetch` calls to this API — or call
this API directly from client components and remove those Next.js routes
entirely.

## Deployment

**Backend → Heroku** (or Render/Railway/Fly — same idea):
1. Provision a MongoDB add-on (or use MongoDB Atlas), set `MONGO_URI`, `JWT_SECRET`,
   `CORS_ORIGIN` as config vars.
2. `npm run build && npm start` on release.
3. `.github/workflows/deploy.yml` runs tests on every push to
   `main`, then deploys — set `HEROKU_API_KEY`, `HEROKU_APP_NAME`,
   `HEROKU_EMAIL` as GitHub Actions secrets.

**Frontend → Netlify/Vercel:** set `API_BASE_URL` to the deployed backend
URL as an environment variable.

## Next steps

- Add integration tests for booking capacity edge cases (exact-fit,
  overflow-by-one, concurrent requests).
- Add refresh tokens / token revocation if longer sessions are needed.
- Add a payments integration (Stripe) ahead of the `CONFIRMED` order status.
- Add email/SMS notifications on booking confirmation and order status
  changes.
