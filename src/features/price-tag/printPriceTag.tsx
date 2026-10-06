import type { PriceTagProps } from "@/features/price-tag/types";

const FRAME_ID = "price-tag-print-frame";

/**
 * Renders the price tag PDF and opens the browser's print dialog for it
 * without leaving the page. Falls back to opening the PDF in a new tab when
 * the browser can't print from a hidden frame.
 */
export async function printPriceTag(props: PriceTagProps) {
  const [{ pdf }, { PriceTagDocument }] = await Promise.all([
    import("@react-pdf/renderer"),
    import("@/features/price-tag/components/PriceTagDocument"),
  ]);

  const blob = await pdf(<PriceTagDocument {...props} />).toBlob();
  const url = URL.createObjectURL(blob);

  const previous = document.getElementById(FRAME_ID) as HTMLIFrameElement | null;
  if (previous) {
    URL.revokeObjectURL(previous.src);
    previous.remove();
  }

  const frame = document.createElement("iframe");
  frame.id = FRAME_ID;
  frame.style.cssText =
    "position:fixed;right:0;bottom:0;width:0;height:0;border:0;";
  frame.onload = () => {
    try {
      frame.contentWindow?.focus();
      frame.contentWindow?.print();
    } catch {
      window.open(url, "_blank");
    }
  };
  frame.src = url;
  document.body.appendChild(frame);
}
