import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { getRoute, placeholderMetadata } from "@/lib/config/page-metadata";

const PATH = "/about";

export const metadata = placeholderMetadata(PATH);

export default function AboutPage() {
  return <PlaceholderPage title={getRoute(PATH).label} />;
}
