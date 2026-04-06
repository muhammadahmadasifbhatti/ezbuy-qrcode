"use client";

import { Barcode } from "@/components/barcode";

interface PriceTagProps {
  imei: string;
  partNo: string;
}

export function PriceTag({ imei, partNo }: PriceTagProps) {
  return (
    <div className="flex flex-col gap-0.5 bg-white text-black w-fit print:w-[60mm] print:h-[30mm] print:p-[2mm]">
      <p className="text-[11px] font-bold leading-tight">
        IMEI: <span className="font-extrabold">{imei}</span>
      </p>
      <Barcode value={imei} height={30} width={1.2} />
      <p className="text-[10px] leading-tight">Part No: {partNo}</p>
    </div>
  );
}
