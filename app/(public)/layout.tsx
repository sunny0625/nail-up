import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

/**
 * Public layout: carries the Application_Shell for public routes only.
 *
 * `(public)` is a route group, so it adds no URL segment: `app/(public)/services`
 * is served at `/services`. The root layout (`app/layout.tsx`) stays shell-free.
 *
 * Order: AnnouncementBar, Header, `<main>`, Footer. The `<main>` below is the
 * only main landmark in the shell, so route pages must not render their own.
 *
 * Admin boundary (convention, nothing implemented here): future admin routes
 * live OUTSIDE this group, for example `app/admin/` with its own
 * `app/admin/layout.tsx`. They inherit only the minimal root layout, so the
 * announcement bar, public navigation and footer never render in the admin
 * dashboard. Do not place admin routes inside `(public)`.
 */
export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
