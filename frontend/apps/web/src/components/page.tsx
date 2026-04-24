interface PageProps {
  children: React.ReactNode;
}

export function Page({ children }: PageProps) {
  return <div className="mx-auto max-w-6xl p-4">{children}</div>;
}
