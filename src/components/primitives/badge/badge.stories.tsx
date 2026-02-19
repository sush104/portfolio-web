import type { Meta, StoryObj } from "@storybook/react";
import Badge from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Primitives/Badge",
  component: Badge,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge>React</Badge>
      <Badge>TypeScript</Badge>
      <Badge>Tailwind</Badge>
      <Badge>AWS</Badge>
    </div>
  ),
};

export const WithColorName: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge colorName="blue">React</Badge>
      <Badge colorName="indigo">TypeScript</Badge>
      <Badge colorName="cyan">Tailwind</Badge>
    </div>
  ),
};
