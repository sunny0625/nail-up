import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { getRoute, placeholderMetadata } from "@/lib/config/page-metadata";

const PATH = "/contact";

export const metadata = placeholderMetadata(PATH);

export default function ContactPage() {
  return <PlaceholderPage title={getRoute(PATH).label} />;
}
