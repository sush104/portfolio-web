import type { Meta, StoryObj } from "@storybook/react";
import { Coffee, Music } from "lucide-react";
import HobbyCard from "./hobby-card";

const meta = {
  title: "Primitives/HobbyCard",
  component: HobbyCard,
  parameters: { layout: "centered" },
} satisfies Meta<typeof HobbyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <Coffee className="h-5 w-5 text-primary" />,
    title: "Coffee & Coding",
    description: "Pairing ideas with a fresh brew.",
  },
};

export const MusicExample: Story = {
  args: {
    icon: <Music className="h-5 w-5 text-primary" />,
    title: "Music",
    description: "Exploring playlists and attending live shows.",
  },
};
