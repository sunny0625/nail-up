import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { getRoute, placeholderMetadata } from "@/lib/config/page-metadata";

const PATH = "/privacy";

export const metadata = placeholderMetadata(PATH);

export default function PrivacyPage() {
  return <PlaceholderPage title={getRoute(PATH).label} />;
}
