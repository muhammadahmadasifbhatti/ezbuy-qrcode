import type { PriceTagConfig } from "@/features/price-tag/types";

export { PriceTagDocument } from "@/features/price-tag/components/PriceTagDocument";
export { PriceTagDownloadButton } from "@/features/price-tag/PriceTagDownloadButton";
export { PriceTagPDFViewer } from "@/features/price-tag/PriceTagPDFViewer";
export type { PriceTagConfig, PriceTagProps } from "@/features/price-tag/types";

export const DEFAULT_PRICE_TAG_CONFIG: PriceTagConfig = {
  width: 60,
  height: 40,
  padding: 3,
};
