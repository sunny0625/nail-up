import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { getRoute, placeholderMetadata } from "@/lib/config/page-metadata";

const PATH = "/lookbook";

export const metadata = placeholderMetadata(PATH);

export default function LookbookPage() {
  return <PlaceholderPage title={getRoute(PATH).label} />;
}
