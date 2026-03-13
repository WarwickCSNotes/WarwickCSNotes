import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"

const DropdownContext = React.createContext({ isOpen: false, toggle: () => {}, close: () => {} })

export const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)
  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <div className="relative inline-block text-left">{children}</div>
    </DropdownContext.Provider>
  )
}

export const DropdownMenuTrigger = ({ children }: { children: React.ReactNode; asChild?: boolean }) => {
  const { toggle } = React.useContext(DropdownContext)
  return <div className="inline-block cursor-pointer" onClick={toggle}>{children}</div>
}

export const DropdownMenuContent = ({ children, align = "end" }: { children: React.ReactNode; align?: string }) => {
  const { isOpen } = React.useContext(DropdownContext)
  if (!isOpen) return null
  return (
    <div className={cn("absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", align === "end" ? "right-0" : "left-0")}>
      {children}
    </div>
  )
}

export const DropdownMenuItem = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => {
  const { close } = React.useContext(DropdownContext)
  return (
    <button
      className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
      onClick={() => {
        onClick()
        close()
      }}
    >
      {children}
    </button>
  )
}