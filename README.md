## About This Portfolio Website

This project is a modern, responsive personal portfolio website built with **React**, **TypeScript**, and **Vite**. It showcases professional experience, blog posts, projects, skills, and contact information — backed by a **fully serverless AWS backend with a password-protected admin panel.**

---

### Tech Stack

| Layer              | Technology                                                            |
| ------------------ | --------------------------------------------------------------------- |
| Framework          | React 19 + TypeScript                                                 |
| Build tool         | Vite                                                                  |
| Styling            | Tailwind CSS                                                          |
| Component explorer | Storybook                                                             |
| Deployment         | GitHub Pages via GitHub Actions                                       |
| Database           | AWS DynamoDB (`portfolio-experience`, `portfolio-blogs`)          |
| File storage       | AWS S3 (`portfolio-images-sush104`) — blog cover images            |
| API                | AWS API Gateway (HTTP API) + AWS Lambda (Node.js 24,`app.mjs`)      |
| CI/CD              | GitHub Actions — builds with `VITE_API_BASE` injected from secrets |

---

### AWS Architecture

```
Browser
  │
  ├── GET  /experience          → Lambda → DynamoDB (portfolio-experience)
  ├── GET  /blogs               → Lambda → DynamoDB (portfolio-blogs)
  │
  │  [Admin only — requires x-admin-key header]
  ├── POST   /experience        → Lambda → DynamoDB PutItem
  ├── DELETE /experience?id=    → Lambda → DynamoDB DeleteItem
  ├── POST   /blogs             → Lambda → DynamoDB PutItem
  ├── DELETE /blogs?id=         → Lambda → DynamoDB DeleteItem
  └── GET    /upload-url        → Lambda → S3 presigned PUT URL
                                           ↓
                                  Browser PUT image directly to S3
```

#### AWS Resources

| Resource        | Name                                                                |
| --------------- | ------------------------------------------------------------------- |
| Lambda function | `portfolio-fn`                                                    |
| DynamoDB table  | `portfolio-experience`                                            |
| DynamoDB table  | `portfolio-blogs`                                                 |
| S3 bucket       | `portfolio-images-sush104` (public read, `blog-images/` prefix) |
| API Gateway     | `portfolio-api` (HTTP API, eu-west-2)                             |

#### Lambda Environment Variables

| Variable                  | Description                                        |
| ------------------------- | -------------------------------------------------- |
| `EXPERIENCE_TABLE_NAME` | DynamoDB table for experience items                |
| `BLOGS_TABLE_NAME`      | DynamoDB table for blog posts                      |
| `IMAGES_BUCKET_NAME`    | S3 bucket for blog cover images                    |
| `ALLOWED_ORIGIN`        | Production origin for CORS                         |
| `ADMIN_KEY`             | Secret key required for write/delete/upload routes |

### Admin Panel (`/admin`)

A password-protected admin page for managing content without touching the database directly.

- **Login** — client-side password check via `VITE_ADMIN_PASSWORD`
- **Experience tab** — add, edit, delete experience items; supports multi-bullet descriptions
- **Blogs tab** — add, edit, delete blog posts; supports cover image upload to S3 or direct URL, tags (comma-separated), date, summary, and full content
- **Image upload** — picks a file → calls `GET /upload-url` → gets a presigned S3 URL → PUTs the image directly to S3 from the browser → saves the public URL in DynamoDB

#### Frontend Environment Variables (`.env.local`)

```
VITE_API_BASE=https://<api-id>.execute-api.eu-west-2.amazonaws.com
VITE_ADMIN_KEY=<your-admin-key>
VITE_ADMIN_PASSWORD=<your-admin-password>
```

---

### Key Features

- ⚡️ **Fast and Modern Stack:** React + Vite for lightning-fast performance
- 🛡️ **TypeScript:** Full type safety across frontend and shared types
- 🎨 **Tailwind CSS:** Utility-first styling with dark/light theme toggle
- 🧩 **Component Architecture:** Primitives in `src/components/primitives/`, pages in `src/pages/`
- 📱 **Responsive Design:** Optimised for desktop, tablet, and mobile
- 🌙 **Dark/Light Theme Toggle**
- ✍️ **Blog System:** Travel and tech posts with cover images, tags, and full content stored in DynamoDB
- 🔐 **Serverless Admin:** Password-protected admin panel backed by API Gateway + Lambda + DynamoDB + S3

---

### Main Sections

- **Home** — Introduction and welcome
- **About** — Background and interests
- **Projects** — Showcase of work with descriptions and links
- **Skills** — Categorised technical skills with progress indicators
- **Experience** — Timeline of roles and responsibilities (data from DynamoDB)
- **Blogs** — Travel and tech blog posts with cover images (data from DynamoDB, images from S3)
- **Contact** — Email and social links

---

### Folder Structure

```
portfolio-web/
├── aws/
│   └── lambda/
│       └── app.js              # Reference copy of Lambda (deployed as app.mjs)
├── public/                     # Static files (404.html, assets)
├── src/
│   ├── assets/                 # Images and static assets
│   ├── components/
│   │   └── primitives/         # Badge, Button, Card, Modal, Navbar, Sheet,
│   │                           #   SkillProgress, SocialLinks, ThemeToggle, Timeline
│   ├── lib/
│   │   └── utils.ts            # Shared utilities (cn, etc.)
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── types.ts        # Shared types, env vars, helpers
│   │   │   ├── ExperienceTab.tsx
│   │   │   └── BlogsTab.tsx
│   │   ├── Admin.tsx           # Login shell + tab switcher
│   │   ├── Blogs.tsx
│   │   ├── Contact.tsx
│   │   ├── Experience.tsx
│   │   ├── Home.tsx
│   │   ├── NotFound.tsx
│   │   ├── Projects.tsx
│   │   └── Skills.tsx
│   ├── App.tsx
│   └── main.tsx
├── .env.local                  # Local env vars (not committed)
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```
