import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const Card = ({ children, className, hover = true, onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "border border-border rounded-lg",
        hover && "hover:shadow-lg transition-shadow",
        onClick && "cursor-pointer",
        className,
      )}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

const CardHeader = ({ children, className }: CardHeaderProps) => {
  return <div className={cn("p-6 pb-4", className)}>{children}</div>;
};

interface CardTitleProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const CardTitle = ({
  children,
  className,
  as: Component = "h3",
}: CardTitleProps) => {
  return (
    <Component className={cn("text-2xl font-bold", className)}>
      {children}
    </Component>
  );
};

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

const CardDescription = ({ children, className }: CardDescriptionProps) => {
  return <p className={cn("text-muted-foreground", className)}>{children}</p>;
};

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

const CardContent = ({ children, className }: CardContentProps) => {
  return <div className={cn("p-6 pt-0", className)}>{children}</div>;
};

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

const CardFooter = ({ children, className }: CardFooterProps) => {
  return <div className={cn("p-6 pt-0", className)}>{children}</div>;
};

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

const CardImage = ({ src, alt, className }: CardImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("w-full h-48 object-cover rounded-t-lg", className)}
    />
  );
};

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
};
