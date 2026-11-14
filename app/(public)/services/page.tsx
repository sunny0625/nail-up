import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { getRoute, placeholderMetadata } from "@/lib/config/page-metadata";

const PATH = "/services";

export const metadata = placeholderMetadata(PATH);

export default function ServicesPage() {
  return <PlaceholderPage title={getRoute(PATH).label} />;
}
