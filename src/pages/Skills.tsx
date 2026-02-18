import SkillCategoryCard from "@/components/cards/skill-category-card";

const skills = {
  "Frontend Development": [
    "React",
    "TypeScript",
    "JavaScript",
    "HTML/CSS",
    "Tailwind CSS",
    "Next.js",
    "Vue.js",
    "Responsive Design",
  ],
  "Backend Development": [
    "Node.js",
    "Express",
    "Python",
    "REST APIs",
    "GraphQL",
    "Database Design",
    "Authentication",
  ],
  "Tools & Technologies": [
    "Git",
    "Docker",
    "VS Code",
    "Figma",
    "Webpack",
    "Vite",
    "Jest",
    "CI/CD",
  ],
  "Soft Skills": [
    "Problem Solving",
    "Team Collaboration",
    "Communication",
    "Agile/Scrum",
    "Code Review",
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

        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, skillList]) => (
            <SkillCategoryCard
              key={category}
              category={category}
              skills={skillList}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6">Proficiency Levels</h3>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { name: "React & TypeScript", level: 95 },
              { name: "Frontend Development", level: 90 },
              { name: "Backend Development", level: 80 },
              { name: "UI/UX Design", level: 75 },
              { name: "DevOps & Deployment", level: 70 },
            ].map((item) => (
              <div key={item.name}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-muted-foreground">{item.level}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
