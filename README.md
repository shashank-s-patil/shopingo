<div align="center">
  <br/>
  <h1 style="font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: 3.5rem; letter-spacing: 0.08em; color: #C9A96E;">
    S H O P I N G O
  </h1>
  <p style="font-family: 'Jost', sans-serif; font-weight: 300; font-size: 0.9rem; letter-spacing: 0.2em; color: #888880; text-transform: uppercase;">
    Full-Stack E-Commerce · MERN · Razorpay · Production-Grade
  </p>

  <br/>

  <p>
    <img src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB" alt="React"/>
    <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" alt="Vite"/>
    <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?logo=redux&logoColor=white" alt="Redux Toolkit"/>
    <img src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white" alt="Node.js"/>
    <img src="https://img.shields.io/badge/Express-000000?logo=express&logoColor=white" alt="Express"/>
    <img src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white" alt="MongoDB"/>
    <img src="https://img.shields.io/badge/Razorpay-0C2451?logo=razorpay&logoColor=white" alt="Razorpay"/>
    <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
    <img src="https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white" alt="Vercel"/>
  </p>

  <br/>
</div>

---

A fully functional e-commerce platform built from the ground up — **authentication**, **product management**, **cart & checkout**, **address handling**, and **live payment processing** — all wrapped in a meticulous luxury UI. Every component is hand-crafted, every flow production-tested.

---

## What It Demonstrates

**Full-Stack Ownership.** From database schema design to responsive pixel-perfect UI. Auth flows with JWT cookies. Admin panels with image uploads. Cart state synchronised via Redux Toolkit. A complete payment lifecycle — Razorpay order creation, modal checkout, and server-side HMAC signature verification.

**Production Architecture.** The client (Vite + React 18) compiles to static assets; the Express API runs as a Vercel serverless function — all behind a single domain. Zero CORS issues in production. Environment-driven configuration throughout.

**Luxury Design System.** Dark obsidian palette, gold accents, typographic hierarchy (Cormorant Garamond + Jost). Custom CSS variables, Tailwind utility classes, and Radix UI primitives working in concert. Every transition, hover state, and animation is deliberate.

---

## Features

| Area | Highlights |
|---|---|
| **Auth** | Register / Login / Logout · JWT stored in HTTP‑only cookies · Protected routes with `CheckAuth` guard |
| **Admin** | Dashboard · Product CRUD with Cloudinary image uploads · Order management · Feature flag toggles |
| **Shopping** | Product listing with filters & sorting · Search · Detailed product view with reviews |
| **Cart** | Add / remove / update quantities · Persisted to DB per user · Side sheet cart UI |
| **Address** | Add / edit / delete / select delivery address · Managed per user |
| **Payment** | Razorpay test mode (₹ INR) · Order creation → modal checkout → HMAC signature verification · Stock decremented & cart cleared on confirmation |
| **Orders** | Order history in account page · Order detail view · Admin order status updates |
| **UI** | Tailwind CSS · Radix UI primitives · Lucide icons · Luxury dark theme · Responsive · Animated confetti on successful payment |

---

## Tech Stack

```
Frontend        React 18 · Vite · Redux Toolkit · React Router 6
                Tailwind CSS · Radix UI · Lucide React · Axios
                canvas-confetti · class-variance-authority

Backend         Node.js · Express · Mongoose · JWT · bcryptjs
                Razorpay SDK · Cloudinary SDK · Multer · dotenv

Infrastructure  Vercel (serverless functions + static hosting)
                MongoDB Atlas · Razorpay Test Mode · Cloudinary
```

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Vercel                            │
│                                                      │
│  ┌──────────────────┐        ┌─────────────────────┐ │
│  │  Static Assets    │        │  Serverless API      │ │
│  │  (client/dist)    │        │  (api/index.js)      │ │
│  │                   │        │                      │ │
│  │  React SPA        │  ──►   │  Express Routes      │ │
│  │  Vite Build       │  /api/* │  /api/auth/*         │ │
│  │                   │        │  /api/shop/*          │ │
│  └──────────────────┘        │  /api/admin/*         │ │
│                               │  /api/common/*        │ │
│                               └────────┬──────────────┘ │
│                                        │                 │
└────────────────────────────────────────┼─────────────────┘
                                         │
                      ┌──────────────────┼──────────────────┐
                      ▼                  ▼                  ▼
               ┌────────────┐    ┌──────────────┐    ┌──────────┐
               │  MongoDB   │    │   Razorpay   │    │ Cloudinary│
               │   Atlas    │    │  (Test Mode) │    │           │
               └────────────┘    └──────────────┘    └──────────┘
```

---

## Payment Flow

```
User clicks "Pay with Razorpay"
  → POST /api/shop/order/create
    → Server creates Razorpay order → saves Order (pending)
    → Returns { razorpayOrderId, amount, keyId }
  → Razorpay checkout modal opens
  → User completes payment
  → onSuccess: POST /api/shop/order/capture
    → Server verifies HMAC-SHA256 signature
    → Updates order (confirmed) → decrements stock → clears cart
  → Redirect to /shop/payment-success
  → 🎉 Multicolor confetti animation
```

---

## What This Proves to Interviewers

- **End-to-end e-commerce architecture** — auth, state, payments, deployment
- **Production-grade security** — JWT cookies, HMAC payment verification, environment isolation
- **Modern React patterns** — Redux Toolkit slices & async thunks, protected routing, composable components
- **Full deployment lifecycle** — built and live on Vercel with zero-downtime serverless architecture

---

<div align="center">
  <br/>
  <p style="font-family: 'Jost', sans-serif; font-weight: 300; font-size: 0.75rem; letter-spacing: 0.15em; color: #888880;">
    Built by <strong>Shashank Patil</strong>
  </p>
  <br/>
</div>
