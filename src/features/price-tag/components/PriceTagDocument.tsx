import { Document, Page } from "@react-pdf/renderer";
import { PriceTagBody } from "@/features/price-tag/components/PriceTagBody";
import { PriceTagBarcode } from "@/features/price-tag/components/PriceTagBarcode";
import { createPriceTagStyles } from "@/features/price-tag/components/PriceTagStyles";
import type { PriceTagProps } from "@/features/price-tag/types";
import { mmToPoints } from "@/features/price-tag/utils/mmToPoints";

export function PriceTagDocument({
  productName,
  price,
  currency,
  barcodeValue,
  barcodeFormat = "code128",
  config,
}: PriceTagProps) {
  const styles = createPriceTagStyles(config);
  const pageSize = [mmToPoints(config.width), mmToPoints(config.height)] as const;
  const priceText = `${currency}${price}`;

  return (
    <Document>
      <Page size={pageSize} style={styles.page}>
        <PriceTagBody productName={productName} priceText={priceText} styles={styles} />
        <PriceTagBarcode
          value={barcodeValue}
          format={barcodeFormat}
          config={config}
          styles={styles}
        />
      </Page>
    </Document>
  );
}
