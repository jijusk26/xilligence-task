import PieChart, { PieChartData } from "@/components/pie-chart";
import { AssetAllocation, SectorDetail } from "@/types/mutual-funds";
import React, { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Colors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#4c4ce3",
  "#c2b638",
  "#29c3e6",
  "#151757",
  "#891b1b",
  "#b72782",
  "#2ec620",
  "#9cd60b",
];

const AllocationAnalysis = ({
  AssetData,
  SectorData,
}: {
  AssetData: AssetAllocation[];
  SectorData: SectorDetail[];
}) => {
  const [selected, setSelected] = useState<"asset" | "sector">("asset");
  const assetData: PieChartData[] = useMemo(() => {
    return AssetData.map((as, index) => {
      return {
        value: as.asset_percentage,
        color: Colors[index],
        label: as.asset_name,
      };
    });
  }, [AssetData]);

  const sectorData: PieChartData[] = useMemo(() => {
    return SectorData.map((as, index) => {
      return {
        value: as.percentage_assets,
        color: Colors[index],
        label: as.sector_name,
      };
    });
  }, [SectorData]);

  return (
    <View style={styles.container}>
      <View style={styles.tabWrqapper}>
        {[
          { label: "Asset Class", value: "asset" },
          { label: "Sector", value: "sector" },
        ].map((val) => {
          return (
            <TouchableOpacity
              activeOpacity={0.6}
              key={val.value}
              onPress={() => {
                setSelected(val.value as "asset" | "sector");
              }}
              style={{
                ...styles.tabItem,
                borderBottomColor: selected === val.value ? "green" : "#D3D3D3",
              }}
            >
              <Text style={{ fontWeight: "600", color: "#000", fontSize: 17 }}>
                {val.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.analysisContentContainer}>
        <View style={styles.pieChartWrapper}>
          <PieChart
            data={selected === "asset" ? assetData : sectorData}
            size={120}
            innerRadius={0.8}
            showLabels={false}
            animationDuration={1200}
          />
        </View>
        <View
          style={{
            ...styles.pieChartWrapper,
            gap: 4,
            paddingRight: 5,
          }}
        >
          {(selected === "asset" ? assetData : sectorData).map((da) => {
            return (
              <View key={da.color + da.label} style={styles.legentContainer}>
                <View style={styles.legendBadgeWrapper}>
                  <View
                    style={{ ...styles.badge, backgroundColor: da.color }}
                  />
                  <Text style={styles.percentText}>{da.value}%</Text>
                </View>
                <Text
                  style={styles.label}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {da.label}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%" },
  tabWrqapper: { height: 50, flexDirection: "row" },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  pieChartWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  analysisContentContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    gap: 10,
  },
  legentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendBadgeWrapper: {
    flexDirection: "row",
    gap: 6,
    flex: 4,
    alignItems: "center",
  },
  badge: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  percentText: {
    color: "#000",
    fontWeight: "600",
  },
  label: {
    flex: 5,
    color: "#000",
    fontWeight: "600",
  },
});

export default AllocationAnalysis;
