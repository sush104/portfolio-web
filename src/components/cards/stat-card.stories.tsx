import type { Meta, StoryObj } from "@storybook/react";
import StatCard from "./stat-card";

const meta = {
  title: "UI/StatCard",
  component: StatCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "The numeric or statistical value to display",
    },
    label: {
      control: "text",
      description: "The label describing the statistic",
    },
  },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "5+",
    label: "Years Experience",
  },
};

export const ProjectsCompleted: Story = {
  args: {
    value: "50+",
    label: "Projects Completed",
  },
};

export const HappyClients: Story = {
  args: {
    value: "30+",
    label: "Happy Clients",
  },
};

export const LargeNumber: Story = {
  args: {
    value: "1000+",
    label: "Lines of Code",
  },
};

export const Percentage: Story = {
  args: {
    value: "99%",
    label: "Client Satisfaction",
  },
};

export const GridExample: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
      <StatCard value="5+" label="Years Experience" />
      <StatCard value="50+" label="Projects Completed" />
      <StatCard value="30+" label="Happy Clients" />
      <StatCard value="10+" label="Technologies" />
    </div>
  ),
};
