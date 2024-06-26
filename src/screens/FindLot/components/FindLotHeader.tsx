
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@screens";
import UserMenu from "@src/screens/User/components/UserMenu";
import { mode } from "@utils/types";
import { Dispatch, SetStateAction, useState } from "react";
import { Appbar, Menu } from "react-native-paper";
import { useTheme } from '@src/context/ThemeContext';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'FindLot'>;
  label: string;
  setMode: Dispatch<SetStateAction<mode>>;
  setKey: Dispatch<SetStateAction<number>>;
}

const FindLotHeader = ({ navigation, label, setMode }: Props) => {
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
          title="Lot View"
          onPress={() => {
            setMode('view');
            closeMenu();
          }}
        />
      </Menu>
      <Appbar.Content
        title={label}
        titleStyle={styles.header_title}
      />
      <UserMenu
        Appbar={Appbar}
        navigation={navigation}
      />
    </Appbar>
  );
}

export default FindLotHeader;
