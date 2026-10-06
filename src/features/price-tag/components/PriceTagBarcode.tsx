import { useMemo } from "react";
import { Image, Text, View } from "@react-pdf/renderer";
import type { PriceTagStyles } from "@/features/price-tag/components/PriceTagStyles";
import { generateBarcode } from "@/features/price-tag/utils/generateBarcode";

interface PriceTagBarcodeProps {
  value: string;
  format: string;
  styles: Pick<PriceTagStyles, "barcodeContainer" | "barcodeImage" | "value">;
}

export function PriceTagBarcode({ value, format, styles }: PriceTagBarcodeProps) {
  const barcode = useMemo(
    () => generateBarcode(value, format),
    [value, format],
  );

  return (
    <View style={styles.barcodeContainer}>
      {barcode ? (
        <Image src={barcode} style={styles.barcodeImage} />
      ) : (
        <Text style={styles.value}>{value}</Text>
      )}
    </View>
  );
}
