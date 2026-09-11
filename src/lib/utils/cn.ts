/**
 * Join class names, dropping the falsy values produced by conditional
 * expressions: `cn("text-sm", isActive && "text-accent")`.
 *
 * Kept dependency-free on purpose — no clsx / tailwind-merge needed at
 * this project size.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
