import { ProductLot } from '../Hooks/useProductLot';
import { mode } from "@utils/types";
import { Card, Paragraph } from 'react-native-paper';
import styles from '@src/utils/styles';

type Props = {
  listItem: ProductLot;
  setMode: (mode: mode) => void;
  setItem: (item: ProductLot) => void;
}
const ProductListItem = ({ listItem, setMode, setItem }: Props) => {
  return (
    <Card
      style={styles.card_body}
      onPress={() => {
        setItem(listItem);
        setMode('edit');
      }}
    >
      <Card.Content style={styles.card_line}>
        <Paragraph style={styles.card_paragraph}>{listItem.lot_number}</Paragraph>
        <Paragraph style={styles.card_paragraph}>{listItem.product_name}</Paragraph>
      </Card.Content>
      <Card.Content style={styles.container}>
        <Paragraph style={styles.card_paragraph}>{listItem.internal_reference}</Paragraph>
        <Paragraph style={styles.card_paragraph}>{"Total: " + listItem.quantity}</Paragraph>
      </Card.Content>
    </Card>
  );
}

export default ProductListItem;

