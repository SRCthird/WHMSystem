import { StyleSheet, Text, View } from "react-native";
import { Log } from "../hooks/useLogs";
import moment from "moment";
import { Card } from "react-native-paper";

type Props = {
  log: Log
}

const LogListItem = ({ log }: Props) => {

  const formatDate = (date?: Date) => {
    const dt = moment(date);
    return dt.format('DD-MMM-YYYY HH:mm');
  }

  return (
    <Card style={styles.container} >
      <View style={styles.line}>
        <Text style={styles.text}>{log.lot_number}</Text>
        <Text style={styles.text}>{log.quantity_moved}</Text>
      </View>
      <View style={styles.line}>
        <Text style={styles.text}>{log.from_location}</Text>
        <Text style={styles.text}>to</Text>
        <Text style={styles.text}>{log.to_location}</Text>
      </View>
      <View style={styles.line}>
        <Text style={styles.text}>{log.user}</Text>
        <Text style={styles.text}>{formatDate(log.date_time)}</Text>
      </View>
      <View style={styles.comments}>
        <Text style={styles.text}>Comments:</Text>
      </View>
      <View style={styles.line}>
        <Text style={styles.text}>{log.comments}</Text>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  text: {
    fontSize: 16
  },
  container: {
    borderWidth: 1,
    borderColor: "#000",
    margin: 10,
  },
  comments: {
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  }
})

export default LogListItem;
