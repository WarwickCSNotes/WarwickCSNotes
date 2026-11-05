interface DataTableProps {
  headers: React.ReactNode[]
  /** The first cell of each row is its label, so it's emphasised. */
  rows: React.ReactNode[][]
  className?: string
}

/** A small bordered table for guide pages. Scrolls sideways rather than
 *  squashing its columns on a narrow screen. */
export function DataTable({ headers, rows, className }: DataTableProps) {
  return (
    <div className={`overflow-x-auto rounded-lg border ${className ?? ""}`}>
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-surface">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-2 font-semibold text-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-t align-top">
              {row.map((cell, c) => (
                <td
                  key={c}
                  className={`px-4 py-2 ${
                    c === 0
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
