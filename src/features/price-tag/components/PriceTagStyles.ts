import { StyleSheet } from "@react-pdf/renderer";
import type { PriceTagConfig } from "@/features/price-tag/types";
import { mmToPoints } from "@/features/price-tag/utils/mmToPoints";

export type PriceTagStyles = ReturnType<typeof createPriceTagStyles>;

export function createPriceTagStyles(config: PriceTagConfig) {
  return StyleSheet.create({
    page: {
      padding: mmToPoints(config.padding),
      backgroundColor: "#ffffff",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      marginBottom: mmToPoints(0.5),
    },
    label: {
      fontSize: mmToPoints(1.4),
      fontWeight: 700,
    },
    value: {
      fontSize: mmToPoints(1.4),
      fontWeight: 400,
    },
    barcodeContainer: {
      marginTop: mmToPoints(1),
    },
    barcodeImage: {
      width: mmToPoints(config.width - config.padding * 2),
      height: mmToPoints(12),
      objectFit: "contain",
    },
  });
}
