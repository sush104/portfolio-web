import { ExternalLink, Github, X } from "lucide-react";
import Modal from "@/components/primitives/modal/modal";
import { useState } from "react";
import { Button } from "@/components/primitives/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardImage,
  CardTitle,
} from "@/components/primitives/card/card";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  demo?: string;
  className?: string;
}

const ProjectCard = ({
  title,
  description,
  technologies,
  image,
  github,
  demo,
  className,
}: ProjectCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className={`h-full flex flex-col ${className ?? ""}`}>
        <CardImage src={image} alt={title} onClick={() => setOpen(true)} />
        <CardContent
          className="flex-1 flex flex-col"
          onClick={() => setOpen(true)}
        >
          <CardTitle className="mb-2">{title}</CardTitle>
          <CardDescription className="mb-4 max-h-[4.5rem] overflow-hidden line-clamp-3">
            {description}
          </CardDescription>
          <div className="flex flex-wrap gap-2 mt-auto">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 items-center mt-4">
          {github && (
            <Button variant="outline" size="sm" asChild>
              <a href={github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                Code
              </a>
            </Button>
          )}
          {demo && (
            <Button size="sm" asChild>
              <a href={demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Demo
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title={title}>
        <div className="space-y-4">
          <img
            src={image}
            alt={title}
            className="w-full h-64 object-cover rounded-md"
          />
          <p className="text-muted-foreground">{description}</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            {github && (
              <Button variant="outline" size="sm" asChild>
                <a href={github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  Code
                </a>
              </Button>
            )}
            {demo && (
              <Button size="sm" asChild>
                <a href={demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Demo
                </a>
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProjectCard;
