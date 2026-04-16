"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PriceTag } from "@/components/price-tag";
import { BackButton } from "@/components/back-button";
import { PrintSettingsDialog } from "@/components/print-settings-dialog";

function PrintContent() {
  const searchParams = useSearchParams();
  const imei = searchParams.get("imei") ?? "";
  const modelNo = searchParams.get("modelNo") ?? "";
  const condition = searchParams.get("condition") ?? "";

  if (!imei || !modelNo) {
    return (
      <p className="text-sm text-muted-foreground">Missing IMEI or Model No.</p>
    );
  }

  return <PriceTag imei={imei} modelNo={modelNo} condition={condition} />;
}

export default function PrintPage() {
  return (
    <div className="flex items-start justify-center min-h-screen bg-white p-4 print:p-0 print:m-0 print:block print:min-h-0">
      <div className="relative flex flex-col items-center">
        <BackButton />
        <Suspense
          fallback={<p className="text-sm text-muted-foreground">Loading...</p>}
        >
          <PrintContent />
        </Suspense>
        <PrintSettingsDialog />
      </div>
    </div>
  );
}
