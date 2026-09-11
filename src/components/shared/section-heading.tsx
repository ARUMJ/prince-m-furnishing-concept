import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

/**
 * The shared heading block: gold eyebrow, display title and optional lead
 * copy. The heading element it renders is passed in so each section can
 * respect the page-level heading hierarchy (the page h1 lives in the hero).
 */
export function SectionHeading({
  eyebrow,
  title,
  as: Tag = "h2",
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  as?: "h2" | "h3";
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="eyebrow flex items-center gap-3">
          <span aria-hidden="true" className="inline-block h-px w-8 bg-accent/70" />
          {eyebrow}
        </p>
      ) : null}
      <Tag className="text-title">{title}</Tag>
      {description ? (
        <p className={cn("max-w-2xl text-lead text-muted")}>{description}</p>
      ) : null}
    </div>
  );
}
