import type { PriceTagConfig } from "@/features/price-tag/types";

const INCHES_TO_MM = 25.4;

/**
 * Label measurements in millimetres. Shared by the PDF (what gets printed)
 * and the on-screen preview so both render the same layout.
 */
export const TAG_LAYOUT = {
  padding: 2,
  fontSize: 2.5,
  lineHeight: 1.2,
  rowGap: 0.5,
  barcodeMarginTop: 1,
  barcodeHeight: 8,
  /** Blank space to the right of the barcode so it stays left-aligned with
   *  the text but its last bars end well before the label edge, where thermal
   *  printers print faintly. */
  barcodeRightMargin: 6,
} as const;

export interface LabelSize {
  id: string;
  label: string;
  widthIn: number;
  heightIn: number;
}

export const LABEL_SIZES: LabelSize[] = [
  { id: "2x1", label: '2" × 1"', widthIn: 2, heightIn: 1 },
  { id: "2.4x1", label: '2.4" × 1"', widthIn: 2.4, heightIn: 1 },
];

export const DEFAULT_LABEL_SIZE = LABEL_SIZES[0];

export function labelSizeToConfig(size: LabelSize): PriceTagConfig {
  return {
    width: size.widthIn * INCHES_TO_MM,
    height: size.heightIn * INCHES_TO_MM,
    padding: TAG_LAYOUT.padding,
  };
}
