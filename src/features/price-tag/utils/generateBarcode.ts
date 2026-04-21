import bwipjs from "bwip-js";

export type BwipOptions = {
  scale?: number;
  height?: number;
  includetext?: boolean;
  textxalign?: "left" | "center" | "right";
};

export function generateBarcode(
  value: string,
  format: string,
  options: Partial<BwipOptions> = {},
): string | null {
  if (typeof window === "undefined") return null;

  try {
    const canvas = document.createElement("canvas");
    bwipjs.toCanvas(canvas, {
      bcid: format,
      text: value,
      scale: 2,
      height: 6,
      includetext: false,
      ...options,
    });

    return canvas.toDataURL("image/png");
  } catch {
    return null;
  }
}
