import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@screens";
import { mode } from "@src/utils/types";
import { Dispatch, SetStateAction, useState } from "react";
import { Appbar, Menu } from "react-native-paper";
import { Inventory } from "../Hooks/useInventory";
import { useTheme } from "@src/context/ThemeContext";

type Props = {
  setKey: Dispatch<SetStateAction<number>>;
  setMode: Dispatch<SetStateAction<mode>>;
  setItem: Dispatch<SetStateAction<Inventory>>;
  navigation: StackNavigationProp<RootStackParamList, 'Inventory'>;
}

const InventoryHeader = ({ setKey, setMode, setItem, navigation }: Props) => {
  const styles = useTheme();
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
        <Menu.Item
          title="Inventory View"
          onPress={() => {
            setMode('view');
            closeMenu();
          }}
        />
      </Menu>
      <Appbar.Content 
        title="Input product"
        titleStyle={styles.header_title}
      />
      <Appbar.Action icon="plus" onPress={() => {
        setMode('add');
        setItem({
          id: 0,
          lot_number: '',
          location: '',
          quantity: 0,
          created_at: new Date(),
          created_by: '',
          from_location: '',
          comments: '',
        });
      }} />
      <Appbar.Action icon="refresh" onPress={() => {
        setKey(prev => prev + 1);
      }} />
    </Appbar>
  )
}

export default InventoryHeader;
