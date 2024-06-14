
import { mode } from "@utils/types";
import { FlatList, Text, View } from "react-native";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import HiddenTop from "@src/components/HiddenTop";
import { TextInput } from "react-native-paper";
import useProductLot, { ProductLot } from "@src/screens/ProductLot/Hooks/useProductLot";
import ProductLotListItem from "@src/screens/ProductLot/Components/ProductLotListItem";
import { useTheme } from "@src/context/ThemeContext";

type Props = {
  headerNode: ReactNode;
  setMode: Dispatch<SetStateAction<mode>>;
  setItem: (item: ProductLot) => void;
}

const ProductListView = ({ headerNode, setMode, setItem }: Props) => {
  const styles = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { result, error, isLoading } = useProductLot({});

  return (
    isLoading ? (
      <Text>Loading...</Text>
    ) : error ? (
      <Text>{error}</Text>
    ) : (
      <HiddenTop
        headerNode={
          <View style={{ width: '100%' }}>
            {headerNode}
          </View>
        }
        searchNode={
          <View style={styles.search_body}>
            <TextInput
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.search_input}
              textColor={styles.input_text.color}
            />
          </View>
        }
        finalHeight={100}
        contentNode={
          <FlatList
            style={{ width: '100%' }}
            data={result.filter((item) =>
              item.lot_number.includes(searchQuery) ||
              item.internal_reference.includes(searchQuery) ||
              item.product_name.includes(searchQuery)
            )}
            renderItem={({ item }) => (
              <ProductLotListItem
                listItem={item}
                setMode={setMode}
                setItem={setItem}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        }
      />
    )
  );
}

export default ProductListView;

