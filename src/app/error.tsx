"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

/**
 * Minimal, professional error boundary. An error reporting service will be
 * wired into the effect once one is chosen.
 */
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      role="alert"
      className="container-site flex flex-col items-center gap-4 py-24 text-center sm:py-32"
    >
      <p className="eyebrow">Something went wrong</p>
      <h1>We could not load this page</h1>
      <p className="max-w-md text-muted">
        An unexpected error occurred. Please try again.
      </p>
      <Button onClick={retry} variant="outline" size="sm" className="mt-4">
        Try again
      </Button>
    </div>
  );
}
