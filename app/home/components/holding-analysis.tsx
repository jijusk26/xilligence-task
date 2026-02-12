import { Colors } from "@/constants/colors";
import useTranslation from "@/hooks/use-translation";
import { HoldingData } from "@/types/mutual-funds";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HoldingAnalysis = ({ holdingData }: { holdingData: HoldingData[] }) => {
  const [showAll, setShowAll] = useState(false);
  const { t } = useTranslation();
  const displayHoldings = showAll ? holdingData : holdingData.slice(0, 6);

  return (
    <View style={styles.container}>
      <View style={styles.tableContainer}>
        <View style={styles.headerRow}>
          <Text style={[styles.headerText, styles.nameColumn]}>
            {t("holding.security_name")}
          </Text>
          <Text style={[styles.headerText, styles.valueColumn]}>
            {t("holding.value")}
          </Text>
          <Text style={[styles.headerText, styles.percentColumn]}>
            {t("holding.holding")}
          </Text>
        </View>
        {displayHoldings.map((holding, index) => (
          <View key={holding.id || index} style={styles.dataRow}>
            <Text
              style={[styles.dataText, styles.nameColumn]}
              numberOfLines={2}
            >
              {holding.Company_names}
            </Text>
            <Text style={[styles.dataText, styles.valueColumn]}>
              $ {(holding.holding_value / 90).toFixed()}
            </Text>
            <Text style={[styles.dataText, styles.percentColumn]}>
              {holding.holdings_percentages}
            </Text>
          </View>
        ))}
      </View>

      {holdingData.length > 6 && (
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => setShowAll(!showAll)}
          activeOpacity={0.7}
        >
          <Text style={styles.viewAllText}>
            {showAll ? t("common.show_less") : t("common.view_all_holdings")}
          </Text>
          <MaterialIcons
            name={showAll ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={20}
            color="#6fa287"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    paddingBottom: 0,
  },
  tableContainer: {
    backgroundColor: Colors.background,
  },
  headerRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingTop: 0,
  },
  headerText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: "500",
    textAlign: "left",
  },
  dataRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  dataText: {
    fontSize: 14,
    color: Colors.primaryText,
  },
  nameColumn: {
    flex: 2.5,
    fontWeight: "800",
  },
  valueColumn: {
    flex: 1.5,
    textAlign: "center",
  },
  percentColumn: {
    flex: 1,
    textAlign: "center",
  },
  viewAllButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    gap: 4,
  },
  viewAllText: {
    fontSize: 15,
    color: "#6fa287",
    fontWeight: "500",
  },
});

export default HoldingAnalysis;
