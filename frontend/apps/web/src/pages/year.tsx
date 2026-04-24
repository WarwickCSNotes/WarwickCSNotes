import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const YearPage = () => {
  const { year } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/year/${year}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        localStorage.setItem('last-year', String(year));
      });
  }, [year]);

  useEffect(() => {
    document.title = `Year ${year}`;
  }, [year]);

  if (!data) return <div className="mx-auto max-w-6xl p-4">Loading...</div>;

  return (
    <div className="mx-auto max-w-6xl p-4">
      <Link to="/" className="inline-flex items-center gap-2 mb-6 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted transition-colors">
        &larr; Dashboard
      </Link>
      <h1 className="mb-4">{data.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(data.modules).map(([code, mod]: [string, any]) => (
          <Link key={code} to={`/module/${code}`} className="block p-4 bg-surface text-surface-foreground border rounded-lg shadow hover:brightness-110 transition">
            <h6 className="text-sm font-semibold text-primary">{code}</h6>
            <h5 className="font-bold">{mod.name}</h5>
            <p className="text-sm text-muted-foreground mt-1">{mod.tagline}</p>
            <div className="flex gap-3 mt-2">
              {mod.Term && <span className="text-xs font-medium text-detail">Term {mod.Term}</span>}
              {mod.CATS && <span className="text-xs font-medium text-detail">{mod.CATS} CATS</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
