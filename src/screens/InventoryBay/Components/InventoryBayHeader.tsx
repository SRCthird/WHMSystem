import { Appbar, Menu } from "react-native-paper";
import { Dispatch, SetStateAction, useState } from "react";
import { mode } from "@src/utils/types";
import { InventoryBay } from "../Hooks/useInventoryBay";
import { RootStackParamList } from "@screens";
import { StackNavigationProp } from "@react-navigation/stack";
import styles from "@src/utils/styles";

type Props = {
  title: string;
  setKey: Dispatch<SetStateAction<number>>;
  setMode: Dispatch<SetStateAction<mode>>;
  setItem: Dispatch<SetStateAction<InventoryBay>>;
  navigation: StackNavigationProp<RootStackParamList, 'InventoryBay'>;
}

const InventoryBayHeader = ({ title, setKey, setMode, setItem, navigation }: Props) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <Appbar style={styles.header_bar}>
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <Appbar.Action icon="menu" color={styles.accents.color} onPress={openMenu} />
        }
      >
        <Menu.Item
          title="Home"
          onPress={() => {
            navigation.navigate('Actions');
            closeMenu();
          }}
        />
      </Menu>
      <Appbar.Content
        title={title}
        titleStyle={styles.header_title}
      />
      <Appbar.Action icon="plus" onPress={() => {
        setMode('add');
        setItem({
          id: 0,
          name: '',
          warehouse_name: '',
          max_unique_lots: 0,
        });
      }} />
      <Appbar.Action icon="refresh" onPress={() => {
        setKey(prev => prev + 1);
      }} />
    </Appbar>
  )
}

export default InventoryBayHeader;
