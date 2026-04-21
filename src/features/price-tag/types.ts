export interface PriceTagConfig {
  width: number;
  height: number;
  padding: number;
}

export interface PriceTagProps {
  imei: string;
  modelNo: string;
  condition?: string;
  barcodeFormat?: string;
  config: PriceTagConfig;
}
