import { Colors } from "@/constants/colors";
import useTranslation from "@/hooks/use-translation";
import { AnalyticsData } from "@/types/mutual-funds";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

interface AnalyticsMetric {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  value?: string | number;
  description: string;
}

interface AnalyticsItem {
  beta: AnalyticsMetric;
  stdDeviation: AnalyticsMetric;
  sharpeRatio: AnalyticsMetric;
  alpha: AnalyticsMetric;
  sortinoRatio: AnalyticsMetric;
  downCapture: AnalyticsMetric;
  stdDeviationLow: AnalyticsMetric;
  upCapture: AnalyticsMetric;
  informationRatio: AnalyticsMetric;
}

interface AnalyticsProps {
  data?: AnalyticsData;
}

const Analytics: React.FC<AnalyticsProps> = ({ data }) => {
  const { t } = useTranslation();
  const analyticsData: AnalyticsItem = useMemo(() => {
    return {
      beta: {
        icon: "show-chart",
        title: t("analytics.beta"),
        value: data?.beta,
        description: t("analytics.betaDescription"),
      },
      stdDeviation: {
        icon: "bar-chart",
        title: t("analytics.std_deviation"),
        value: data?.standard_deviation + "%",
        description: t("analytics.std_deviation_description"),
      },
      sharpeRatio: {
        icon: "percent",
        title: t("analytics.sharp_ratio"),
        value: data?.sharpe_ratio,
        description: t("analytics.sharp_ratio_description"),
      },
      alpha: {
        icon: "functions",
        title: t("analytics.alpha"),
        value: data?.alpha,
        description: t("analytics.alpha_description"),
      },
      sortinoRatio: {
        icon: "trending-up",
        title: t("analytics.sort_ratio"),
        value: data?.sortino_ratio,
        description: t("analytics.sort_ratio_description"),
      },
      downCapture: {
        icon: "arrow-downward",
        title: t("analytics.down_capture"),
        value: data?.Drawdown_1Y + "-" + data?.Drawdown_3Y + "%",
        description: t("analytics.down_capture_description"),
      },
      stdDeviationLow: {
        icon: "show-chart",
        title: t("analytics.std_deviation"),
        value: "",
        description: t("analytics.std_deviation2_description"),
      },
      upCapture: {
        icon: "arrow-upward",
        title: t("analytics.upcapture"),
        value: "",
        description: t("analytics.upcapture_description"),
      },
      informationRatio: {
        icon: "info",
        title: t("analytics.info_ratio"),
        value: data?.information_ratio,
        description: t("analytics.info_ratio_description"),
      },
    };
  }, [data]);

  const MetricItem = ({ metric }: { metric: AnalyticsMetric }) => (
    <View style={styles.metricItem}>
      <View style={styles.iconContainer}>
        <MaterialIcons name={metric.icon} size={22} color={Colors.primary} />
      </View>
      <View style={styles.metricContent}>
        <Text style={styles.metricTitle}>
          {metric.title}
          {metric.value ? `: ${metric.value}` : ""}
        </Text>
        <Text style={styles.metricDescription}>{metric.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <MetricItem metric={analyticsData.beta} />
      <MetricItem metric={analyticsData.stdDeviation} />
      <MetricItem metric={analyticsData.sharpeRatio} />
      <MetricItem metric={analyticsData.alpha} />
      <MetricItem metric={analyticsData.sortinoRatio} />
      <MetricItem metric={analyticsData.downCapture} />
      <MetricItem metric={analyticsData.stdDeviationLow} />
      <MetricItem metric={analyticsData.upCapture} />
      <MetricItem metric={analyticsData.informationRatio} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    gap: 15,
    paddingBottom: 20,
  },
  metricItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 22,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  metricContent: {
    flex: 1,
  },
  metricTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  metricDescription: {
    fontSize: 14,
    color: Colors.primary,
    lineHeight: 20,
  },
});

export default Analytics;
