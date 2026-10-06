"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { TAG_LAYOUT } from "@/features/price-tag/layout";
import type { PriceTagProps } from "@/features/price-tag/types";
import { generateBarcode } from "@/features/price-tag/utils/generateBarcode";

// One label millimetre. The preview uses real CSS millimetres so the label
// on screen is the same physical size as the printed one.
const mm = (value: number) => `${value}mm`;

const formatInches = (valueMm: number) =>
  Number((valueMm / 25.4).toFixed(2)).toString();

const textStyle: CSSProperties = {
  fontSize: mm(TAG_LAYOUT.fontSize),
  lineHeight: TAG_LAYOUT.lineHeight,
};

const rowStyle: CSSProperties = {
  display: "flex",
  marginBottom: mm(TAG_LAYOUT.rowGap),
  whiteSpace: "pre",
};

/**
 * On-screen replica of PriceTagDocument. Uses the same layout values
 * (TAG_LAYOUT) and barcode image as the PDF, rendered at actual size.
 */
export function PriceTagPreview({
  imei,
  modelNo,
  condition,
  barcodeFormat = "code128",
  config,
}: PriceTagProps) {
  const barcode = useMemo(
    () => (imei ? generateBarcode(imei, barcodeFormat) : null),
    [imei, barcodeFormat],
  );

  const labelRef = useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = useState(false);
  useLayoutEffect(() => {
    const el = labelRef.current;
    if (el) setOverflows(el.scrollHeight > el.clientHeight + 1);
  }, [imei, modelNo, condition, config, barcode]);

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full overflow-x-auto">
        <div
          ref={labelRef}
          className="relative shrink-0 overflow-hidden bg-white text-black shadow-sm ring-1 ring-black/15"
          style={
            {
              width: mm(config.width),
              height: mm(config.height),
              padding: mm(config.padding),
              fontFamily: "Helvetica, Arial, sans-serif",
            } as CSSProperties
          }
        >
          <div style={rowStyle}>
            <span style={{ ...textStyle, fontWeight: 700 }}>IMEI: </span>
            <span style={textStyle}>{imei}</span>
          </div>

          <div style={{ marginTop: mm(TAG_LAYOUT.barcodeMarginTop) }}>
            {barcode ? (
              // eslint-disable-next-line @next/next/no-img-element -- data URL
              <img
                src={barcode}
                alt={`Barcode for ${imei}`}
                className="block w-full object-contain"
                style={{ height: mm(TAG_LAYOUT.barcodeHeight) }}
              />
            ) : imei ? (
              <span style={textStyle}>{imei}</span>
            ) : (
              <div
                className="rounded-[2px] border border-dashed border-black/25"
                style={{ height: mm(TAG_LAYOUT.barcodeHeight) }}
              />
            )}
          </div>

          <div style={rowStyle}>
            <span style={{ ...textStyle, fontWeight: 700 }}>Model No: </span>
            <span style={textStyle}>{modelNo}</span>
          </div>

          {condition ? (
            <div style={{ ...rowStyle, alignItems: "flex-start" }}>
              <span style={{ ...textStyle, fontWeight: 700, flexShrink: 0 }}>
                Condition:{" "}
              </span>
              <span
                style={{
                  ...textStyle,
                  flex: "1 1 0",
                  whiteSpace: "normal",
                  overflowWrap: "anywhere",
                }}
              >
                {condition}
              </span>
            </div>
          ) : null}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Shown at actual size: {formatInches(config.width)}&quot; ×{" "}
        {formatInches(config.height)}&quot; ({config.width.toFixed(1)} ×{" "}
        {config.height.toFixed(1)} mm). This is exactly what prints.
      </p>
      {overflows ? (
        <p className="text-xs text-destructive">
          Some text doesn&apos;t fit on this label size and will be cut off.
        </p>
      ) : null}
    </div>
  );
}
