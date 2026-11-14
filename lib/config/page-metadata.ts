import type { Metadata } from "next";
import type { PublicRoute } from "@/types/business";
import { businessConfig } from "./business";

const { facts, copy, routes } = businessConfig;

/** The Business_Config route for `path`. Throws (failing the build) for an unknown path. */
export function getRoute(path: string): PublicRoute {
  const route = routes.find((candidate) => candidate.path === path);
  if (!route) {
    throw new Error(`No public route "${path}" in Business_Config.`);
  }
  return route;
}

/** Home page metadata. `absolute` keeps the parent "%s | Nail Up" template off the home title. */
export const homeMetadata: Metadata = {
  title: { absolute: `${facts.name} | ${copy.tagline}` },
  description: copy.supportingStatement,
};

/**
 * Metadata for a route whose content is deferred. The title is the route label
 * (the root layout's template adds " | Nail Up"). The description uses only
 * confirmed facts and states that the page is coming soon, so it makes no
 * claim the business has not confirmed.
 */
export function placeholderMetadata(path: string, description?: string): Metadata {
  const { label } = getRoute(path);
  return {
    title: label,
    description:
      description ??
      `${label}: coming soon from ${facts.name}, ${facts.type} in ${facts.location}.`,
  };
}
