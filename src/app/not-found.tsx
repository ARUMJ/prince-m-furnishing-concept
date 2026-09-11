import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-site flex flex-col items-center gap-4 py-24 text-center sm:py-32">
      <p className="eyebrow">Error 404</p>
      <h1>Page not found</h1>
      <p className="max-w-md text-muted">
        The page you were looking for has moved or no longer exists.
      </p>
      <ButtonLink href="/" variant="outline" size="sm" className="mt-4">
        Back to homepage
      </ButtonLink>
    </div>
  );
}
