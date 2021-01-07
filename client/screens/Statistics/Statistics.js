import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from "react-native-chart-kit";
import axios from "axios";
import { API } from "../../env.js";
import { Card, ListItem, Button, Icon, Avatar } from "react-native-elements";

export default function Statistics({ navigation }) {
  // const [saldo, setSaldo] = useState([]);
  const [gastos, setGastos] = useState([0, 0, 0, 0, 0, 0]);
  const [labels, setLabels] = useState([
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
    "Ene",
  ]);

  useEffect(() => {
    axios
      .get(`${API}/api/accounts/movMesEg`) // trae de la bd todos los gastos del usuario
      .then(({ data }) => {
        setGastos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   AsyncStorage.getItem("@localUser")
  //   .then((data) => {
  //     const id= JSON.parse(data).id;
  //   axios
  //     .get(`${API}/api/accounts/movMesEg`, id) // trae de la bd todos los gastos del usuario
  //     .then(({ data }) => {
  //       setGastos(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   })
  //  },[]);

  console.log(gastos);

  const handleMovDiaEg = () => {
    axios
      .get(`${API}/api/accounts/movDiaEg`)
      .then(({ data }) => {
        console.log("DATA=", data);
        setLabels(new Array(30).fill("."));
        setGastos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMovSemEg = () => {
    axios
      .get(`${API}/api/accounts/movSemEg`)
      .then(({ data }) => {
        console.log("DATASEM=", data);
        setGastos(data);
        setLabels(new Array(12).fill("."));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMovMesEg = () => {
    axios
      .get(`${API}/api/accounts/movMesEg`)
      .then(({ data }) => {
        setLabels(["Ago", "Sep", "Oct", "Nov", "Dic", "Ene"]);
        setGastos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const element = [];

  console.log("Gastos =", gastos);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text>MIS GASTOS</Text>
      </View>

      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: gastos,
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#4DBAF4",
          backgroundGradientTo: "#0FEA2D",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      <View>
        <Button
          type="outline"
          title="Mensual"
          style={styles.boton}
          onPress={handleMovMesEg}
        />
        <Button
          type="outline"
          title="Semanal"
          style={styles.boton}
          onPress={handleMovSemEg}
        />
        <Button
          type="outline"
          title="Diario"
          style={styles.boton}
          onPress={handleMovDiaEg}
        //´${handler}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#fff",
  },
  container: {
    marginTop: 100,
  },
  text: {
    fontSize: 42,
  },
  title: {
    fontSize: 20,
    marginHorizontal: 20,
    textAlign: "center",
    marginTop: 5,
    opacity: 0.4,
  },
  input: {
    flexDirection: "column",
    marginRight: 20,
    marginLeft: 20,
    height: 50,
    color: "#000000",
    alignItems: "center",
    borderWidth: 3,
    marginTop: 25,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#00aae4",
    paddingVertical: 2,
  },
  button: {
    marginHorizontal: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#00aae4",
    paddingVertical: 10,
    borderRadius: 10,
  },
  innerText: {
    color: "white",
  },
});