import { useEffect } from "react"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { PageSection } from "@/components/page-section"

export const HowToContributePage = () => {
  useEffect(() => {
    document.title = "How to Contribute"
  }, [])

  return (
    <Page>
      <PageHeader
        title="How to Contribute"
        subtitle="Adding notes, solutions, and quizzes to Warwick CS Notes."
      />

      <div className="mb-10 max-w-3xl text-muted-foreground">
        <p className="mb-3">
          Warwick CS Notes is open source and welcomes contributions.
          Content (notes, solutions, quizzes) is just as valuable as code.
        </p>
        <p>
          The repo lives at{" "}
          <a
            href="https://github.com/WarwickCSNotes/WarwickCSNotes"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline hover:opacity-80"
          >
            github.com/WarwickCSNotes/WarwickCSNotes
          </a>
          . See{" "}
          <a
            href="https://github.com/WarwickCSNotes/WarwickCSNotes/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline hover:opacity-80"
          >
            <code>CONTRIBUTING.md</code>
          </a>{" "}
          for the full workflow (forking, branching, PRs), and{" "}
          <a
            href="https://github.com/WarwickCSNotes/WarwickCSNotes/blob/main/Docs.md"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline hover:opacity-80"
          >
            <code>Docs.md</code>
          </a>{" "}
          for architecture notes and what we're allowed to host.
        </p>
      </div>

      <PageSection title="How to add a note" className="mb-10">
        <div className="text-muted-foreground">
          <ol className="ml-6 list-decimal space-y-3">
            <li>
              <strong className="text-foreground">Write the file.</strong>{" "}
              Save it in{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                Data/Resources/Notes/
              </code>
              . Markdown (<code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">.md</code>),
              LaTeX (<code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">.tex</code>),
              and PDF (<code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">.pdf</code>) are
              all supported. Markdown with embedded LaTeX (
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">$...$</code>
              /{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">$$...$$</code>) is the
              most common choice.
            </li>
            <li>
              <strong className="text-foreground">Images.</strong> Put images
              in{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                Data/Resources/Images/
              </code>
              , reference them from markdown as{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                /Resources/Images/YourImage.png
              </code>
              .
            </li>
            <li>
              <strong className="text-foreground">Link it.</strong> In{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                Data/YearData/year&lt;N&gt;.json
              </code>
              , add an entry to the module's{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                notes
              </code>{" "}
              array:
              <pre className="mt-2 overflow-x-auto rounded bg-muted p-3 font-mono text-xs">
                {`{"title": "Functions", "url": "/resources/Notes/CS130/Functions"}`}
              </pre>
              URL format is{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                /resources/Notes/&lt;ModuleCode&gt;/&lt;FilenameWithoutExtension&gt;
              </code>
              .
            </li>
          </ol>
        </div>
      </PageSection>

      <PageSection title="How to add an exam paper solution" className="mb-10">
        <div className="text-muted-foreground">
          <ol className="ml-6 list-decimal space-y-3">
            <li>
              <strong className="text-foreground">Write the file.</strong>{" "}
              Save it in{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                Data/Resources/Solutions/
              </code>{" "}
              with the filename{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                &lt;ModuleCode&gt;-&lt;PaperYear&gt;.md
              </code>{" "}
              (e.g.{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                CS130-2025.md
              </code>
              ).
            </li>
            <li>
              <strong className="text-foreground">Link it.</strong> In{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                Data/YearData/year&lt;N&gt;.json
              </code>
              , add or extend an entry in the module's{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                past_papers
              </code>{" "}
              array with a nested{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                solution
              </code>{" "}
              object:
              <pre className="mt-2 overflow-x-auto rounded bg-muted p-3 font-mono text-xs">
                {`{"title": "2024 Exam Paper", "url": "#", "solution": {"url": "/resources/Solutions/CS130/CS130-2024"}}`}
              </pre>
            </li>
            <li>
              <strong className="text-foreground">Verified?</strong> If a
              tutor or module organiser has reviewed the solution, set{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                "verified": true
              </code>{" "}
              inside the{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                solution
              </code>{" "}
              object.
            </li>
            <li>
              <strong className="text-foreground">Unfinished?</strong> If
              it's a work in progress, set{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                "unfinished": true
              </code>{" "}
              to show a construction badge.
            </li>
          </ol>
        </div>
      </PageSection>

      <PageSection title="How to add a quiz" className="mb-10">
        <div className="text-muted-foreground">
          <ol className="ml-6 list-decimal space-y-3">
            <li>
              <strong className="text-foreground">Create the file.</strong>{" "}
              Save a JSON file in{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                Data/Quizzes/
              </code>{" "}
              named{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                &lt;module&gt;-&lt;slug&gt;.json
              </code>{" "}
              (e.g.{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                cs355-image-representation.json
              </code>
              ).
            </li>
            <li>
              <strong className="text-foreground">Structure.</strong>{" "}
              Top-level fields:{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                title
              </code>
              ,{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                module
              </code>
              ,{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                description
              </code>
              , and{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                questions
              </code>{" "}
              (an array).
              <pre className="mt-2 overflow-x-auto rounded bg-muted p-3 font-mono text-xs">
                {`{
  "title": "Image Representation",
  "module": "CS355",
  "description": "Quick check on colour spaces and chroma subsampling.",
  "questions": [ /* ... */ ]
}`}
              </pre>
            </li>
            <li>
              <strong className="text-foreground">Question types.</strong>{" "}
              Each question has a{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                type
              </code>{" "}
              and a{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                prompt
              </code>
              , then type-specific fields:
              <ul className="mt-2 ml-6 list-disc space-y-1">
                <li>
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                    text
                  </code>
                  : one text box.{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                    accepted
                  </code>{" "}
                  is an array of valid answers.
                </li>
                <li>
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                    multitext
                  </code>
                  :{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                    slots
                  </code>{" "}
                  boxes, any order matches against{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                    accepted
                  </code>
                  .
                </li>
                <li>
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                    checkbox
                  </code>
                  :{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                    options
                  </code>{" "}
                  array,{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                    correct
                  </code>{" "}
                  is an array of indices.
                </li>
                <li>
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                    match
                  </code>
                  :{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                    left
                  </code>{" "}
                  and{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                    right
                  </code>{" "}
                  arrays;{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                    correct
                  </code>{" "}
                  maps each{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                    left
                  </code>{" "}
                  entry to a{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                    right
                  </code>{" "}
                  index.
                </li>
                <li>
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                    sort
                  </code>{" "}
                  and{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                    order
                  </code>
                  : drag items into the correct sequence.
                </li>
              </ul>
              Existing quizzes in{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                Data/Quizzes/
              </code>{" "}
              are the easiest reference for each type.
            </li>
            <li>
              <strong className="text-foreground">Link it.</strong> In{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                Data/YearData/year&lt;N&gt;.json
              </code>
              , add an entry to the module's{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                quizzes
              </code>{" "}
              array:
              <pre className="mt-2 overflow-x-auto rounded bg-muted p-3 font-mono text-xs">
                {`{"title": "Image Representation", "url": "/quizzes/cs355-image-representation"}`}
              </pre>
            </li>
          </ol>
        </div>
      </PageSection>

      <PageSection title="How to add an external resource" className="mb-10">
        <div className="text-muted-foreground">
          <p className="mb-3">
            External resources are third-party links (textbooks, other
            notes, videos) shown on a module page.
          </p>
          <p className="mb-3">
            In{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              Data/YearData/year&lt;N&gt;.json
            </code>
            , add (or create) an{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              external_resources
            </code>{" "}
            array on the module. Each entry needs a{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              name
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              description
            </code>
            ;{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              url
            </code>{" "}
            is optional (entries without a URL render as a non-clickable
            card, useful for suggestions like "ask on Discord" or book
            titles without an obvious online source).
          </p>
          <pre className="overflow-x-auto rounded bg-muted p-3 font-mono text-xs">
            {`"external_resources": [
  {
    "name": "Book of Proof (Hammack)",
    "url": "https://richardhammack.github.io/BookOfProof/Main.pdf",
    "description": "Free online textbook, great for proof techniques."
  }
]`}
          </pre>
        </div>
      </PageSection>
    </Page>
  )
}
