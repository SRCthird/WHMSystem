import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@screens";
import { mode } from "@src/utils/types";
import { Dispatch, SetStateAction, useState } from "react";
import { Appbar, Menu } from "react-native-paper";

type Props = {
  label: string;
  setKey: Dispatch<SetStateAction<number>>;
  setMode: Dispatch<SetStateAction<mode>>;
  navigation: StackNavigationProp<RootStackParamList, 'Log'>;
}

const LogHeader = ({ label, setKey, setMode, navigation }: Props) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <Appbar style={{
      height: 80,
      width: '100%',
      paddingTop: 25,
    }}>
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <Appbar.Action icon="menu" color="grey" onPress={openMenu} />
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
          title="View logs"
          onPress={() => {
            setMode('view');
            closeMenu();
          }}
        />
      </Menu>
      <Appbar.Content title={label} />
      <Appbar.Action icon="refresh" onPress={() => {
        setKey(prev => prev + 1);
      }} />
    </Appbar>
  )
}

export default LogHeader;