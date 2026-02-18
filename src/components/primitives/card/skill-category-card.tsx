import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/primitives/card/card";

interface SkillCategoryCardProps {
  category: string;
  skills: string[];
  className?: string;
}

const SkillCategoryCard = ({
  category,
  skills,
  className,
}: SkillCategoryCardProps) => {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <CardTitle className="mb-6 text-primary">{category}</CardTitle>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillCategoryCard;
