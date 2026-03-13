import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"

export const DropdownMenu = ({ children }: { children: React.ReactNode }) => (
  <div className="relative inline-block text-left">{children}</div>
)

export const DropdownMenuTrigger = ({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) => (
  <div className="inline-block">{children}</div>
)

export const DropdownMenuContent = ({ children, align = "end" }: { children: React.ReactNode; align?: string }) => (
  <div className={cn("absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", align === "end" ? "right-0" : "left-0")}>
    {children}
  </div>
)

export const DropdownMenuItem = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
  <button
    className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
    onClick={onClick}
  >
    {children}
  </button>
)