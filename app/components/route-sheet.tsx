import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import React from 'react'
import { useNavigate, useOutlet } from "react-router";

type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
}
const RouteSheet = ({ children, title, description }: Props) => {
  const open = !!useOutlet()
  const navigate = useNavigate()
  return (
    <Sheet open={open} onOpenChange={open => {
      if (!open) {
        navigate(-1);
      }
    }}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {title}
          </SheetTitle>
          <SheetDescription>
            {description}
          </SheetDescription>
        </SheetHeader>
        <div className="px-4">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default RouteSheet 