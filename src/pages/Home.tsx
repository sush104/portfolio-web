import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <img
            src="/profile.jpg"
            alt="Sushant Shelke"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary shadow-lg"
          />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Welcome to My Portfolio
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          I'm a passionate developer creating amazing web experiences
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/projects"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            View My Work
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
