import { Breadcrumbs } from "@/components/breadcrumbs"

interface PageProps {
  children: React.ReactNode
}

/** The single content frame for every route.
 *
 *  Width is deliberately not configurable: when pages picked their own the
 *  column jumped as you clicked between them. Anything needing a narrower
 *  measure constrains itself *inside* this frame.
 *
 *  Breadcrumbs live here rather than in each page so they land in exactly the
 *  same position everywhere, including home and the loading states. */
export function Page({ children }: PageProps) {
  return (
    <div className="mx-auto max-w-6xl p-4">
      <Breadcrumbs />
      {children}
    </div>
  )
}
