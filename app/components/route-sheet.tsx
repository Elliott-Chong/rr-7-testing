import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import React, { useState } from 'react'
import { useNavigate, useOutlet } from "react-router";

type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
}
const RouteSheet = ({ children, title, description }: Props) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent onAnimationEnd={() => {
        if (!open) {
          navigate(-1)
        }
      }}>
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