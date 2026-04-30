## Goal

Publish the site live on Lovable hosting and add a password-protected admin panel where you can edit hotels (name, description, image, Booking link, tag, category, rank) without touching code — backed by Lovable Cloud.

No external Supabase account, no Vercel, no GitHub setup.

---

## Part 1 — Publish the site (you do this, takes 30 seconds)

1. Click **Publish** (top-right in Lovable).
2. You instantly get a free URL: `your-project.lovable.app`.
3. Optional: connect a custom domain in **Project Settings → Domains** (after you've published once).

Frontend updates go live when you click "Update" in the publish dialog. Backend (admin panel data) deploys automatically.

---

## Part 2 — Admin panel (I build this)

### What you'll get

A new page at `/admin` where you can:
- See all hotels grouped by area (Ayia Napa, Limassol, Paphos) and category (Luxury, Family, Budget)
- **Edit** any hotel: name, description, tag, location, note, stars, highlight, Booking.com URL, image
- **Add** a new hotel to any area/category
- **Delete** a hotel
- **Reorder** hotels (so you control which 3 show in "Top 3 Best Picks")
- **Upload images** directly (no more code-side imports)
- Sign in / out securely

The public site (homepage, area pages, category pages, Top 3) reads from the database so your edits go live immediately — no redeploy needed.

### How it works (technical section)

**Backend (Lovable Cloud — auto-enabled, no signup):**

1. **Database tables**
   - `hotels` — id, area (`ayia-napa`/`limassol`/`paphos`), category (`luxury`/`family`/`budget`), name, description, tag, image_url, booking_url, best_for, location, note, stars, highlight, sort_order, created_at, updated_at
   - `user_roles` — id, user_id, role (`admin`/`user`) — separate table per security best practice
   - `has_role(user_id, role)` security-definer function for RLS checks

2. **Row-Level Security (RLS)**
   - `hotels`: public SELECT (anyone can read), INSERT/UPDATE/DELETE only if `has_role(auth.uid(), 'admin')`
   - `user_roles`: only admins can manage; users can read their own roles

3. **Storage bucket** `hotel-images` (public read, admin-only write) for uploaded hotel photos.

4. **One-time seed migration** — copies all hotels currently in `src/data/hotels.ts` into the `hotels` table so nothing is lost. Existing imported images (e.g. `nissibluImg`) get re-uploaded to the bucket and the URLs stored in DB.

**Frontend:**

1. **New auth page** `/admin/login` — email + password sign-in (Lovable Cloud default). I'll create your first admin account during setup; you give me the email you want to use.
2. **New admin page** `/admin` (protected route — redirects to login if not signed in or not admin):
   - Tabs: Ayia Napa / Limassol / Paphos
   - Sub-tabs: Luxury / Family / Budget
   - Sortable list of hotels with edit/delete buttons
   - "Add hotel" button → form modal
   - Image upload (drag & drop) → uploads to storage, saves URL
3. **Public pages updated** — `AreaPage`, `HotelTypePage`, `Index` (Top 3) read hotels from Supabase via React Query instead of the static `hotels.ts` file. Static file is kept as fallback during initial load to avoid blank flash.
4. **No layout/design changes** — existing `HotelCard`, `SimpleHotelCard`, `TopPickHotelCard` components are reused; only the data source changes.

**What stays the same:**
- All existing pages, design, translations, scroll behaviour, Top 3 styling, Booking.com link behaviour
- Affiliate ID `2311236` is preserved
- All current hotels are migrated 1:1

---

## What I need from you before I start

1. **Email address** for your admin account (so I can create your login).
2. Confirmation that I should **migrate all current hotels into the database** (recommended — otherwise admin panel starts empty).

---

## Order of work once approved

1. Enable Lovable Cloud
2. Create database schema + RLS + storage bucket
3. Seed all current hotels into the database
4. Build `/admin/login` page
5. Build `/admin` dashboard (list, edit, add, delete, reorder, image upload)
6. Wire public pages to read from database
7. Create your admin user and confirm login works
8. You click "Publish" → site is live with admin panel

Estimated: one build cycle. After that, you manage hotels yourself from `/admin` — no more code changes needed for content updates.