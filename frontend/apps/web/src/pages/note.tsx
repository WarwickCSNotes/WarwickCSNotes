import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export const NotePage = () => {
  const { code, note } = useParams();
  const [content, setContent] = useState("");
  useEffect(() => {
    fetch(`/data/NoteData/${note}.md`)
      .then(res => res.text())
      .then(setContent);
  }, [note]);
  return (
    <div className="container mx-auto p-4">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};