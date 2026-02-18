import StatCard from "@/components/cards/stat-card";

const About = () => {
  const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "50+", label: "Projects Completed" },
    { value: "10+", label: "Technologies" },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <img
            src="/profile.jpg"
            alt="Sushant Shelke"
            className="w-48 h-48 rounded-full object-cover border-4 border-primary shadow-xl"
          />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          About Me
        </h2>
        <div className="space-y-6 text-lg text-muted-foreground">
          <p>
            Hello! I'm a web developer with a passion for creating beautiful,
            functional, and user-friendly websites. With expertise in modern web
            technologies, I bring ideas to life through clean code and
            thoughtful design.
          </p>
          <p>
            I specialize in building responsive web applications using React,
            TypeScript, and modern CSS frameworks. My goal is to create seamless
            digital experiences that make a difference.
          </p>
          <p>
            When I'm not coding, you can find me exploring new technologies,
            contributing to open-source projects, or sharing knowledge with the
            developer community.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
