import { useEffect, useState } from "react";

// Fetches markdown/latex content and reads the X-Content-Extension header
// (or legacy X-Note-Extension) from the response. Returns loading state
// via a null extension until the first fetch resolves.
export function useContent(url: string) {
  const [content, setContent] = useState("");
  const [extension, setExtension] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setExtension(null);
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        const ext = res.headers.get('x-content-extension') ?? res.headers.get('x-note-extension');
        if (!cancelled) setExtension(ext);
        return res.text();
      })
      .then(text => { if (!cancelled) setContent(text); })
      .catch(() => {
        if (cancelled) return;
        setContent('Content not found.');
        setExtension('md');
      });
    return () => { cancelled = true; };
  }, [url]);

  return { content, extension };
}
