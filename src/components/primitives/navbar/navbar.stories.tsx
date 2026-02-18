import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { Home, User, Briefcase, Code, Mail } from "lucide-react";
import Navbar from "./navbar";
import { Button } from "@/components/primitives/button/button";

const meta = {
  title: "Primitives/Navbar",
  component: Navbar,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    brand: {
      control: "text",
      description: "Brand name or logo",
    },
    showThemeToggle: {
      control: "boolean",
      description: "Show theme toggle button",
    },
    sticky: {
      control: "boolean",
      description: "Make navbar sticky instead of fixed",
    },
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomBrand: Story = {
  args: {
    brand: "MyPortfolio",
    brandHref: "/",
  },
};

export const WithIcons: Story = {
  args: {
    navItems: [
      { name: "Home", href: "#home", icon: <Home className="h-4 w-4" /> },
      { name: "About", href: "#about", icon: <User className="h-4 w-4" /> },
      {
        name: "Projects",
        href: "#projects",
        icon: <Briefcase className="h-4 w-4" />,
      },
      { name: "Skills", href: "#skills", icon: <Code className="h-4 w-4" /> },
      { name: "Contact", href: "#contact", icon: <Mail className="h-4 w-4" /> },
    ],
  },
};

export const WithCustomActions: Story = {
  args: {
    actions: (
      <Button variant="default" size="sm">
        Get Started
      </Button>
    ),
  },
};

export const MinimalNav: Story = {
  args: {
    navItems: [
      { name: "Home", href: "#home" },
      { name: "Work", href: "#work" },
      { name: "Contact", href: "#contact" },
    ],
  },
};

export const NoThemeToggle: Story = {
  args: {
    showThemeToggle: false,
  },
};

export const StickyNavbar: Story = {
  args: {
    sticky: true,
  },
};

export const WithCallbacks: Story = {
  args: {
    onNavItemClick: (item) => {
      console.log("Clicked:", item.name);
    },
  },
};

export const CustomLogo: Story = {
  args: {
    brand: (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-full" />
        <span>MyBrand</span>
      </div>
    ),
  },
};
