import { Calendar, Tag } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardImage, CardTitle } from "./card";
import { Button } from "@/components/primitives/button/button";
import Badge from "@/components/primitives/badge/badge";

export type BlogPost = {
  id: string;
  type: "travel" | "tech";
  title: string;
  summary?: string;
  content?: string;
  coverImage?: string;
  date?: string;
  tags?: string[];
};

const BADGE_COLORS: Record<string, string> = {
  travel: "sky",
  tech: "indigo",
};

const TAG_COLORS = ["blue", "teal", "violet", "emerald", "amber", "pink", "cyan"];

interface BlogCardProps {
  post: BlogPost;
  onRead: (post: BlogPost) => void;
}

const BlogCard = ({ post, onRead }: BlogCardProps) => {
  return (
    <Card className="h-full flex flex-col">
      {post.coverImage && (
        <CardImage
          src={post.coverImage}
          alt={post.title}
          onClick={() => onRead(post)}
        />
      )}
      <CardContent className="flex-1 flex flex-col pt-4" onClick={() => onRead(post)}>
        <div className="flex items-center gap-2 mb-2">
          <Badge colorName={BADGE_COLORS[post.type]}>
            {post.type === "travel" ? "✈️ Travel" : "💻 Tech"}
          </Badge>
          {post.date && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {post.date}
            </span>
          )}
        </div>
        <CardTitle className="text-lg mb-2 leading-snug">{post.title}</CardTitle>
        {post.summary && (
          <CardDescription className="line-clamp-3 text-sm">{post.summary}</CardDescription>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {post.tags.map((tag, i) => (
              <Badge key={tag} colorName={TAG_COLORS[i % TAG_COLORS.length]}>
                <Tag className="w-2.5 h-2.5 inline mr-1" />{tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" onClick={() => onRead(post)} className="w-full">
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
