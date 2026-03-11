import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
};

const Modal = ({ open, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 max-w-3xl w-full max-h-[90vh] flex flex-col">
        <div className="bg-white dark:bg-card text-gray-900 dark:text-foreground border border-border rounded-lg shadow-xl flex flex-col overflow-hidden">
          {/* Sticky header */}
          <div className="flex items-start justify-between gap-4 p-6 pb-4 border-b border-border shrink-0">
            {title && <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground leading-snug">{title}</h3>}
            <button
              onClick={onClose}
              className="shrink-0 text-muted-foreground hover:text-foreground transition-colors mt-0.5"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {/* Scrollable body */}
          <div className="overflow-y-auto p-6 text-gray-700 dark:text-muted-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  const mount = (document.getElementById("modal-root") || document.body) as Element;
  return createPortal(modal, mount);
};

export default Modal;
