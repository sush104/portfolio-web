export type ExperienceItem = {
  id: string;
  title: string;
  company?: string;
  start: string;
  end?: string;
  location?: string;
  description?: string[];
};

export type BlogPost = {
  id: string;
  type: "travel" | "tech";
  title: string;
  summary?: string;
  content?: string;
  coverImage?: string;
  date?: string;
  tags?: string[];
};

export type AdminTab = "experience" | "blogs";

export const API_BASE = (import.meta.env.VITE_API_BASE as string | undefined)?.replace(/\/$/, "");
export const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY as string | undefined;
export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined;

export const apiHeaders = (key: string) => ({
  "Content-Type": "application/json",
  "x-admin-key": key,
});

export const emptyExperience = (): ExperienceItem => ({
  id: "", title: "", company: "", start: "", end: "", location: "", description: [""],
});

export const emptyBlog = (): BlogPost => ({
  id: "", type: "tech", title: "", summary: "", content: "", coverImage: "", date: "", tags: [],
});

/** Shared input/textarea class */
export const inputCls =
  "w-full border border-border rounded-md px-3 py-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary";
