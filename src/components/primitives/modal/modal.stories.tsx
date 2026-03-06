import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/components/primitives/button/button";
import Modal from "./modal";

const meta = {
  title: "Primitives/Modal",
  component: Modal,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const Wrapper = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open Modal</Button>
          <Modal {...args} open={open} onClose={() => setOpen(false)}>
            <p className="text-muted-foreground">
              This is an example modal. Put any content here — text, images, or
              interactive elements.
            </p>
          </Modal>
        </>
      );
    };

    return <Wrapper />;
  },
  args: {
    title: "Example Modal",
  },
};

export const Open: Story = {
  render: (args) => (
    <Modal {...args} open={true} onClose={() => {}}>
      <p className="text-muted-foreground">
        Open modal shown directly in story.
      </p>
    </Modal>
  ),
  args: {
    title: "Open Modal",
  },
};
