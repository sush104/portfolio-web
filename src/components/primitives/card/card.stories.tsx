import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
} from "./card";
import { Button } from "../button/button";

const meta = {
  title: "Primitives/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content area.</p>
      </CardContent>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardImage src="https://via.placeholder.com/350x200" alt="Placeholder" />
      <CardHeader>
        <CardTitle>Image Card</CardTitle>
        <CardDescription>A card with an image</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card includes an image at the top.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Action Card</CardTitle>
        <CardDescription>Card with actions in footer</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card has action buttons in the footer.</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Confirm</Button>
      </CardFooter>
    </Card>
  ),
};

export const Clickable: Story = {
  render: () => (
    <Card className="w-[350px]" onClick={() => alert("Card clicked!")}>
      <CardHeader>
        <CardTitle>Clickable Card</CardTitle>
        <CardDescription>Click anywhere on this card</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This entire card is clickable.</p>
      </CardContent>
    </Card>
  ),
};

export const NoHover: Story = {
  render: () => (
    <Card className="w-[350px]" hover={false}>
      <CardHeader>
        <CardTitle>Static Card</CardTitle>
        <CardDescription>No hover effects</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card has no hover effects.</p>
      </CardContent>
    </Card>
  ),
};

export const CompleteExample: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardImage
        src="https://via.placeholder.com/350x200"
        alt="Project preview"
      />
      <CardHeader>
        <CardTitle>Project Name</CardTitle>
        <CardDescription>A brief project description</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
            React
          </span>
          <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
            TypeScript
          </span>
          <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
            Tailwind
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm">
          View Code
        </Button>
        <Button size="sm">Live Demo</Button>
      </CardFooter>
    </Card>
  ),
};
