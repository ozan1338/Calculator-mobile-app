import { StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

export default function CalculatorScreen() {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const btnValue = [
    [1, 2, "-", "+"],
    [3, 4, "/", "*"],
    [5, 6, "%", "="],
    [7, 8, 9, 0],
  ];

  const handlePress = (item) => {
    item === "+" || item === "*" || item === "/" || item === "-"
      ? signHandler(item)
      : item === "%"
      ? percentHandler()
      : item === "="
      ? equalHandler()
      : numHandler(item);
  };

  const numHandler = (item) => {
    const value = String(item);

    setCalc({
      ...calc,
      num: calc.num === 0 ? value === "0" ? 0 : value : calc.num + value,
      res: !calc.sign ? 0 : calc.res,
    });
  };

  const signHandler = (item) => {
    const sign = item;

    setCalc({
      ...calc,
      sign,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "*"
          ? a * b
          : a / b;

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? alert("can't divide with 0")
            : math(Number(calc.res), Number(calc.num), calc.sign),
        sign: "",
        num: 0,
      });
    }
  };

  const percentHandler = () => {
      let num = calc.num ? parseFloat(calc.num) : 0;
      let res = calc.res ? parseFloat(calc.res) : 0;

      setCalc({
          ...calc,
          num: (num /= Math.pow(100,1)),
          res: (res /= Math.pow(100,1)),
          sign: "",
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Display</Text>
      <TextInput
        value={calc.num ? String(calc.num) : String(calc.res)}
        editable={false}
        style={styles.textInput}
      />
      <View style={styles.buttonContainer}>
        {btnValue.flat().map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handlePress(item)}
              style={
                typeof item === "string"
                  ? styles.buttonOperator
                  : styles.buttonNumber
              }
            >
              <Text style={styles.buttonText}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 0.7,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  textInput: {
    borderWidth: 1,
    width: 310,
    height: 90,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: "#fff",
    borderColor: "#fff",
    paddingLeft: 10,
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  buttonOperator: {
    width: 65,
    height: 65,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#930707",
    marginTop: 10,
  },
  buttonNumber: {
    width: 65,
    height: 65,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF5757",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    lineHeight: 60,
  },
});
