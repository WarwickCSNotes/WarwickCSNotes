import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { MarkdownContent } from "@/components/markdown-content"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { useContent } from "@/lib/use-content"
import { humanise } from "@/lib/humanise"

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
      document.title = `${humanise(filename)}: ${code} ${label}`
    }
  }, [filename, code, category])

  if (!extension) return <Page>Loading...</Page>

  return (
    <Page>
      <PageHeader
        title={humanise(filename ?? "")}
        subtitle={
          modName && `${modName} - ${CATEGORY_LABEL[category] ?? category}`
        }
      />

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
