import { cn } from "@workspace/ui/lib/utils";

const compactTile =
  "relative block rounded-lg border p-4 text-sm font-medium shadow-sm";
const interactiveCompactTile =
  "border-border bg-surface text-surface-foreground transition-all hover:-translate-y-0.5 hover:bg-surface-hover hover:shadow-md cursor-pointer";
const disabledCompactTile =
  "border-border bg-muted text-muted-foreground opacity-60 cursor-not-allowed shadow-none";

export const compactTileClass = compactTile;
export const interactiveCompactTileClass = cn(compactTile, interactiveCompactTile);
export const disabledCompactTileClass = cn(compactTile, disabledCompactTile);
