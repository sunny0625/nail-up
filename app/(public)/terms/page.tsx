import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { getRoute, placeholderMetadata } from "@/lib/config/page-metadata";

const PATH = "/terms";

export const metadata = placeholderMetadata(PATH);

export default function TermsPage() {
  return <PlaceholderPage title={getRoute(PATH).label} />;
}
