import { createStackNavigator } from '@react-navigation/stack';
import Home from '@screens/Home/Home';
import Product from '@screens/Product';
import ProductLot from '@screens/ProductLot';
import Warehouse from '@screens/Warehouse';
import InventoryBay from '@screens/InventoryBay';

export type RootStackParamList = {
  Actions: undefined;
  Product: undefined;
  ProductLot: undefined;
  Warehouse: undefined;
  InventoryBay: undefined;
}

const Stack = createStackNavigator();

const index = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Actions" component={Home} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="ProductLot" component={ProductLot} />
      <Stack.Screen name="Warehouse" component={Warehouse} />
      <Stack.Screen name="InventoryBay" component={InventoryBay} />
    </Stack.Navigator>
  );
}

export default index;
