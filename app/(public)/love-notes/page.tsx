import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { getRoute, placeholderMetadata } from "@/lib/config/page-metadata";

const PATH = "/love-notes";

export const metadata = placeholderMetadata(PATH);

export default function LoveNotesPage() {
  return <PlaceholderPage title={getRoute(PATH).label} />;
}
