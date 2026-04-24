import { Link } from "react-router-dom";

type BackLink = { to: string; label: string };

interface PageHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  back?: BackLink;
  children?: React.ReactNode;
}

export function PageHeader({ title, subtitle, back, children }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
      <div>
        <h1 className="text-4xl font-bold">{title}</h1>
        {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        {back && (
          <Link
            to={back.to}
            className="inline-flex items-center gap-2 mt-3 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
          >
            &larr; {back.label}
          </Link>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-3 shrink-0">
          {children}
        </div>
      )}
    </div>
  );
}
