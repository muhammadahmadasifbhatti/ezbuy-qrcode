"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { PriceTagDocument } from "@/features/price-tag/components/PriceTagDocument";
import type { PriceTagProps } from "@/features/price-tag/types";

export function PriceTagDownloadButton(props: PriceTagProps) {
  const fileName = `price-tag-${props.imei}.pdf`;

  return (
    <PDFDownloadLink
      document={<PriceTagDocument {...props} />}
      fileName={fileName}
    >
      {({ loading }) => (
        <Button size="sm">{loading ? "Preparing PDF…" : "Download price tag PDF"}</Button>
      )}
    </PDFDownloadLink>
  );
}
