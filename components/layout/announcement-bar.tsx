import { businessConfig } from "@/lib/config/business";
import { PageContainer } from "./page-container";

/** Strip above the header. The text comes from Business_Config. */
export function AnnouncementBar() {
  return (
    <div className="bg-espresso text-ivory">
      <PageContainer width="wide">
        <p className="editorial-label py-xs text-center text-xs">
          {businessConfig.copy.announcement}
        </p>
      </PageContainer>
    </div>
  );
}
