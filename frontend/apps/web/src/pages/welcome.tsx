import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Welcome = () => {
  const [years, setYears] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([1, 2, 3].map(y => fetch(`/data/YearData/year${y}.json`).then(r => r.json())))
      .then(setYears);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 gap-8">
        {years.map(year => (
          <div key={year.year} className="border rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">{year.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {year.modules.map((mod: any) => (
                <Link 
                    key={mod.code} 
                    to={`/module/${mod.code}`} 
                    className="block p-4 border rounded hover:bg-muted transition"
                >
                  <h6 className="text-sm text-muted-foreground">{mod.code}</h6>
                  <h5 className="font-bold">{mod.name}</h5>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};