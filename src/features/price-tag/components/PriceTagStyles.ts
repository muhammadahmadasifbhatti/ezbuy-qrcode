import { StyleSheet } from "@react-pdf/renderer";
import { TAG_LAYOUT } from "@/features/price-tag/layout";
import type { PriceTagConfig } from "@/features/price-tag/types";
import { mmToPoints } from "@/features/price-tag/utils/mmToPoints";

export type PriceTagStyles = ReturnType<typeof createPriceTagStyles>;

const text = {
  fontSize: mmToPoints(TAG_LAYOUT.fontSize),
  lineHeight: TAG_LAYOUT.lineHeight,
};

export function createPriceTagStyles(config: PriceTagConfig) {
  return StyleSheet.create({
    page: {
      padding: mmToPoints(config.padding),
      backgroundColor: "#ffffff",
    },
    content: {
      flexGrow: 1,
      overflow: "hidden",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      marginBottom: mmToPoints(TAG_LAYOUT.rowGap),
    },
    label: {
      ...text,
      fontWeight: 700,
    },
    value: {
      ...text,
      fontWeight: 400,
    },
    conditionRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: mmToPoints(TAG_LAYOUT.rowGap),
    },
    conditionLabel: {
      ...text,
      fontWeight: 700,
      flexShrink: 0,
    },
    conditionValue: {
      ...text,
      fontWeight: 400,
      flexBasis: 0,
      flexGrow: 1,
      flexShrink: 1,
    },
    barcodeContainer: {
      marginTop: mmToPoints(TAG_LAYOUT.barcodeMarginTop),
    },
    barcodeImage: {
      width: mmToPoints(config.width - config.padding * 2),
      height: mmToPoints(TAG_LAYOUT.barcodeHeight),
      objectFit: "contain",
    },
  });
}
