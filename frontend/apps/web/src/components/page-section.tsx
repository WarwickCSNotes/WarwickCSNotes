interface PageSectionProps {
  id?: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

export function PageSection({
  id,
  title,
  subtitle,
  className,
  children,
}: PageSectionProps) {
  return (
    <section id={id} className={className}>
      <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
      {subtitle && (
        <p className="mb-4 text-sm text-muted-foreground">{subtitle}</p>
      )}
      {children}
    </section>
  )
}
