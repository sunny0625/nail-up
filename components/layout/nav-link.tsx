"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavLinkProps = Readonly<{
  href: string;
  children: ReactNode;
  /** Styling is owned by the caller; use `aria-[current=page]:` for the active state. */
  className?: string;
  /** Called when the link is activated (the mobile menu uses it to close). */
  onNavigate?: () => void;
}>;

/**
 * Navigation link that marks itself `aria-current="page"` when it points at the
 * current route. This is the only client logic the desktop navigation needs
 * (`usePathname` is a client hook). It renders a plain link, so it sits inside
 * the single `<nav>` owned by MainNav and adds no landmark of its own.
 */
export function NavLink({ href, children, className, onNavigate }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      aria-current={pathname === href ? "page" : undefined}
      className={className}
      onClick={onNavigate}
    >
      {children}
    </Link>
  );
}
