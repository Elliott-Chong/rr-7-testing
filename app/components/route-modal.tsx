import React from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
  abortController?: AbortController;
};

export default function RouteModal({ children, title, description, abortController }: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  abortController?.signal?.addEventListener("abort", () => {
    setOpen(false);
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onAnimationEnd={() => {
          if (!open) {
            navigate(-1);
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
