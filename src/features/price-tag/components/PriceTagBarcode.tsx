import { useMemo } from "react";
import { Image, Text, View } from "@react-pdf/renderer";
import type { PriceTagConfig } from "@/features/price-tag/types";
import { generateBarcode } from "@/features/price-tag/utils/generateBarcode";
import { mmToPoints } from "@/features/price-tag/utils/mmToPoints";

interface PriceTagBarcodeProps {
  value: string;
  format: string;
  config: PriceTagConfig;
  styles: {
    barcodeContainer: object;
    barcodeImage: object;
  };
}

export function PriceTagBarcode({ value, format, config, styles }: PriceTagBarcodeProps) {
  const barcode = useMemo(() => generateBarcode(value, format), [value, format]);
  const barcodeSize = {
    width: mmToPoints(config.width - config.padding * 2),
    height: mmToPoints(12),
  };

  return (
    <View style={styles.barcodeContainer}>
      {barcode ? (
        <Image
          alt={`Barcode for ${value}`}
          src={barcode}
          style={{ ...styles.barcodeImage, ...barcodeSize }}
        />
      ) : (
        <Text>{value}</Text>
      )}
    </View>
  );
}
