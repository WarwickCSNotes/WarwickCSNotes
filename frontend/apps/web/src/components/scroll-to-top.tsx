import { useLayoutEffect, useRef } from "react"
import { useLocation, useNavigationType } from "react-router-dom"

/** How long to keep chasing an anchor while async content lands. */
const ANCHOR_TIMEOUT_MS = 3000
/** How often to re-check the target's position. */
const ANCHOR_POLL_MS = 50
/** Consecutive polls the target must hold still before we accept it settled. */
const STABLE_POLLS = 4

/** Paths whose anchors are centred rather than top-aligned. Acknowledgements
 *  links point at a single person inside a grid, and centring is what makes it
 *  obvious which one you were sent to. */
const CENTRED_ANCHORS = ["/acknowledgements"]

function alignment(pathname: string): "start" | "center" {
  return CENTRED_ANCHORS.includes(pathname) ? "center" : "start"
}

/** Scroll an anchor into view and *keep* it there while the page grows.
 *
 *  A one-shot `scrollIntoView` doesn't work here: pages fetch their content,
 *  and KaTeX and images resize after first paint, so the target moves after
 *  we've already scrolled to where it used to be. That was the old bug — you
 *  landed at the top of the page, because at the moment of the call the target
 *  really was near the top. The element often doesn't exist yet either, since
 *  these are lazy routes still showing their Suspense fallback.
 *
 *  So we re-align on a timer until the target's position stops changing, then
 *  give up at a deadline. It's a timer rather than `requestAnimationFrame`
 *  because rAF is frozen in a hidden tab — open a link in a background tab and
 *  the anchor would never resolve. Positioning is instant rather than smooth
 *  because a running smooth animation and a repeated correction fight. */
function chaseAnchor(id: string, block: "start" | "center") {
  let cancelled = false
  let stable = 0
  let lastTop = Number.NaN
  let timer: ReturnType<typeof setTimeout> | undefined
  const deadline = Date.now() + ANCHOR_TIMEOUT_MS

  // The moment the reader takes over, stop moving the page under them.
  const surrender = () => {
    cancelled = true
  }
  window.addEventListener("wheel", surrender, { passive: true })
  window.addEventListener("touchstart", surrender, { passive: true })
  window.addEventListener("keydown", surrender)

  const stop = () => {
    if (timer) clearTimeout(timer)
    window.removeEventListener("wheel", surrender)
    window.removeEventListener("touchstart", surrender)
    window.removeEventListener("keydown", surrender)
  }

  const poll = () => {
    if (cancelled) return stop()

    const el = document.getElementById(id)
    if (el) {
      const rect = el.getBoundingClientRect()
      const top = rect.top + window.scrollY
      const offset =
        block === "center"
          ? Math.max(0, (window.innerHeight - rect.height) / 2)
          : 0
      window.scrollTo(0, Math.max(0, top - offset))

      stable = Math.abs(top - lastTop) < 1 ? stable + 1 : 0
      lastTop = top
      if (stable >= STABLE_POLLS) return stop()
    }

    if (Date.now() >= deadline) return stop()
    timer = setTimeout(poll, ANCHOR_POLL_MS)
  }

  poll()

  return () => {
    cancelled = true
    stop()
  }
}

/** Owns scroll position across navigation, which React Router leaves alone.
 *
 *  - A new page starts at the top. Without this, clicking a link from halfway
 *    down a long page lands you halfway down the next one.
 *  - A `#anchor` scrolls to its target instead, and keeps it in view until the
 *    page stops growing (see `chaseAnchor`).
 *  - Back and forward are left to the browser, which restores the position you
 *    left — jumping to the top there would throw away your place.
 *  - The first render is left alone too, apart from honouring a hash: React
 *    Router reports the initial load as a POP, and on a refresh the browser is
 *    already restoring where you were.
 *
 *  This is a layout effect so the reset lands before paint — with `useEffect`
 *  the new page flashes at the old scroll offset for a frame. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()
  const firstRender = useRef(true)

  useLayoutEffect(() => {
    const initial = firstRender.current
    firstRender.current = false

    if (hash) {
      return chaseAnchor(decodeURIComponent(hash.slice(1)), alignment(pathname))
    }
    if (initial || navigationType === "POP") return
    window.scrollTo(0, 0)
  }, [pathname, hash, navigationType])

  return null
}
