import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Welcome = () => {
  useEffect(() => { document.title = "CS Notes"; }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>

      <div className="mb-8 p-4 border rounded-lg bg-muted/50 text-sm text-muted-foreground">
        <strong className="text-foreground">Disclaimer:</strong> These notes are student-made and
        are not officially endorsed by the University of Warwick. They may contain errors or
        omissions. Always cross-reference with official lecture materials and module resources.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map(y => (
          <Link
            key={y}
            to={`/year/${y}`}
            className="block p-6 border rounded-lg hover:bg-muted transition"
          >
            <h2 className="text-2xl font-semibold">Year {y}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};
