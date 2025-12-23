# AIFriend – AI-Powered AI News Platform

![Project Status: Archived](https://img.shields.io/badge/Status-Archived_(PoC)-lightgrey)

**🔗 Live Demo:** https://aifriend-dusky.vercel.app

---

## 📖 About the Project

**AIFriend** is a small full-stack web application that generates AI-related news articles in a friendly, readable tone using Generative AI.

I built this project during my working holiday to practise:

- integrating the **OpenAI API** into a real product-style app  
- using the **Next.js App Router** for a modern full-stack architecture  
- working with a **hosted PostgreSQL database (Supabase) + Prisma**  
- deploying and operating the app on **Vercel**

The goal is not to become a real product, but to demonstrate how I design, implement, and ship a complete AI-powered web application on my own.

---

## 🛠 Tech Stack

**Frontend**

- React  
- Next.js (App Router)  
- TypeScript  
- Tailwind CSS
- DaisyUI

**Backend / Data**

- Next.js route handlers (API endpoints)  
- Prisma ORM  
- PostgreSQL (managed via Supabase)  

**AI & Media**

- OpenAI API for article generation  
- Image generation + external image hosting (e.g. Cloudinary)  

**Deployment**

- Vercel

---

## ✨ Key Features

- **AI-driven article generation**  
  - Takes recent AI / tech news topics as input.  
  - Sends a structured prompt to OpenAI and receives back a title, description, and markdown article body.  
  - Focuses on a friendly, approachable writing style rather than formal news tone.

- **Citation-aware content**  
  - The prompt encourages the model to include references to original sources.  
  - The app appends a simple “Sources / Citations” section to the article body so readers can trace where the information came from.

- **Database-backed articles**  
  - Generated articles are stored in PostgreSQL via Prisma.  
  - Each article record keeps title, description, markdown content, timestamps, and publish status.  
  - The public site renders only published articles.

- **Simple admin flow**  
  - A minimal admin-only interface allows me to trigger article generation and manage existing articles.  
  - This is intentionally kept simple (single admin, no public sign-up) because the project is a personal PoC, not a multi-tenant product.

- **Public-facing news site**  
  - The home page lists the latest AI articles pulled from the database.  
  - Each article has its own detail page rendered from markdown.  
  - Built on the Next.js App Router so the app can mix server components and API logic cleanly.

---

## 💡 Technical Highlights

- **Next.js App Router**  
  - Uses the App Router to structure public pages, admin pages, and API endpoints in a single codebase.  
  - Separates server-side concerns (data fetching, AI calls, DB writes) from client-side UI components.

- **Supabase as managed PostgreSQL**  
  - Supabase is used primarily as a managed PostgreSQL host.  
  - Prisma handles the schema and queries, so the code stays independent of any specific cloud provider.

- **OpenAI integration in a real flow**  
  - The model is not just called from a playground – it is wired into a full flow:
    1. Collect topic →  
    2. Build prompt →  
    3. Call OpenAI →  
    4. store in DB →  
    5. Render on the public site.  

---

## 📌 Project Status

This project is **archived as a Proof of Concept**.

I’m not actively developing new features, but I keep the code and demo public as a portfolio piece to show:

- how I approach full-stack architecture with Next.js  
- how I integrate external services like OpenAI and Supabase  
- how I build, deploy, and operate a small AI-powered web application end-to-end
