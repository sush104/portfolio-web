import type { Meta, StoryObj } from "@storybook/react";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import SocialLinks from "./social-links";

const meta = {
  title: "Primitives/SocialLinks",
  component: SocialLinks,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    links: {
      description: "Array of social media links with name, url, and icon",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof SocialLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomLinks: Story = {
  args: {
    links: [
      {
        name: "GitHub",
        url: "https://github.com/username",
        icon: <Github className="h-5 w-5" />,
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/username",
        icon: <Linkedin className="h-5 w-5" />,
      },
    ],
  },
};

export const WithAllPlatforms: Story = {
  args: {
    links: [
      {
        name: "GitHub",
        url: "https://github.com",
        icon: <Github className="h-5 w-5" />,
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com",
        icon: <Linkedin className="h-5 w-5" />,
      },
      {
        name: "Twitter",
        url: "https://twitter.com",
        icon: <Twitter className="h-5 w-5" />,
      },
      {
        name: "Instagram",
        url: "https://instagram.com",
        icon: <Instagram className="h-5 w-5" />,
      },
      {
        name: "Facebook",
        url: "https://facebook.com",
        icon: <Facebook className="h-5 w-5" />,
      },
      {
        name: "YouTube",
        url: "https://youtube.com",
        icon: <Youtube className="h-5 w-5" />,
      },
    ],
  },
};

export const MinimalSet: Story = {
  args: {
    links: [
      {
        name: "GitHub",
        url: "https://github.com",
        icon: <Github className="h-5 w-5" />,
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com",
        icon: <Linkedin className="h-5 w-5" />,
      },
    ],
  },
};

export const DeveloperFocused: Story = {
  args: {
    links: [
      {
        name: "GitHub",
        url: "https://github.com",
        icon: <Github className="h-5 w-5" />,
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com",
        icon: <Linkedin className="h-5 w-5" />,
      },
      {
        name: "Twitter",
        url: "https://twitter.com",
        icon: <Twitter className="h-5 w-5" />,
      },
    ],
  },
};

export const WithCustomStyling: Story = {
  args: {
    className: "mt-8",
  },
};

export const InDarkMode: Story = {
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};
