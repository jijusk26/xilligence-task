import LineChart, { LineChartDataPoint } from "@/components/line-chart";
import { Colors } from "@/constants/colors";
import useTranslation from "@/hooks/use-translation";
import { MfScheme, NavHistory } from "@/types/mutual-funds";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import moment from "moment";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CHART_WIDTH = SCREEN_WIDTH - 60;

interface ReturnsProps {
  navData: NavHistory[];
  fund: MfScheme;
}

const Returns: React.FC<ReturnsProps> = ({ navData, fund }) => {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState("1M");
  const [selectedPoint, setSelectedPoint] = useState<{
    value: number;
    date: string;
  } | null>(null);

  const periods = [
    { label: "1M", months: 1 },
    { label: "3M", months: 3 },
    { label: "6M", months: 6 },
    { label: "1Y", months: 12 },
    { label: "3Y", months: 36 },
    { label: "5Y", months: 60 },
  ];

  const filteredData = useMemo(() => {
    const selectedPeriodData = periods.find((p) => p.label === selectedPeriod);
    if (!selectedPeriodData || !navData || navData.length === 0) return navData;

    const monthsToFilter = selectedPeriodData.months;
    const cutoffDate = moment().subtract(monthsToFilter, "months");

    return navData.filter((item) => moment(item.nav_date).isAfter(cutoffDate));
  }, [selectedPeriod, navData]);

  const chartData: LineChartDataPoint[] = useMemo(() => {
    if (!filteredData || filteredData.length === 0) return [];

    return filteredData.map((item) => ({
      value: item.nav,
      date: item.nav_date,
      label: moment(item.nav_date).format("DD MMM"),
    }));
  }, [filteredData]);

  const calculateReturn = () => {
    if (!filteredData || filteredData.length < 2) return "0.00";
    const firstNav = filteredData[0].nav;
    const lastNav = filteredData[filteredData.length - 1].nav;
    const returnPercentage = ((lastNav - firstNav) / firstNav) * 100;
    return returnPercentage.toFixed(2);
  };

  const currentNav = useMemo(() => {
    if (selectedPoint) {
      return selectedPoint;
    }
    if (filteredData && filteredData.length > 0) {
      const lastItem = filteredData[filteredData.length - 1];
      return {
        value: lastItem.nav,
        date: lastItem.nav_date,
      };
    }
    return { value: 0, date: new Date().toISOString() };
  }, [selectedPoint, filteredData]);

  const returnValue = calculateReturn();
  const isPositive = parseFloat(returnValue) >= 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{t("return_analysis.title")}</Text>
          <View style={styles.returnRow}>
            <Text
              style={[
                styles.returnValue,
                { color: isPositive ? Colors.primary : "#F44336" },
              ]}
            >
              {isPositive ? "+" : ""}
              {returnValue}%
            </Text>
            <Text style={styles.periodLabel}>
              {selectedPeriod} {t("return_analysis.return")}
            </Text>
          </View>
        </View>
        <View style={styles.navContainer}>
          <View style={styles.navContent}>
            <View style={styles.navIndicator} />
            <View>
              <Text style={styles.navLabel}>
                {t("fund_info.nav")}:₹{currentNav.value.toFixed(2)}
              </Text>
              <Text style={styles.dateLabel}>
                {moment(currentNav.date).format("DD MMM'YY")}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {chartData.length > 0 && (
        <View style={styles.chartContainer}>
          <View style={styles.chartWrapper}>
            {selectedPoint && (
              <View style={styles.floatingDate}>
                <Text style={styles.floatingDateText}>
                  {moment(selectedPoint.date).format("DD MMM'YY")}
                </Text>
              </View>
            )}
            <LineChart
              data={chartData}
              width={CHART_WIDTH}
              height={200}
              lineColor={Colors.primary}
              gradientColors={["#6fa28740", "#6fa28710"]}
              strokeWidth={2.5}
              onPointSelected={(point) => {
                if (point) {
                  setSelectedPoint({
                    value: point.value,
                    date: point.date,
                  });
                } else {
                  setSelectedPoint(null);
                }
              }}
            />
          </View>
        </View>
      )}

      <View style={styles.periodSelector}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period.label}
            style={[
              styles.periodButton,
              selectedPeriod === period.label && styles.periodButtonActive,
            ]}
            onPress={() => {
              setSelectedPeriod(period.label);
              setSelectedPoint(null);
            }}
          >
            <Text
              style={[
                styles.periodButtonText,
                selectedPeriod === period.label &&
                  styles.periodButtonTextActive,
              ]}
            >
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.minAmounts}>
        <View style={styles.minAmountItem}>
          <Text style={styles.minAmountLabel}>
            {t("fund_info.nav")}:{" "}
            {moment(fund.latest_nav_date, "YYYY-MM-DD").format(" DD  MMM'YY")}
          </Text>
          <Text style={styles.minAmountValue}>₹ {fund.latest_nav}</Text>
        </View>
        <View style={styles.minAmountItem}>
          <Text style={styles.minAmountLabel}>
            {t("return_analysis.rating")}
          </Text>
          <Text style={styles.minAmountValue}>
            {fund.fund_rating}
            <MaterialIcons name="star" size={14} style={{ marginLeft: 5 }} />
          </Text>
        </View>
      </View>
      <View style={styles.minAmounts}>
        <View style={styles.minAmountItem}>
          <Text style={styles.minAmountLabel}>
            {t("return_analysis.min_one_time_amount")}
          </Text>
          <Text style={styles.minAmountValue}>₹ {fund.min_lumpsum_amount}</Text>
        </View>
        <View style={styles.minAmountItem}>
          <Text style={styles.minAmountLabel}>
            {t("return_analysis.min_sip_amount")}
          </Text>
          <Text style={styles.minAmountValue}>₹ {fund.min_sip_amount}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 14,
    borderWidth: 1,
    borderColor: Colors.disabled,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.primaryText,
    marginBottom: 4,
  },
  returnRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  returnValue: {
    fontSize: 24,
    fontWeight: "700",
  },
  periodLabel: {
    fontSize: 14,
    color: "#999",
    fontWeight: "500",
  },
  navContainer: {
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 8,
  },
  navContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  navIndicator: {
    width: 8,
    height: 8,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  navLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.primaryText,
  },
  dateLabel: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  chartContainer: {
    width: "100%",
    height: 220,
    marginBottom: 16,
    paddingVertical: 10,
  },
  chartWrapper: {
    position: "relative",
    width: "100%",
  },
  floatingDate: {
    position: "absolute",
    top: 0,
    right: 10,
    zIndex: 10,
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  floatingDateText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#999",
  },
  periodSelector: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    flexWrap: "wrap",
  },
  periodButton: {
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    flex: 1,
  },
  periodButtonActive: {
    backgroundColor: Colors.primary,
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primaryText,
  },
  periodButtonTextActive: {
    color: "#fff",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  oneTimeButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#C8E6D9",
    alignItems: "center",
  },
  oneTimeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
  },
  sipButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  sipButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  minAmounts: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 10,
  },
  minAmountItem: {
    flex: 1,
  },
  minAmountLabel: {
    fontSize: 13,
    color: "#999",
    marginBottom: 4,
  },
  minAmountValue: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.primaryText,
  },
});

export default Returns;
