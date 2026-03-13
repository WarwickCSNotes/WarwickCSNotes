import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const YearPage = () => {
  const { year } = useParams();
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch(`/data/YearData/year${year}.json`)
      .then(res => res.json())
      .then(setData);
  }, [year]);
  if (!data) return <div className="container mx-auto p-4">Loading...</div>;
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4">{data.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.modules.map((mod: any) => (
          <Link key={mod.code} to={`/module/${mod.code}`} className="block p-4 border rounded shadow hover:bg-muted">
            <h6 className="text-sm text-muted-foreground">{mod.code}</h6>
            <h5 className="font-bold">{mod.name}</h5>
            <p className="text-sm text-secondary-foreground">{mod.tagline}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};