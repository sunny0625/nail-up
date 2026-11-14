import type { ReactNode } from "react";
import { businessConfig } from "@/lib/config/business";
import type { PublicRoute } from "@/types/business";
import { NavLink } from "./nav-link";

type MainNavProps = Readonly<{
  /** Routes to show. Defaults to the Business_Config routes. */
  routes?: readonly PublicRoute[];
  /** Rendered inside the same `<nav>` (the mobile menu), so there is one landmark. */
  children?: ReactNode;
}>;

/**
 * The shell's single `<nav>` landmark. At 768px and above it shows the primary
 * routes inline; below that the inline list is hidden and the child (MobileNav)
 * provides the toggle and menu inside this same `<nav>`.
 */
export function MainNav({ routes = businessConfig.routes, children }: MainNavProps) {
  const primaryRoutes = routes.filter((route) => route.inPrimaryNav);

  return (
    <nav
      aria-label="Primary"
      className="ml-auto md:order-3 md:ml-0 md:w-full xl:order-none xl:mx-auto xl:w-auto"
    >
      {primaryRoutes.length > 0 ? (
        <ul className="hidden items-center justify-center gap-x-md md:flex md:flex-wrap">
          {primaryRoutes.map((route) => (
            <li key={route.path}>
              <NavLink
                href={route.path}
                className="editorial-label inline-block border-b border-transparent py-xs text-xs whitespace-nowrap transition-colors duration-(--motion-duration) ease-(--motion-ease) hover:border-current aria-[current=page]:border-current"
              >
                {route.label}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : (
        <p className="editorial-label text-xs">Navigation is currently unavailable.</p>
      )}
      {children}
    </nav>
  );
}
