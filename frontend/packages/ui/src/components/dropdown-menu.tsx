import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"

const DropdownContext = React.createContext({
  isOpen: false,
  toggle: () => {},
  close: () => {},
})

export const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggle = () => setIsOpen((prev) => !prev)
  const close = () => setIsOpen(false)
  const ref = React.useRef<HTMLDivElement>(null)

  // Close when the user clicks (or taps) anywhere outside the dropdown.
  React.useEffect(() => {
    if (!isOpen) return
    const handlePointerDown = (event: PointerEvent) => {
      if (!ref.current) return
      if (ref.current.contains(event.target as Node)) return
      setIsOpen(false)
    }
    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [isOpen])

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <div ref={ref} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

export const DropdownMenuTrigger = ({
  children,
}: {
  children: React.ReactNode
  asChild?: boolean
}) => {
  const { toggle } = React.useContext(DropdownContext)
  return (
    <div className="inline-block cursor-pointer" onClick={toggle}>
      {children}
    </div>
  )
}

export const DropdownMenuContent = ({
  children,
  align = "end",
}: {
  children: React.ReactNode
  align?: string
}) => {
  const { isOpen } = React.useContext(DropdownContext)
  if (!isOpen) return null
  return (
    <div
      className={cn(
        "absolute z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        align === "end" ? "right-0" : "left-0"
      )}
    >
      {children}
    </div>
  )
}

export const DropdownMenuItem = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: () => void
}) => {
  const { close } = React.useContext(DropdownContext)
  return (
    <button
      className="relative flex w-full cursor-default items-center rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none hover:bg-accent hover:text-accent-foreground"
      onClick={() => {
        onClick()
        close()
      }}
    >
      {children}
    </button>
  )
}
