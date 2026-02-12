import BarChart, { type BarChartData } from "@/components/bar-chart";
import { Colors } from "@/constants/colors";
import useTranslation from "@/hooks/use-translation";
import { ReturnsBO } from "@/types/mutual-funds";
import React, { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ReturnAnalysis = ({
  lumpsumData,
  sipData,
}: {
  sipData: ReturnsBO[];
  lumpsumData: ReturnsBO[];
}) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<"sip" | "lumpsum">("lumpsum");

  const sipReturns: BarChartData[] = useMemo(() => {
    return sipData.map((d) => {
      return {
        label: d.month,
        value: Number(d.percentage),
      };
    });
  }, [sipData]);

  const lumpsumReturns: BarChartData[] = useMemo(() => {
    return lumpsumData.map((d) => {
      return {
        label: d.month,
        value: Number(d.percentage),
      };
    });
  }, [lumpsumData]);

  const currentData = selected === "sip" ? sipReturns : lumpsumReturns;

  return (
    <View style={{ width: "100%", paddingBottom: 20 }}>
      <View style={styles.tabWrqapper}>
        {[
          { label: t("return_analysis.point_to_point"), value: "lumpsum" },
          { label: t("return_analysis.sip_return"), value: "sip" },
        ].map((val) => {
          return (
            <TouchableOpacity
              activeOpacity={0.6}
              key={val.value}
              onPress={() => {
                setSelected(val.value as "sip" | "lumpsum");
              }}
              style={{
                ...styles.tabItem,
                backgroundColor:
                  selected === val.value ? Colors.primary : Colors.disabled,
              }}
            >
              <Text
                style={{
                  fontWeight: "600",
                  color:
                    selected !== val.value ? Colors.primary : Colors.disabled,
                  fontSize: 17,
                }}
              >
                {val.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <BarChart
        data={currentData}
        barColor={Colors.primary}
        animationKey={selected}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabWrqapper: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
    padding: 14,
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: 45,
  },
});

export default ReturnAnalysis;
