import { useEffect, useState } from "react";

// Fetches markdown/latex content and reads the X-Content-Extension header
// (or legacy X-Note-Extension) from the response. Returns loading state
// via a null extension until the first fetch resolves.
export function useContent(url: string) {
  const [state, setState] = useState<{
    url: string;
    content: string;
    extension: string | null;
  }>({ url, content: "", extension: null });

  useEffect(() => {
    let cancelled = false;
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        const ext = res.headers.get('x-content-extension') ?? res.headers.get('x-note-extension');
        return res.text().then(text => ({ text, ext }));
      })
      .then(({ text, ext }) => {
        if (!cancelled) setState({ url, content: text, extension: ext });
      })
      .catch(() => {
        if (cancelled) return;
        setState({ url, content: 'Content not found.', extension: 'md' });
      });
    return () => { cancelled = true; };
  }, [url]);

  if (state.url !== url) return { content: "", extension: null };
  return { content: state.content, extension: state.extension };
}
