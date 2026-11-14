import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { businessConfig } from "@/lib/config/business";
import { placeholderMetadata } from "@/lib/config/page-metadata";

const PATH = "/your-art";
const { yourArtHeading, yourArtSupporting } = businessConfig.copy;

// This route has confirmed page copy, so it uses that instead of the generic description.
export const metadata = placeholderMetadata(PATH, yourArtSupporting);

export default function YourArtPage() {
  return <PlaceholderPage title={yourArtHeading} description={yourArtSupporting} />;
}
