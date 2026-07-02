# Kiln Coffee House — Frontend

Next.js 14 (App Router) + Tailwind CSS frontend scaffold for the café web app.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Brand guide

**Concept:** Kiln Coffee House — a neighborhood roastery and wood-fired bakery.

**Color**
| Token | Hex | Use |
|---|---|---|
| Ink | `#1E2A22` | Dark surfaces, hero, footer |
| Wheat | `#ECE3C6` | Primary light background |
| Wheat Dim | `#DCD0A8` | Secondary light section background |
| Brass | `#C89B3C` | Primary accent — CTAs, tasting tags, eyebrows |
| Ember | `#A63D2F` | Sparing use only — "hot now" flags, checkout CTA |
| Charcoal | `#2B2420` | Body text |

**Type**
- Display: Fraunces (headlines — has real character, use restraint)
- Body: Inter
- Mono: JetBrains Mono (prices, labels, order numbers — ticket/receipt feel)

**Signature element:** menu items are presented as roaster tasting cards
(origin, altitude, tasting notes) rather than generic descriptions — this
mirrors how a real specialty roastery communicates a coffee, and gives the
menu a distinct identity instead of a generic list.

## Structure

```
app/
  page.tsx            → homepage
  menu/page.tsx        → filterable menu + "add to order"
  booking/page.tsx      → table booking form
  order/page.tsx        → cart checkout
  api/bookings/route.ts → placeholder booking endpoint
  api/orders/route.ts   → placeholder order endpoint
components/            → Navbar, Footer, Hero, MenuCard, CartDrawer, BookingForm
lib/
  cart-context.tsx     → client-side cart state (React context)
  types.ts             → shared types (MenuItem, BookingRequest, CartLine)
data/menu.ts           → sample menu content
```

## Backend wiring

This frontend now talks to the real `kiln-cafe-backend` API:

- `app/api/bookings/route.ts` and `app/api/orders/route.ts` proxy to the
  Express backend (`POST /api/bookings`, `POST /api/orders`), forwarding the
  real success/error responses — including things like the "slot fully
  booked" capacity error, which surfaces directly in the booking form.
- `lib/menu.ts` fetches the live menu from the backend's `GET /api/menu` on
  every request (homepage and menu page are Server Components). If the
  backend is unreachable, it falls back to the bundled sample data in
  `data/menu.ts` so the site stays usable rather than showing an empty page.
- Set `API_BASE_URL` in `.env.local` (copy from `.env.local.example`) to
  point at your running backend — defaults to `http://localhost:4000/api`.
- Checkout collects guest name/email since the backend requires either an
  authenticated user or guest contact details on an order.

Menu images are still placeholder Unsplash URLs — swap for real photography
before launch, either in the backend seed data or via the admin menu API.

## Next steps

1. Add a login/register flow (currently guest-checkout only; the backend
   already supports authenticated users).
2. Build the staff admin dashboard UI against `/api/admin/summary` and the
   orders/bookings list endpoints.
3. Add order status tracking UI (poll or fetch `/api/orders/:id`).
4. Swap placeholder menu photography for real images.
