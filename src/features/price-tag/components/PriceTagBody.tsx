import { Text, View } from "@react-pdf/renderer";
import type { PriceTagStyles } from "@/features/price-tag/components/PriceTagStyles";

type RowStyles = Pick<PriceTagStyles, "row" | "label" | "value">;

function Row({ label, value, styles }: { label: string; value: string; styles: RowStyles }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}: </Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export function ImeiRow({ imei, styles }: { imei: string; styles: RowStyles }) {
  return <Row label="IMEI" value={imei} styles={styles} />;
}

export function DetailRows({
  modelNo,
  condition,
  styles,
}: {
  modelNo: string;
  condition?: string;
  styles: RowStyles;
}) {
  return (
    <>
      <Row label="Model No" value={modelNo} styles={styles} />
      {condition ? <Row label="Condition" value={condition} styles={styles} /> : null}
    </>
  );
}
