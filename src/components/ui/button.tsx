import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/lib/utils/cn";

/**
 * The single button primitive for the site.
 *
 * Gold is reserved for the primary action; `outline` and `ghost` exist for
 * secondary and tertiary actions so a screen never becomes all-gold.
 *
 * Use `Button` for real actions and `ButtonLink` for navigation — it renders
 * a `next/link` for internal routes and an `<a>` for external ones.
 */

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-sm font-medium uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent-strong",
  outline:
    "border border-accent/60 text-accent hover:border-accent hover:bg-accent/10",
  ghost: "text-foreground hover:text-accent",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-4 text-xs tracking-[0.18em]",
  md: "h-11 px-6 text-xs tracking-[0.18em]",
  lg: "h-13 px-8 text-sm tracking-[0.16em]",
};

function buttonStyles(variant: Variant, size: Size, className?: string) {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={buttonStyles(variant, size, className)}
      {...props}
    />
  );
}

export type ButtonLinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonLinkProps) {
  const styles = buttonStyles(variant, size, className);
  const isExternal = /^(?:https?:)?\/\//i.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        className={styles}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    );
  }

  return <Link href={href} className={styles} {...props} />;
}
