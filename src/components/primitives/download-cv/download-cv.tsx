import { Download } from "lucide-react";
import { Button } from "@/components/primitives/button/button";

interface DownloadCVProps {
  filePath: string;
  size?: "default" | "sm" | "lg" | "icon";
  ariaLabel?: string;
}

const DownloadCV = ({
  filePath = "#",
  ariaLabel = "Download resume",
  size = "sm",
}: DownloadCVProps) => {
  return (
    <Button size={size} asChild>
      <a
        href={filePath}
        download
        aria-label={ariaLabel}
        className="px-8 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
      >
        <Download className="h-8 w-8 mr-2" />
        Download CV
      </a>
    </Button>
  );
};

export default DownloadCV;
