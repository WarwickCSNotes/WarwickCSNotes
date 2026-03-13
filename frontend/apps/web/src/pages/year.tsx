import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const YearPage = () => {
  const { year } = useParams();
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch(`/data/YearData/year${year}.json`)
      .then(res => res.json())
      .then(setData);
  }, [year]);
  if (!data) return <div>Loading...</div>;
  return <div className="container mx-auto p-4"><h1>{data.title}</h1></div>;
};