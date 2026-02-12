import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/colors";
import useTranslation from "@/hooks/use-translation";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const RiskoMeter = ({ risk }: { risk: string }) => {
  const { t } = useTranslation();
  const riskometerData = [
    {
      label: t("riskometer.low"),
      color: Colors.primary,
    },
    {
      label: t("riskometer.low_moderate"),
      color: Colors.low_moderate,
    },
    {
      label: t("riskometer.moderate"),
      color: Colors.moderate,
    },
    {
      label: t("riskometer.moderatly_high"),
      color: Colors.moderate_high,
    },
    {
      label: t("riskometer.high"),
      color: Colors.high,
    },
  ];

  const riskFactor = useMemo(() => {
    return riskometerData.find((rm) => rm.label === risk) || riskometerData[0];
  }, [risk]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        {riskometerData.map((rm) => (
          <View style={styles.colorWrapper}>
            <View style={{ height: 14, backgroundColor: rm.color }}></View>
            <View style={styles.alignCenter}>
              <Text style={styles.riskText}>{rm.label}</Text>
            </View>
          </View>
        ))}
      </View>
      <Text style={styles.infoText}>{t("riskometer.info")}</Text>
      <View style={styles.alignCenter}>
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: riskFactor.color }}
        >
          <ThemedText style={styles.buttonText}>{risk} Risk</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", padding: 6, gap: 10, paddingBottom: 15 },
  buttonText: { fontWeight: "600", fontSize: 15 },
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  infoText: {
    textAlign: "center",
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
    marginVertical: 10,
  },
  colorWrapper: { flex: 1, gap: 10 },
  alignCenter: { justifyContent: "center", alignItems: "center" },
  riskText: {
    textAlign: "center",
    fontSize: 10,
    color: "#000",
    fontWeight: "800",
  },
});
export default RiskoMeter;
