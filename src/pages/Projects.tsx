import ProjectCard from "@/components/primitives/card/project-card";

const projects = [
  {
    id: 1,
    title: "Crisis Event Ranking and Summarization",
    description:
      "A Python jupyter notebook that ranks and summarizes crisis events using natural language processing techniques, providing concise insights for emergency response teams.",
    technologies: ["Python", "NLP", "Jupyter Notebook", "Data Analysis"],
    image:
      "https://images.unsplash.com/photo-1585829364536-ce348dd72ebc?q=80&w=1740&auto=format&fit=crop",
    github:
      "https://github.com/sush104/Crisis_Event_Ranking_and_Summarization.git",
  },
  {
    id: 2,
    title: "Online Bike Rental System (Manager Dashboard)",
    description:
      "A react application that serves as a manager dashboard for an online bike rental system, allowing managers to oversee bike inventory, rental transactions, and customer data efficiently. Find it in 'feature/sushant' repo",
    technologies: [
      "React",
      "JavaScript",
      "CSS",
      "Material UI",
      "Authentication",
    ],
    image:
      "https://images.unsplash.com/photo-1639638794534-c964bf817a0f?q=80&w=1740&auto=format&fit=crop",
    github:
      "https://github.com/sush104/Web_Development_ReactJS_Android_Python.git",
  },
  {
    id: 3,
    title: "World Clock",
    description:
      "A beautiful world clock application showing multiple time zones with real-time updates and timezone conversion.",
    technologies: ["React", "JavaScript", "CSS", "React-Icons", "Date-fns"],
    image:
      "https://images.unsplash.com/photo-1525562929550-63ef340cfe1d?q=80&w=1548&auto=format&fit=crop",
    github: "https://github.com/sush104/Clocks",
    demo: "https://sush104.github.io/Clocks/",
  },
  {
    id: 4,
    title: "React Calculator",
    description:
      "A fully functional calculator app built with React, featuring basic arithmetic operations and a clean, intuitive interface.",
    technologies: ["React", "JavaScript", "CSS", "HTML", "Actions"],
    image:
      "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=600&h=400&fit=crop",
    github: "https://github.com/sush104/React-Calculator",
  },
  {
    id: 5,
    title: "React ToDo App",
    description:
      "Simple and elegant ToDo application built with React, featuring task management.",
    technologies: ["React", "Rechart", "Material UI", "Authentication"],
    image:
      "https://images.unsplash.com/photo-1641261689141-ee46b8a0470c?q=80&w=1740&auto=format&fit=crop",
    github: "https://github.com/sush104/ToDoAPP-withReactFlip",
  },
  {
    id: 6,
    title: "Twitter Data Analysis",
    description:
      "A Python project that analyzes Twitter data to calculate the newsworthiness of tweets, providing insights into trending topics and user engagement.",
    technologies: ["Python", "Data Analysis", "Twitter API", "NLP"],
    image:
      "https://images.unsplash.com/photo-1684610529682-553625a1ffed?q=80&w=1160&auto=format&fit=crop",
    github:
      "https://github.com/sush104/Twitter_Data_Analysis_and_Newsworthiness-_Calculation.git",
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
