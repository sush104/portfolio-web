## About This Portfolio Website

This project is a modern, responsive personal portfolio website built with **React**, **TypeScript**, and **Vite**. It is designed to showcase your professional profile, projects, skills, and contact information in a visually appealing and user-friendly manner.

### Tech Stack

| Layer              | Technology                                                            |
| ------------------ | --------------------------------------------------------------------- |
| Framework          | React 19 + TypeScript                                                 |
| Build tool         | Vite                                                                  |
| Styling            | Tailwind CSS + shadcn/ui                                              |
| Component explorer | Storybook                                                             |
| Deployment         | GitHub Pages via GitHub Actions                                       |
| Database           | AWS DynamoDB (Experience data)                                        |
| API                | AWS API Gateway (HTTP API) + AWS Lambda (Node.js 24)                  |
| CI/CD              | GitHub Actions — builds with `VITE_API_BASE` injected from secrets |

### AWS Architecture (Experience Page)

```
Browser → API Gateway (eu-west-2) → Lambda (Node.js 24) → DynamoDB
```

- **DynamoDB table:** `portfolio-experience` — stores experience items as JSON
- **Lambda function:** `portfolio-experience-fn` — scans the table and returns sorted items
- **API Gateway:** `portfolio-api` — HTTP API with `GET /experience` route and CORS configured
- **Environment variable:** `VITE_API_BASE` is set at build time via `API_BASE_URL` GitHub Actions secret

### Key Features

- ⚡️ **Fast and Modern Stack:** Built with React and Vite for lightning-fast performance and a smooth developer experience.
- 🛡️ **TypeScript Support:** Ensures type safety and maintainability.
- 🎨 **Tailwind CSS Styling:** Rapidly build custom designs with utility-first CSS.
- 🧩 **Component-Based Architecture:** Reusable and modular React components for easy customization and scalability.
- 📱 **Responsive Design:** Optimized for all devices—desktop, tablet, and mobile.
- 🌙 **Dark/Light Theme Toggle:** Users can switch between light and dark modes.
- 🛠️ **Easy Customization:** Update content, images, and styles with minimal effort.

### Main Sections

- **Home:** A brief introduction and welcome message.
- **About:** Information about background, experience, and interests.
- **Projects:** A showcase of best work, with descriptions and links.
- **Skills:** A categorized list of technical and soft skills.
- **Experience**: An Experience page to showcase roles and responsibility over period of time.
- **Contact:** Ways for visitors to get in touch with you (email, social links, etc.).

# Folder structure

portfolio-web/
├── public/ # Static files (favicon, robots.txt, etc.)
├── src/
│ ├── assets/ # Images, fonts, and other static assets
│ ├── components/ # Reusable React components (Navbar, Footer, etc.)
│ ├── pages/ # Main pages (Home, About, Projects, Contact)
│ ├── styles/ # Global and component-specific styles
│ ├── App.tsx # Main application component
│ └── main.tsx # Entry point for React
├── .gitignore # Git ignore rules
├── index.html # Main HTML file
├── package.json # Project metadata and dependencies
├── tsconfig.json # TypeScript configuration
├── vite.config.ts # Vite configuration
└── README.md # Project documentation
