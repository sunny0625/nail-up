"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { PublicRoute } from "@/types/business";
import { NavLink } from "./nav-link";
import { PageContainer } from "./page-container";

type MobileNavProps = Readonly<{
  /** Every public route: primary routes first, then the footer-only routes. */
  routes: readonly PublicRoute[];
}>;

/**
 * Mobile menu toggle and panel, shown below 768px. It renders no `<nav>` of its
 * own: MainNav passes it in as a child, so the shell keeps one landmark.
 *
 * Transitions use the motion tokens, and the global reduced-motion rule in
 * globals.css disables them. The closed panel is `visibility: hidden`, which
 * removes its links from the tab order and the accessibility tree.
 */
export function MobileNav({ routes }: MobileNavProps) {
  const pathname = usePathname();
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  // The menu is open only for the route it was opened on, so navigating closes it.
  const [openPath, setOpenPath] = useState<string | null>(null);
  if (openPath !== null && openPath !== pathname) {
    setOpenPath(null);
  }
  const open = openPath === pathname;

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenPath(null);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  if (routes.length === 0) return null;

  const primaryRoutes = routes.filter((route) => route.inPrimaryNav);
  const secondaryRoutes = routes.filter((route) => !route.inPrimaryNav);
  const close = () => setOpenPath(null);

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpenPath(open ? null : pathname)}
        className="editorial-label min-h-11 px-xs text-xs"
      >
        {open ? "Close" : "Menu"}
      </button>

      <div
        id={menuId}
        className={`absolute inset-x-0 top-full z-10 border-b border-espresso/15 bg-ivory shadow-soft transition-[opacity,translate,visibility] duration-(--motion-duration) ease-(--motion-ease) ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-xs opacity-0"
        }`}
      >
        <PageContainer width="wide">
          <ul className="flex flex-col gap-xs py-md">
            {primaryRoutes.map((route) => (
              <li key={route.path}>
                <NavLink
                  href={route.path}
                  onNavigate={close}
                  className="inline-block border-b border-transparent py-xs font-serif text-2xl aria-[current=page]:border-current"
                >
                  {route.label}
                </NavLink>
              </li>
            ))}
          </ul>
          {secondaryRoutes.length > 0 && (
            <ul className="flex gap-md border-t border-espresso/15 py-md">
              {secondaryRoutes.map((route) => (
                <li key={route.path}>
                  <NavLink
                    href={route.path}
                    onNavigate={close}
                    className="editorial-label inline-block border-b border-transparent py-xs text-xs aria-[current=page]:border-current"
                  >
                    {route.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </PageContainer>
      </div>
    </div>
  );
}
