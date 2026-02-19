import StatCard from "@/components/primitives/card/stat-card";
import { Gamepad, Camera, Globe } from "lucide-react";
import { Badge, HobbyCard } from "@/components/primitives";
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/primitives/card/card";

const About = () => {
  const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "50+", label: "Projects Completed" },
    { value: "10+", label: "Technologies" },
    { value: "10+", label: "Certifications" },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 pt-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="col-span-1">
            <Card className="p-6">
              <CardContent className="flex flex-col items-center text-center">
                <img
                  src="/profile.jpg"
                  alt="Sushant Shelke"
                  className="w-40 h-40 rounded-full object-cover border-4 border-primary shadow-xl mb-4"
                />
                <h3 className="text-2xl font-bold">Sushant Shelke</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Fullstack developer building accessible, delightful web
                  applications.
                </p>

                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <Badge colorName="blue">React</Badge>
                  <Badge colorName="teal">TypeScript</Badge>
                  <Badge colorName="red">Tailwind</Badge>
                  <Badge colorName="lime">JavaScript</Badge>
                  <Badge colorName="pink">Next JS</Badge>
                  <Badge colorName="amber">Python</Badge>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 space-y-4">
              <Card>
                <CardContent>
                  <CardTitle className="text-center mt-4">Hobbies</CardTitle>
                  <div className="mt-2 grid grid-cols-1">
                    <HobbyCard
                      icon={<Gamepad className="h-5 w-5 text-primary" />}
                      title="Games"
                      description="Playing video games, badminton and volleyball with friends."
                    />
                    <HobbyCard
                      icon={<Camera className="h-5 w-5 text-primary" />}
                      title="Photography"
                      description="Capturing moments during travels and hikes."
                    />
                    <HobbyCard
                      icon={<Globe className="h-5 w-5 text-primary" />}
                      title="Travel"
                      description="Exploring new cultures and cities."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              About Me
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                Hello! I'm a web developer with a passion for creating
                beautiful, functional, and user-friendly websites. With
                expertise in modern web technologies, I bring ideas to life
                through clean code and thoughtful design.
              </p>
              <p>
                I specialize in building responsive web applications using
                React, TypeScript, and modern CSS frameworks. My goal is to
                create seamless digital experiences that make a difference.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies,
                contributing to open source, or enjoying good TV shows.
              </p>
              <p>
                I specialize in building responsive web applications using
                React, TypeScript, and modern CSS frameworks. My goal is to
                create seamless digital experiences that make a difference.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
