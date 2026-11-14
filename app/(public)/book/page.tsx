import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { getRoute, placeholderMetadata } from "@/lib/config/page-metadata";

const PATH = "/book";

export const metadata = placeholderMetadata(PATH);

export default function BookPage() {
  return <PlaceholderPage title={getRoute(PATH).label} />;
}
