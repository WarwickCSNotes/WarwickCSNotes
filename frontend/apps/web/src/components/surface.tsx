import type { ElementType } from "react"
import { Link, type LinkProps } from "react-router-dom"
import { cn } from "@workspace/ui/lib/utils"

const surfaceCard = "bg-surface text-surface-foreground border rounded-lg"
const interactiveSurface = "hover:bg-surface-hover transition-colors"

type SurfaceCardProps = React.HTMLAttributes<HTMLElement> & {
  as?: ElementType
  interactive?: boolean
}

export function SurfaceCard({
  as: Component = "div",
  interactive = false,
  className,
  ...props
}: SurfaceCardProps) {
  return (
    <Component
      className={cn(surfaceCard, interactive && interactiveSurface, className)}
      {...props}
    />
  )
}

export function SurfaceLink({ className, ...props }: LinkProps) {
  return (
    <Link
      className={cn("block", surfaceCard, interactiveSurface, className)}
      {...props}
    />
  )
}

export function SurfaceAnchor({
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn("block", surfaceCard, interactiveSurface, className)}
      {...props}
    />
  )
}

export function Panel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded border p-4", className)} {...props} />
}

export function Pill({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "rounded border bg-surface px-2 py-1 text-xs text-surface-foreground",
        className
      )}
      {...props}
    />
  )
}

export function TextButton({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}
