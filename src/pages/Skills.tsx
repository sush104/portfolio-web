import SkillCategoryCard from "@/components/primitives/card/skill-category-card";
import { SkillProgress } from "@/components/primitives";
import { Code, ServerCog, Terminal, Users } from "lucide-react";

const skills = {
  "Frontend Development": [
    "React",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Next.js",
  ],
  "Backend Development": [
    "Node.js",
    "Express",
    "Python",
    "REST APIs",
    "GraphQL",
    "Authentication",
  ],
  "Tools & Technologies": [
    "Git",
    "Docker",
    "VS Code",
    "Webpack",
    "Vite",
    "Jest",
    "CI/CD",
  ],
  "Soft Skills": [
    "Problem Solving",
    "Team Collaboration",
    "Communication",
    "Mentoring",
  ],
};

const Skills = () => {
  return (
    <section className="min-h-screen px-6 py-20 pt-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Skills & Expertise
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A comprehensive overview of my technical skills and areas of expertise
          in modern web development.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {Object.entries(skills).map(([category, skillList]) => (
              <SkillCategoryCard
                key={category}
                category={category}
                skills={skillList}
              />
            ))}
          </div>

          <aside className="md:col-span-1">
            <div className="sticky top-28 space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-center">
                  Proficiency Overview
                </h4>
                <div className="space-y-4">
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
              </div>

              <div className="p-6 bg-card rounded-lg shadow">
                <h4 className="text-lg font-semibold mb-3">Tools & Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "TypeScript",
                    "Tailwind",
                    "Node.js",
                    "Docker",
                    "Git",
                    "Vite",
                    "Jest",
                  ].map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-muted/30 text-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Skills;
