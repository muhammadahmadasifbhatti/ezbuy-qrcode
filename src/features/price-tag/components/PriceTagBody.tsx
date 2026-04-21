import { Text, View } from "@react-pdf/renderer";

interface PriceTagBodyProps {
  productName: string;
  priceText: string;
  styles: {
    body: object;
    productName: object;
    price: object;
  };
}

export function PriceTagBody({ productName, priceText, styles }: PriceTagBodyProps) {
  return (
    <View style={styles.body}>
      <Text style={styles.productName}>{productName}</Text>
      <Text style={styles.price}>{priceText}</Text>
    </View>
  );
}
