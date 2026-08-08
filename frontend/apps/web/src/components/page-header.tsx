interface PageHeaderProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  children?: React.ReactNode
}

/** Navigation up the hierarchy is handled by `Breadcrumbs` in `Page`, so this
 *  no longer carries a back link — one per page in two different places was
 *  the reason the header height varied between routes. */
export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold">{title}</h1>
        {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
      </div>
      {children && (
        <div className="flex shrink-0 items-center gap-3">{children}</div>
      )}
    </div>
  )
}
