import type { Meta, StoryObj } from "@storybook/react";
import DownloadCV from "./download-cv";

const meta = {
  title: "Primitives/DownloadCV",
  component: DownloadCV,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof DownloadCV>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filePath: "/cv.pdf",
    size: "lg",
  },
};

export const WithCustomFile: Story = {
  args: {
    filePath: "/samples/sample-cv.pdf",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    filePath: "/cv.pdf",
    size: "lg",
  },
  render: (args) => (
    <div className="p-8">
      <DownloadCV {...args} />
    </div>
  ),
};
