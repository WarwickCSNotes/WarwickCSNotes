import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { MarkdownContent } from "@/components/markdown-content"
import { Page } from "@/components/page"
import { useContent } from "@/lib/use-content"

// Per-category chrome. Adding a new category is a matter of extending this map.
const CATEGORY_LABEL: Record<string, string> = {
  Notes: "Notes",
  Solutions: "Solution",
}

export const ResourcePage = () => {
  const { category = "", code, filename } = useParams()
  const url = `/resources/${category}/${code}/${filename}`
  const { content, extension } = useContent(url)
  const [modName, setModName] = useState<string>("")

  useEffect(() => {
    fetch(`/api/module/${code}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((mod) => {
        if (!mod) return
        setModName(mod.name)
        localStorage.setItem("last-year", String(mod.year))
      })
  }, [code])

  useEffect(() => {
    if (filename && code) {
      const label = CATEGORY_LABEL[category] ?? category
      document.title = `${filename}: ${code} ${label}`
    }
  }, [filename, code, category])

  if (!extension) return <Page>Loading...</Page>

  return (
    <Page>
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <Link
          to={`/module/${code}`}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          &larr; {code}
        </Link>
        {modName && (
          <span className="text-sm text-muted-foreground">
            {modName} - {CATEGORY_LABEL[category] ?? category}
          </span>
        )}
      </div>

      {extension === "pdf" ? (
        <iframe
          src={url}
          title={`${filename}.pdf`}
          className="h-[85vh] w-full rounded border"
        />
      ) : (
        <MarkdownContent content={content} extension={extension} />
      )}
    </Page>
  )
}
