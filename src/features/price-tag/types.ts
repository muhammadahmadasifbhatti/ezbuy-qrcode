export interface PriceTagConfig {
  width: number;
  height: number;
  padding: number;
}

export interface PriceTagProps {
  productName: string;
  price: number;
  currency: string;
  barcodeValue: string;
  barcodeFormat?: string;
  config: PriceTagConfig;
}
