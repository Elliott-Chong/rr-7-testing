import React, { useState } from "react";
import { useNavigate, useOutlet } from "react-router";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
  abortController?: AbortController;
};

const RouteSheet = ({ children, title, description, abortController }: Props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  abortController?.signal?.addEventListener("abort", () => {
    setOpen(false);
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        onAnimationEnd={() => {
          if (!open) {
            navigate(-1);
          }
        }}
      >
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="px-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
};

export default RouteSheet;
