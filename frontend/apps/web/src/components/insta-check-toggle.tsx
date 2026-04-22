import { useInstaCheck } from "@/lib/use-insta-check";

/** Small switch-style toggle for the "insta-check" quiz setting.
 *  Intended to sit next to the back button at the top of a quiz page. */
export function InstaCheckToggle() {
  const [enabled, setEnabled] = useInstaCheck();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label="Toggle insta-check"
      onClick={() => setEnabled(!enabled)}
      className="inline-flex items-center gap-2 px-3 py-2 border rounded-lg text-sm font-medium hover:bg-muted transition-colors cursor-pointer"
    >
      <span
        className={`inline-flex items-center w-10 h-5 p-0.5 rounded-full transition-colors ${
          enabled ? "bg-primary" : "bg-gray-400"
        }`}
      >
        <span
          className={`w-4 h-4 rounded-full bg-white transition-transform ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
      Insta-check
    </button>
  );
}
