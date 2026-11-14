import Link from "next/link";
import { businessConfig } from "@/lib/config/business";
import { PageContainer } from "./page-container";
import { SocialLinks } from "./social-links";

const linkClass =
  "inline-block border-b border-transparent py-xs transition-colors duration-(--motion-duration) ease-(--motion-ease) hover:border-current";

/**
 * The shell's single `<footer>`: a link to every public route (including
 * /privacy and /terms) plus the contact links. It deliberately shows only
 * confirmed facts. The street address and opening hours are omitted until the
 * business confirms them. Plain lists, not `<nav>`: the shell keeps one nav landmark.
 */
export function Footer() {
  const { copy, facts, routes } = businessConfig;
  const primaryRoutes = routes.filter((route) => route.inPrimaryNav);
  const legalRoutes = routes.filter((route) => !route.inPrimaryNav);

  return (
    <footer className="border-t border-espresso/15 bg-cream">
      <PageContainer width="wide">
        <div className="grid gap-xl py-xl md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-serif text-3xl">{copy.tagline}</p>
            <p className="editorial-label mt-sm text-xs">{facts.location}</p>
          </div>

          <div className="md:col-span-4">
            <h2 className="editorial-label text-xs">Explore</h2>
            <ul className="mt-sm grid grid-cols-2 gap-x-md">
              {primaryRoutes.map((route) => (
                <li key={route.path}>
                  <Link href={route.path} className={linkClass}>
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="editorial-label text-xs">Get in touch</h2>
            <div className="mt-sm">
              <SocialLinks />
            </div>
            <h2 className="editorial-label mt-lg text-xs">Legal</h2>
            <ul className="mt-sm flex flex-col">
              {legalRoutes.map((route) => (
                <li key={route.path}>
                  <Link href={route.path} className={linkClass}>
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="border-t border-espresso/15 py-md text-xs">
          &copy; {new Date().getFullYear()} {facts.name}
        </p>
      </PageContainer>
    </footer>
  );
}
