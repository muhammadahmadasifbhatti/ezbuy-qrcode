"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { PriceTag } from "@/components/price-tag";
import { Button } from "@/components/ui/button";

function PrintContent() {
  const searchParams = useSearchParams();
  const imei = searchParams.get("imei") ?? "";
  const partNo = searchParams.get("partNo") ?? "";

  if (!imei || !partNo) {
    return (
      <p className="text-sm text-muted-foreground">Missing IMEI or Part No.</p>
    );
  }

  return <PriceTag imei={imei} partNo={partNo} />;
}

export default function PrintPage() {
  return (
    <div className="flex items-start justify-center min-h-screen bg-white p-4 print:p-0 print:m-0 print:block print:min-h-0">
      <div className="relative flex flex-col items-center">
        <button
          onClick={() => window.history.back()}
          className="cursor-pointer absolute -left-12 top-0 text-2xl text-gray-600 hover:text-black print:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
        </button>
        <Suspense
          fallback={<p className="text-sm text-muted-foreground">Loading...</p>}
        >
          <PrintContent />
        </Suspense>
        <Button
          onClick={() => window.print()}
          size="sm"
          className="mt-4 print:hidden"
        >
          Print
        </Button>
      </div>
    </div>
  );
}
