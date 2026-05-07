import { Link } from "react-router-dom"

type BackLink = { to: string; label: string }

interface PageHeaderProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  back?: BackLink
  children?: React.ReactNode
}

export function PageHeader({
  title,
  subtitle,
  back,
  children,
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold">{title}</h1>
        {back && (
          <Link
            to={back.to}
            className="mt-3 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            &larr; {back.label}
          </Link>
        )}
        {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
      </div>
      {children && (
        <div className="flex shrink-0 items-center gap-3">{children}</div>
      )}
    </div>
  )
}
