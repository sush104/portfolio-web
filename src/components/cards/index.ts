/**
 * Card Components
 *
 * These are specialized, domain-specific card components that compose
 * the primitive Card component with specific layouts and props for
 * common use cases in the portfolio application.
 *
 * Each card is purpose-built for its domain:
 * - StatCard: Display metrics and statistics
 * - ProjectCard: Showcase projects with images, tech stack, and links
 * - SkillCategoryCard: Group and display skills by category
 * - ContactInfoCard: Display contact information with icons
 */

export { default as StatCard } from "./stat-card";
export { default as ProjectCard } from "./project-card";
export { default as SkillCategoryCard } from "./skill-category-card";
export { default as ContactInfoCard } from "./contact-info-card";
