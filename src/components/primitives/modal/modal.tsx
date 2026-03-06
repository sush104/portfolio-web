import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

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
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 max-w-3xl w-full mx-4">
        <div className="bg-white dark:bg-card text-gray-900 dark:text-foreground border border-border rounded-lg shadow-xl transform transition-all duration-200 scale-100">
          <div className="p-6">
            {title && <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-foreground">{title}</h3>}
            <div className="text-gray-700 dark:text-muted-foreground">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const mount = (document.getElementById("modal-root") ||
    document.body) as Element;
  return createPortal(modal, mount);
};

export default Modal;
