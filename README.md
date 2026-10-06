# EzBuy Price Tag Generator

Single-page Next.js app for printing phone price tags. Pick a label size,
enter the IMEI, Model No and Condition, check the live preview and hit
**Print**.

- Label sizes (inches): `2 × 1`, `2.4 × 1` — defined in
  `src/features/price-tag/layout.ts`.
- The IMEI barcode (Code 128) is generated on the fly with `bwip-js`.
- Printing renders a PDF sized exactly to the label with
  `@react-pdf/renderer` and opens the browser's print dialog. The on-screen
  preview uses the same layout values (`TAG_LAYOUT`), so it matches the print.

## Development

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm lint
pnpm build
```
