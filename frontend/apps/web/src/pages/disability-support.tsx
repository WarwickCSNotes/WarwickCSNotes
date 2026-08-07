import { useEffect } from "react"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"

export const DisabilitySupportPage = () => {
  useEffect(() => {
    document.title = "Disability & Support"
  }, [])

  return (
    <Page>
      <PageHeader
        title="Disability & Support"
        subtitle="Resources and support for disabled students at Warwick."
        back={{ to: "/resources", label: "Resources" }}
      />
    </Page>
  )
}
