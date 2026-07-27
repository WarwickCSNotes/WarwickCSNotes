import { ExternalLink } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

interface DcsModuleLinkProps {
  code: string
  className?: string
}

export function DcsModuleLink({ code, className }: DcsModuleLinkProps) {
  const url = `https://warwick.ac.uk/fac/sci/dcs/teaching/modules/${code.toLowerCase()}/`
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      title="View on the DCS website"
      aria-label={`View ${code} on the DCS website`}
      className={cn(
        "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded border bg-background text-muted-foreground shadow-sm transition-colors hover:bg-muted hover:text-foreground",
        className
      )}
    >
      <ExternalLink className="h-3.5 w-3.5" />
    </a>
  )
}
