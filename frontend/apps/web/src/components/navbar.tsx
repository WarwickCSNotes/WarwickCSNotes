import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "./theme-provider";
import { Button } from "@workspace/ui/components/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import { ChevronDown, Menu } from "lucide-react";

export function Navbar() {
  const { setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const onModuleOrNote = location.pathname.startsWith('/module/') || location.pathname.startsWith('/notes/');
  const lastYear = onModuleOrNote ? localStorage.getItem('last-year') : null;

  const navItems: { to: string; label: string; active: boolean }[] = [
    ...[1, 2, 3, 4].map((year) => ({
      to: `/year/${year}`,
      label: `Year ${year}`,
      active: location.pathname.startsWith(`/year/${year}`) || (onModuleOrNote && lastYear === String(year)),
    })),
    { to: "/careers", label: "Careers", active: location.pathname === '/careers' },
    { to: "/acknowledgements", label: "Credits", active: location.pathname === '/acknowledgements' },
  ];

  return (
    <nav className="relative border-b border-white/10 bg-nav py-4 text-nav-foreground">
      {/* Decorative sparkles, only rendered visually in the cat theme via CSS. */}
      <span className="cat-star" aria-hidden="true" style={{ top: 4, left: '5%', fontSize: '0.55rem', opacity: 0.65 }}>✦</span>
      <span className="cat-star" aria-hidden="true" style={{ top: 6, left: '14%', fontSize: '0.7rem', opacity: 0.75 }}>✦</span>
      <span className="cat-star" aria-hidden="true" style={{ bottom: 4, left: '20%', fontSize: '0.6rem', opacity: 0.7 }}>✧</span>
      <span className="cat-star" aria-hidden="true" style={{ bottom: 8, left: '28%', fontSize: '0.9rem', opacity: 0.85 }}>✧</span>
      <span className="cat-star" aria-hidden="true" style={{ top: 8, left: '36%', fontSize: '0.7rem', opacity: 0.75 }}>✦</span>
      <span className="cat-star" aria-hidden="true" style={{ top: 14, left: '46%', fontSize: '0.55rem', opacity: 0.6 }}>✦</span>
      <span className="cat-star" aria-hidden="true" style={{ bottom: 14, left: '52%', fontSize: '0.5rem', opacity: 0.55 }}>✧</span>
      <span className="cat-star" aria-hidden="true" style={{ bottom: 6, left: '60%', fontSize: '0.8rem', opacity: 0.7 }}>✧</span>
      <span className="cat-star" aria-hidden="true" style={{ top: 16, left: '68%', fontSize: '0.6rem', opacity: 0.65 }}>✦</span>
      <span className="cat-star" aria-hidden="true" style={{ bottom: 4, left: '76%', fontSize: '0.7rem', opacity: 0.75 }}>✧</span>
      <span className="cat-star" aria-hidden="true" style={{ top: 10, right: '22%', fontSize: '0.9rem', opacity: 0.85 }}>✦</span>
      <span className="cat-star" aria-hidden="true" style={{ bottom: 12, right: '16%', fontSize: '0.65rem', opacity: 0.7 }}>✧</span>
      <span className="cat-star" aria-hidden="true" style={{ top: 4, right: '12%', fontSize: '0.85rem', opacity: 0.8 }}>✦</span>
      <span className="cat-star" aria-hidden="true" style={{ bottom: 10, right: '6%', fontSize: '0.65rem', opacity: 0.7 }}>✧</span>
      <div className="relative mx-auto max-w-6xl px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-nav-foreground text-xl">
          <span className="dragon-logo text-2xl">🐉</span>
          <span className="haskell-logo text-2xl">λ</span>
          <span className="cat-logo text-2xl">🌸</span>
          Warwick CS Notes
        </Link>

        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-white/20 text-nav-foreground"
                    : "text-nav-foreground/75 hover:bg-white/10 hover:text-nav-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer border-white/20 text-nav-foreground bg-transparent hover:bg-white/10 hover:text-nav-foreground"
                  aria-label="Open menu"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {navItems.map((item) => (
                  <DropdownMenuItem key={item.to} onClick={() => navigate(item.to)}>
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="cursor-pointer gap-1 ml-2 border-white/20 text-nav-foreground bg-transparent hover:bg-white/10 hover:text-nav-foreground">
                Theme <ChevronDown className="h-3 w-3 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("contrast")}>High Contrast</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("tabula")}>Tabula</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dragon")}>🐉 Dragon</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("cs141")}>λ 141</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("cat")}>🌸 Cat</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
