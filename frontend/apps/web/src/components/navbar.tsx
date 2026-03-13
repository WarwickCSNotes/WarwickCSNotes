import { Link } from "react-router-dom";
import { useTheme } from "./theme-provider";
import { Button } from "@workspace/ui/components/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";

export function Navbar() {
  const { setTheme } = useTheme();

  return (
    <nav className="border-b bg-background p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-primary">
          <span className="dragon-logo">🐉</span>
          <span className="haskell-logo">λ</span>
          Warwick CS Notes
        </Link>
        
        <div className="flex items-center gap-4">
          {[1, 2, 3].map((year) => (
            <Link key={year} to={`/year/${year}`} className="text-sm hover:underline">
              Year {year}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">Theme</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("ifykyk")}>🐉 ifykyk</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("cs141")}>λ 141</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}