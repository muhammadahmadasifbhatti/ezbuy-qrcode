export interface PriceTagConfig {
  width: number;
  height: number;
  padding: number;
}

export interface PriceTagProps {
  serial: string;
  modelNo: string;
  condition?: string;
  barcodeFormat?: string;
  config: PriceTagConfig;
}
