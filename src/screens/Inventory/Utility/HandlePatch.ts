import { Alert } from "react-native";
import { Inventory } from "../Hooks/useInventory";
import { mode } from "@utils/types";
import api from "@src";

type Props = {
  key_: number;
  setKey: (key: number) => void;
  setMode: (mode: mode) => void;
  setSubmit: (submit: boolean) => void;
  oldItem: Inventory;
  newItem: Inventory;
}

const HandlePatch = ({ key_, setKey, setMode, setSubmit, oldItem, newItem }: Props) => {
  if (newItem.location === oldItem.location) {
    Alert.alert('Error', 'Location must be different from the original location.');
  }
  if (newItem.quantity === oldItem.quantity) {
    api.patch('/api/inventory/' + oldItem.id, newItem)
      .then(_ => {
        setKey(key_ + 1);
        setSubmit(false);
        setMode('view');
      })
      .catch(err => {
        Alert.alert('Error', err.message);
      });
    return;
  }
  const { id: _, ...newData } = newItem;
  api.post('/api/inventory/', newData)
    .then(_ => {
      setKey(key_ + 1);
      setSubmit(false);
      setMode('view');
    })
    .catch(err => {
      Alert.alert('Error', err.message);
    });
  api.patch('/api/inventory/' + oldItem.id, { quantity: oldItem.quantity - newItem.quantity })
    .then(_ => {
      setKey(key_ + 1);
      setSubmit(false);
      setMode('view');
    })
    .catch(err => {
      Alert.alert('Error', err.message);
    });
  setSubmit(false);
}

export default HandlePatch;