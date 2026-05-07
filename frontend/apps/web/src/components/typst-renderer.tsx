import { useEffect, useRef } from "react"
import { createTypstRenderer } from "@myriaddreamin/typst.ts"

type TypstRenderFn = (options: {
  mainContent: string
  container: HTMLDivElement
}) => Promise<void>

export const TypstRenderer = ({ content }: { content: string }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const render = async () => {
      const renderer = createTypstRenderer()
      await renderer.init()
      // Simple implementation: interpret the content as a typst document
      await (renderer.renderToCanvas as unknown as TypstRenderFn)({
        mainContent: content,
        container: containerRef.current!,
      })
    }
    render().catch(console.error)
  }, [content])

  return <div ref={containerRef} className="typst-container" />
}
