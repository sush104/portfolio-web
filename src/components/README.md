# Component Structure

This directory contains all reusable UI components organized by their purpose and level of abstraction.

## Directory Organization

### `/primitives`

**Foundational building blocks** - Generic, reusable components that serve as the base for more complex components.

- `button.tsx` - Button component with multiple variants (default, outline, ghost, etc.)
- `card.tsx` - Composable card component (Card, CardHeader, CardTitle, CardContent, etc.)
- `sheet.tsx` - Slide-in panel component for mobile menus and modals

**When to use:** Use these when you need maximum flexibility and are building custom layouts.

**Example:**

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/primitives";

<Card>
  <CardHeader>
    <CardTitle>My Custom Card</CardTitle>
  </CardHeader>
  <CardContent>{/* Your content */}</CardContent>
</Card>;
```

---

### `/cards`

**Domain-specific card components** - Pre-built card layouts for common use cases in the portfolio.

- `stat-card.tsx` - Display statistics and metrics (e.g., "5+ Years Experience")
- `project-card.tsx` - Showcase projects with image, description, tech stack, and links
- `skill-category-card.tsx` - Group skills by category
- `contact-info-card.tsx` - Display contact information with icon

**When to use:** Use these when you need a standard card layout for a specific purpose.

**Example:**

```tsx
import { StatCard } from "@/components/cards";

<StatCard value="50+" label="Projects Completed" />;
```

---

### `/theme`

**Theme-related components** - Components for managing application theme and appearance.

- `theme-toggle.tsx` - Light/dark mode toggle button

**When to use:** For theme switching and theme-related UI.

---

### `/navigation`

**Navigation components** - Components for site navigation and routing.

- `Navbar.tsx` - Main navigation bar with responsive design, routing, and theme toggle

**When to use:** For top-level navigation and routing.

---

## Design Philosophy

### Composition over Configuration

We follow a **composition pattern** where:

1. **Primitives** are small, focused components with minimal opinions
2. **Domain components** (cards, etc.) compose primitives with specific layouts and logic
3. **Pages** compose domain components to build complete features

### Example Hierarchy

```
Primitives (Card, Button)
    ↓ composes into
Domain Components (ProjectCard)
    ↓ composes into
Pages (Projects page)
```

---

## Import Patterns

### Direct imports (recommended for primitives):

```tsx
import { Card, CardContent } from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";
```

### Index imports (convenient for multiple cards):

```tsx
import { StatCard, ProjectCard } from "@/components/cards";
```

---

## Adding New Components

### Adding a Primitive

1. Create in `/primitives` directory
2. Keep it generic and reusable
3. Export from `/primitives/index.ts`
4. Add Storybook stories

### Adding a Domain Card

1. Create in `/cards` directory
2. Compose from primitives (especially Card)
3. Export from `/cards/index.ts`
4. Add Storybook stories

---

## Storybook

All components have Storybook stories for documentation and testing:

- `*.stories.tsx` files demonstrate all component variants
- Run `npm run storybook` to view the component library
