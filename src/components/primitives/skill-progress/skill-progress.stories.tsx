import type { Meta, StoryObj } from "@storybook/react";
import SkillProgress from "./skill-progress";
import { Code, Terminal, ServerCog, Users } from "lucide-react";

const meta: Meta<typeof SkillProgress> = {
  title: "Primitives/SkillProgress",
  component: SkillProgress,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="space-y-3 max-w-lg">
      <SkillProgress
        name="React & TypeScript"
        level={95}
        icon={<Code className="h-4 w-4" />}
        color="from-pink-500 to-indigo-500"
      />
      <SkillProgress
        name="Frontend Development"
        level={90}
        icon={<Terminal className="h-4 w-4" />}
        color="from-violet-500 to-pink-500"
      />
      <SkillProgress
        name="Backend Development"
        level={80}
        icon={<ServerCog className="h-4 w-4" />}
        color="from-emerald-400 to-teal-500"
      />
      <SkillProgress
        name="Collaboration"
        level={85}
        icon={<Users className="h-4 w-4" />}
        color="from-yellow-400 to-amber-500"
      />
    </div>
  ),
};
