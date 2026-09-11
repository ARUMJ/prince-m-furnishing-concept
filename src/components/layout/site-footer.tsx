import { business } from "@/data/business";

/** Phase 0 shell: identity and service lines only. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-surface">
      <div className="container-site flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          &copy; {year} {business.legalName}
        </p>
        <p className="text-xs tracking-wide text-subtle">
          {business.services.map((service) => service.label).join(" · ")}
        </p>
      </div>
    </footer>
  );
}
