import { StyleSheet } from "@react-pdf/renderer";
import type { PriceTagConfig } from "@/features/price-tag/types";
import { mmToPoints } from "@/features/price-tag/utils/mmToPoints";

export function createPriceTagStyles(config: PriceTagConfig) {
  return StyleSheet.create({
    page: {
      padding: mmToPoints(config.padding),
      backgroundColor: "#ffffff",
    },
    body: {
      display: "flex",
      flexDirection: "column",
      gap: mmToPoints(1),
    },
    productName: {
      fontSize: mmToPoints(1.6),
      fontWeight: 700,
    },
    price: {
      fontSize: mmToPoints(2.2),
      fontWeight: 700,
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
