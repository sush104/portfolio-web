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
                  src={"./profile.jpg"}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 ">About Me</h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                Hello — I'm Sushant Shelke, a Manager at Deloitte with 5+ years'
                experience as a full-stack developer, based in Glasgow, UK. I
                design and deliver responsive, performance-focused web
                applications that balance clean, maintainable code with
                thoughtful user experience and strong accessibility practices.
                My core technical toolkit includes React, TypeScript, JavaScript
                Next.JS and Python, and I work extensively with GraphQL, AWS and
                Docker to build scalable, resilient solutions for enterprise
                clients.
              </p>
              <p>
                In my current role I lead cross-functional teams through the
                full delivery lifecycle — from shaping technical roadmaps and
                defining architecture to implementing CI/CD pipelines and
                operationalising services in production. I prioritise testing,
                observability and performance optimisation to reduce risk and
                improve developer velocity, while ensuring solutions meet
                security and compliance expectations in regulated environments.
                I also mentor engineers, run design and code reviews, and
                promote best practices that improve code quality and team
                effectiveness.
              </p>
              <p>
                I have experience translating complex business requirements into
                pragmatic technical solutions, collaborating closely with
                product managers, designers and stakeholders to deliver
                customer-centric outcomes.
              </p>
              <p>
                Outside work I enjoy playing video games and keeping active
                through sports — particularly badminton and volleyball — as well
                as regular gym sessions.
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
