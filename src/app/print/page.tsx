"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";
import {
  PriceTagDownloadButton,
  PriceTagPDFViewer,
} from "@/features/price-tag";
import type { PriceTagConfig } from "@/features/price-tag";
import { PrintSizeDialog } from "@/features/price-tag/components/PrintSizeDialog";

const DEFAULT_PADDING = 3;

function PrintContent() {
  const searchParams = useSearchParams();
  const imei = searchParams.get("imei") ?? "";
  const modelNo = searchParams.get("modelNo") ?? "";
  const condition = searchParams.get("condition") ?? undefined;

  const [dialogOpen, setDialogOpen] = useState(true);
  const [config, setConfig] = useState<PriceTagConfig | null>(null);

  if (!imei || !modelNo) {
    return <p className="text-sm text-muted-foreground">Missing IMEI or Model No.</p>;
  }

  const handleConfirm = (widthMm: number, heightMm: number) => {
    setConfig({ width: widthMm, height: heightMm, padding: DEFAULT_PADDING });
    setDialogOpen(false);
  };

  if (!config) {
    return (
      <>
        <PrintSizeDialog
          open={dialogOpen}
          onConfirm={handleConfirm}
          onCancel={() => setDialogOpen(true)}
        />
        <p className="text-sm text-muted-foreground">
          Choose a print size to continue.
        </p>
      </>
    );
  }

  const props = { imei, modelNo, condition, config };

  return (
    <div className="flex w-full max-w-3xl flex-col gap-4">
      <PriceTagPDFViewer {...props} />
      <div className="flex gap-2">
        <PriceTagDownloadButton {...props} />
        <Button variant="outline" size="sm" onClick={() => { setConfig(null); setDialogOpen(true); }}>
          Change Size
        </Button>
      </div>
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
