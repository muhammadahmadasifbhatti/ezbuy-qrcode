"use client";

import { Barcode } from "@/components/barcode";

interface PriceTagProps {
  imei: string;
  modelNo: string;
  condition?: string;
}

export function PriceTag({ imei, modelNo, condition }: PriceTagProps) {
  return (
    <div
      data-slot="price-tag"
      className="flex flex-col gap-0.5 bg-white text-black w-fit"
    >
      <p className="text-[11px] font-bold leading-tight">
        IMEI: <span className="font-extrabold">{imei}</span>
      </p>
      <Barcode value={imei} height={30} width={1.2} />
      <p className="text-[10px] leading-tight">Model No: {modelNo}</p>
      {condition && (
        <p className="text-[10px] leading-tight max-w-[200px] print:max-w-none wrap-break-words">
          Condition: {condition}
        </p>
      )}
    </div>
  );
}
