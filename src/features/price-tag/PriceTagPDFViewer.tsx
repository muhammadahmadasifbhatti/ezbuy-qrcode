"use client";

import { PDFViewer } from "@react-pdf/renderer";
import { PriceTagDocument } from "@/features/price-tag/components/PriceTagDocument";
import type { PriceTagProps } from "@/features/price-tag/types";

export function PriceTagPDFViewer(props: PriceTagProps) {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    <PDFViewer width="100%" height={420}>
      <PriceTagDocument {...props} />
    </PDFViewer>
  );
}
