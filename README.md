# WeRent — Fashion Rental Platform

> A full-stack fashion rental web app built by **Tim Elang**

🌐 **Live Demo**: [we-rent-frontend-dusky.vercel.app](https://we-rent-frontend-dusky.vercel.app/)
📦 **Backend Repo**: [github.com/ElangRevoU/WeRentBackend](https://github.com/ElangRevoU/WeRentBackend)

---

## Overview

WeRent is a fashion rental platform that allows users to browse, rent, and review clothing items. Built with a modern tech stack and focused on a seamless rental experience — from browsing to checkout to post-rental review.

---

## Screenshots

1. Review Page with Fit Scale & Filters
![Fit Scale Chart](<Screenshot 2026-04-24 184333.png>)

2. Product Detail & Availability Check
![Availability Check](<Screenshot 2026-04-24 184015.png>)

3. Order Detail & Inline Review Form
![Product Review Form](<Screenshot 2026-04-24 183455.png>)

---

## Features

- 🔐 **Authentication** — Register, login, JWT-based auth with refresh token rotation
- 👗 **Product Browsing** — Search, filter by category, image carousel banner
- 🛒 **Cart & Checkout** — Add to cart, select rental dates, courier selection
- 📦 **Order Management** — Track orders, view order detail per item
- ⭐ **Review System** — Rate and review per product, fit scale chart, helpful votes, media support
- ❤️ **Wishlist** — Save favorite items
- 👤 **Profile** — View profile, update avatar

---

## Tech Stack

### Frontend
| Tech | Usage |
|---|---|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS + shadcn/ui | Styling |
| TanStack Query v5 | Server state & caching |
| Axios | HTTP client |
| Zustand | Client state management |

### Backend
| Tech | Usage |
|---|---|
| NestJS | Framework |
| Prisma | ORM |
| PostgreSQL (Supabase) | Database |
| Supabase Storage | File/media storage |
| JWT | Authentication |

---

## Getting Started

1. Clone the repo:

```bash
git clone https://github.com/ElangRevoU/WeRentFrontend.git
cd WeRentFrontend
```

2. Install dependencies:

```bash
npm install
```

3. Setup environment:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_API_ORIGIN=https://werentbackend.onrender.com
NEXT_PUBLIC_API_BASE_URL=https://werentbackend.onrender.com/api
NEXT_PUBLIC_API_URL=https://werentbackend.onrender.com/api
NEXT_PUBLIC_APP_NAME=WeRent
```

4. Run development server:

```bash
npm run dev
```

---

## Project Structure

```text
src/
├── app/                         # Next.js App Router pages
│   ├── (auth)/                  # Login & Register
│   ├── (main)/                  # Main app pages
│   │   ├── products/[id]/       # Product detail + reviews
│   │   ├── cart/
│   │   ├── orders/[id]/         # Order detail + review form
│   │   └── wishlist/
│   └── providers.tsx
│
├── lib/
│   ├── api/                     # Axios API functions
│   ├── hooks/                   # TanStack Query hooks
│   ├── stores/                  # Zustand stores
│   └── types/                   # TypeScript interfaces
│
└── components/
    ├── product/
    ├── review/
    ├── cart/
    └── shared/
```

---

## Team

**Tim Elang** — [github.com/ElangRevoU](https://github.com/ElangRevoU)