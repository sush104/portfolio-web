import { SocialLinks } from "@/components/primitives";
import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";

// Resolve public asset URLs relative to Vite base (works for repo or user sites)
const profileUrl = new URL("/profile.jpg", import.meta.env.BASE_URL).href;
const cvUrl = new URL("/cv.pdf", import.meta.env.BASE_URL).href;

const Home = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-16 bg-gradient-to-b from-transparent via-muted/5 to-transparent">
      <div className="max-w-5xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary to-pink-500 blur opacity-40" />
            <img
              src={profileUrl}
              alt="Sushant Shelke"
              className="relative w-48 h-48 md:w-74 md:h-74 rounded-full object-cover border-4 border-card shadow-2xl"
            />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          Hi, I'm Sushant — a Full-Stack Developer
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
          I build modern, accessible web applications using React, TypeScript,
          and cloud-native tools. I love turning ideas into products.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow hover:scale-[1.02] transition-transform"
          >
            View My Work
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
          >
            Get In Touch
          </Link>

          <a
            href={cvUrl}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-muted/10 transition-colors"
            download
          >
            <Download className="w-4 h-4" />
            Download CV
          </a>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="space-x-4">
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
