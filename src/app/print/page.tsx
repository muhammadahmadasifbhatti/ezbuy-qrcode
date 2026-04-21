"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BackButton } from "@/components/back-button";
import {
  DEFAULT_PRICE_TAG_CONFIG,
  PriceTagDownloadButton,
  PriceTagPDFViewer,
} from "@/features/price-tag";

function PrintContent() {
  const searchParams = useSearchParams();
  const barcodeValue = searchParams.get("imei") ?? "";
  const productName = searchParams.get("modelNo") ?? "";
  const price = Number(searchParams.get("price") ?? "0");
  const currency = searchParams.get("currency") ?? "$";

  if (!barcodeValue || !productName) {
    return <p className="text-sm text-muted-foreground">Missing IMEI or Model No.</p>;
  }

  const props = {
    barcodeValue,
    productName,
    price,
    currency,
    config: DEFAULT_PRICE_TAG_CONFIG,
  };

  return (
    <div className="flex w-full max-w-3xl flex-col gap-4">
      <PriceTagPDFViewer {...props} />
      <PriceTagDownloadButton {...props} />
    </div>
  );
}

export default function PrintPage() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-white p-4">
      <div className="relative flex w-full flex-col items-center gap-4">
        <BackButton />
        <Suspense fallback={<p className="text-sm text-muted-foreground">Loading...</p>}>
          <PrintContent />
        </Suspense>
      </div>
    </div>
  );
}
