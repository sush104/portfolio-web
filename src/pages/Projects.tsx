import ProjectCard from "@/components/cards/project-card";

const projects = [
  {
    id: 1,
    title: "World Clock",
    description:
      "A beautiful world clock application showing multiple time zones with real-time updates and timezone conversion.",
    technologies: ["React", "JavaScript", "CSS", "React-Icons", "Date-fns"],
    image:
      "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=600&h=400&fit=crop",
    github: "https://github.com/sush104/Clocks",
    demo: "https://sush104.github.io/Clocks/",
  },
  {
    id: 2,
    title: "React Calculator",
    description:
      "A fully functional calculator app built with React, featuring basic arithmetic operations and a clean, intuitive interface.",
    technologies: ["React", "JavaScript", "CSS", "HTML", "Actions"],
    image:
      "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=600&h=400&fit=crop",
    github: "https://github.com/sush104/React-Calculator",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "Beautiful weather application with detailed forecasts and interactive maps.",
    technologies: ["React", "Weather API", "Chart.js", "CSS"],
    image:
      "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?w=600&h=400&fit=crop",
    github: "#",
    demo: "#",
  },
];

const Projects = () => {
  return (
    <section className="min-h-screen px-6 py-20 pt-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          My Projects
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects that showcase my skills and
          experience in web development.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              image={project.image}
              github={project.github}
              demo={project.demo}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
