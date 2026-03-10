import type { Meta, StoryObj } from "@storybook/react";
import BlogCard, { type BlogPost } from "./blog-card";

const meta = {
  title: "Primitives/BlogCard",
  component: BlogCard,
  parameters: {
    layout: "centered",
  },
  args: {
    onRead: (post) => console.log("onRead", post),
  },
} satisfies Meta<typeof BlogCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const techPost: BlogPost = {
  id: "react-server-components",
  type: "tech",
  title: "Understanding React Server Components",
  summary:
    "A deep dive into how React Server Components work, when to use them, and how they change the way we think about data fetching in modern React apps.",
  coverImage: "https://picsum.photos/seed/tech/600/340",
  date: "2026-03-10",
  tags: ["react", "next.js", "performance"],
};

const travelPost: BlogPost = {
  id: "japan-trip",
  type: "travel",
  title: "Two Weeks in Japan: Tokyo to Kyoto",
  summary:
    "Street food, bullet trains, cherry blossoms, and more — a photo-heavy recap of my two-week adventure through Japan's most iconic cities.",
  coverImage: "https://picsum.photos/seed/japan/600/340",
  date: "2026-02-14",
  tags: ["japan", "travel", "food", "culture"],
};

const noImagePost: BlogPost = {
  id: "no-image",
  type: "travel",
  title: "Weekend in Edinburgh",
  summary: "A short escape to the Scottish capital — castles, cobblestones, and too much haggis.",
  date: "2025-12-20",
  tags: ["scotland", "weekend"],
};

export const TechPost: Story = {
  args: { post: techPost },
  decorators: [(Story) => <div className="w-[340px]"><Story /></div>],
};

export const TravelPost: Story = {
  args: { post: travelPost },
  decorators: [(Story) => <div className="w-[340px]"><Story /></div>],
};

export const NoImageBlog: Story = {
  name: "No Cover Image",
  args: { post: noImagePost },
  decorators: [(Story) => <div className="w-[340px]"><Story /></div>],
};

