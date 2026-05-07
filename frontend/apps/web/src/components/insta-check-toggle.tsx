import { useInstaCheck } from "@/lib/use-insta-check"

/** Small switch-style toggle for the "insta-check" quiz setting.
 *  Intended to sit next to the back button at the top of a quiz page. */
export function InstaCheckToggle() {
  const [enabled, setEnabled] = useInstaCheck()
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label="Toggle insta-check"
      onClick={() => setEnabled(!enabled)}
      className="inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
    >
      <span
        className={`inline-flex h-5 w-10 items-center rounded-full p-0.5 transition-colors ${
          enabled ? "bg-primary" : "bg-gray-400"
        }`}
      >
        <span
          className={`h-4 w-4 rounded-full bg-white transition-transform ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
      Insta-check
    </button>
  )
}
