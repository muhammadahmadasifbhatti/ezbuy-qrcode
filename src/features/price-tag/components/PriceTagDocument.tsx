import { Document, Page, View } from "@react-pdf/renderer";
import { ImeiRow, DetailRows } from "@/features/price-tag/components/PriceTagBody";
import { PriceTagBarcode } from "@/features/price-tag/components/PriceTagBarcode";
import { createPriceTagStyles } from "@/features/price-tag/components/PriceTagStyles";
import type { PriceTagProps } from "@/features/price-tag/types";
import { mmToPoints } from "@/features/price-tag/utils/mmToPoints";

export function PriceTagDocument({
  imei,
  modelNo,
  condition,
  barcodeFormat = "code128",
  config,
}: PriceTagProps) {
  const styles = createPriceTagStyles(config);
  const pageSize: [number, number] = [mmToPoints(config.width), mmToPoints(config.height)];

  return (
    <Document>
      <Page size={pageSize} style={styles.page}>
        {/* One label per page: clip anything that doesn't fit instead of
            spilling onto a second label. */}
        <View style={styles.content} wrap={false}>
          <ImeiRow imei={imei} styles={styles} />
          <PriceTagBarcode
            value={imei}
            format={barcodeFormat}
            styles={styles}
          />
          <DetailRows modelNo={modelNo} condition={condition} styles={styles} />
        </View>
      </Page>
    </Document>
  );
}
