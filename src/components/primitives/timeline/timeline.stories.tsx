import type { Meta, StoryObj } from "@storybook/react";
import Timeline from "./timeline";

const meta = {
  title: "Primitives/Timeline",
  component: Timeline,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

const sample = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "Acme Co",
    start: "Jan 2023",
    end: "Present",
    location: "Remote",
    description: (
      <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
        <li>
          Managed full-stack development teams utilising JavaScript, Python,
          TypeScript, and R to deliver robust web applications.
        </li>
        <li>
          Designed and implemented frontend components for live AWS hosted
          product using React.js.
        </li>
        <li>
          Oversaw front-end development using React, Next, TypeScript, Tailwind
          CSS, and shadcn design principles.
        </li>
        <li>
          Led teams in implementing CI/CD pipelines and cloud-based solutions on
          AWS, leveraging Docker and microservices architecture.
        </li>
      </ul>
    ),
  },
  {
    id: 2,
    title: "Frontend Engineer",
    company: "Tech Solutions",
    start: "May 2020",
    end: "Dec 2022",
    location: "London, UK",
    description:
      "Built performant, accessible UI and worked on component library.",
  },
  {
    id: 3,
    title: "Software Engineer Intern",
    company: "Startup X",
    start: "Jun 2019",
    end: "Aug 2019",
    location: "Glasgow, UK",
    description: "Worked on internal tools and automation.",
  },
];

export const Default: Story = {
  args: {
    items: sample,
  },
};
