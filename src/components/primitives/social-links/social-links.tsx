import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface SocialLinksProps {
  links?: SocialLink[];
  className?: string;
}

const defaultSocialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/sush104",
    icon: <Github className="h-5 w-5" />,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/sushant-shelke/",
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/sush104/",
    icon: <Instagram className="h-5 w-5" />,
  },
];

const SocialLinks = ({
  links = defaultSocialLinks,
  className,
}: SocialLinksProps) => {
  return (
    <div className={className}>
      <h3 className="text-xl font-bold mb-4">Follow Me</h3>
      <div className="flex gap-4">
        {links.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:bg-accent transition-colors"
            aria-label={social.name}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
