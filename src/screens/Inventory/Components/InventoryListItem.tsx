import { Inventory } from '../Hooks/useInventory';
import { mode } from "@utils/types";
import { useEffect, useState } from 'react';
import moment from 'moment';
import { Caption, Card, Paragraph } from 'react-native-paper';
import styles from '@src/utils/styles';
import { api } from '@src/screens/Authenticate/Login';

type Props = {
  listItem: Inventory;
  setMode: (mode: mode) => void;
  setItem: (item: Inventory) => void;
}
const InventoryListItem = ({ listItem, setMode, setItem }: Props) => {
  const [edited, setEdited] = useState(false);
  const [product, setProduct] = useState("")

  useEffect(() => {
    if (formatDate(listItem.updated_at) !== "Invalid date") {
      setEdited(true);
    }
    api.get(`/api/product-lot/?lot_number=${listItem.lot_number}`)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data[0].product_name);
      })
  }, []);

  const formatDate = (date?: Date) => {
    const dt = moment(date);
    return dt.format('DD-MMM-YYYY HH:mm');
  }

  return (
    <Card
      style={styles.card_body}
      onPress={() => {
        setItem(listItem);
        setMode('edit');
      }}
    >
      <Card.Title
        titleStyle={styles.header_title}
        title={listItem.lot_number}
        subtitleStyle={styles.header_title}
        subtitle={product}
      />
      <Card.Content>
        <Paragraph style={styles.header_title}>Quantity: {listItem.quantity}</Paragraph>
        <Caption style={styles.header_title}>{edited ? "Created at: " : "Updated at: "} {formatDate(listItem.updated_at ?? listItem.created_at)}</Caption>
        <Caption style={styles.header_title}>{edited ? "Created by: " : "Updated by: "} {listItem.updated_by ?? listItem.created_by}</Caption>
      </Card.Content>
    </Card>
  );
}

export default InventoryListItem;

