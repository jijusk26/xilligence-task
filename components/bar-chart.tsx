import { Colors } from "@/constants/colors";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const CHART_HEIGHT = 250;
const BAR_WIDTH = 28;

export interface BarChartData {
  label: string;
  value: number;
}

interface BarChartProps {
  data: BarChartData[];
  barColor?: string;
  chartHeight?: number;
  animationKey?: string;
}

const BarItem = ({
  data,
  index,
  maxVal,
  barColor,
}: {
  data: BarChartData;
  index: number;
  maxVal: number;
  barColor: string;
}) => {
  const heightValue = useSharedValue(0);
  const opacityValue = useSharedValue(0);

  useEffect(() => {
    heightValue.value = 0;
    opacityValue.value = 0;

    heightValue.value = withDelay(
      index * 100,
      withSpring((data.value / maxVal) * 100, {
        damping: 15,
        stiffness: 70,
      }),
    );
    opacityValue.value = withDelay(
      index * 100,
      withTiming(1, { duration: 300 }),
    );
  }, [data.value, maxVal, index]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: `${heightValue.value}%`,
    opacity: opacityValue.value,
  }));

  return (
    <View style={styles.barContainer}>
      <View style={styles.barWrapper}>
        <Animated.View
          style={[styles.bar, animatedStyle, { backgroundColor: barColor }]}
        >
          <Text
            style={styles.percentageLabel}
            numberOfLines={1}
            ellipsizeMode="clip"
          >
            {data.value}%
          </Text>
        </Animated.View>
      </View>
      <Text style={styles.monthLabel}>{data.label}</Text>
    </View>
  );
};

export const BarChart: React.FC<BarChartProps> = ({
  data,
  barColor = Colors.primary,
  chartHeight = CHART_HEIGHT,
  animationKey = "default",
}) => {
  const maxValue = Math.max(...data.map((d) => d.value));
  const roundedMax = Math.ceil(maxValue / 5) * 5;

  return (
    <View style={[styles.chartContainer, { height: chartHeight }]}>
      <View style={styles.yAxisContainer}>
        {[
          roundedMax,
          roundedMax * 0.75,
          roundedMax * 0.5,
          roundedMax * 0.25,
          0,
        ].map((val, idx) => (
          <Text key={idx} style={styles.yAxisLabel}>
            {Math.round(val)}%
          </Text>
        ))}
      </View>

      <View style={styles.chartInner}>
        <View style={styles.barsContainer}>
          {data.map((item, index) => (
            <BarItem
              key={`${animationKey}-${item.label}-${index}`}
              data={item}
              index={index}
              maxVal={roundedMax}
              barColor={barColor}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    marginTop: 20,
    flexDirection: "row",
  },
  yAxisContainer: {
    width: 40,
    justifyContent: "space-between",
    paddingRight: 8,
    paddingTop: 20,
    paddingBottom: 30,
  },
  yAxisLabel: {
    fontSize: 12,
    color: Colors.primary,
    textAlign: "right",
  },
  chartInner: {
    flex: 1,
    position: "relative",
  },
  barsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  barContainer: {
    alignItems: "center",
    flex: 1,
    marginBottom: -24,
  },
  barWrapper: {
    width: BAR_WIDTH,
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bar: {
    width: BAR_WIDTH,
    minHeight: 2,
    position: "relative",
  },
  percentageLabel: {
    position: "absolute",
    top: -22,
    left: -5,
    right: 0,
    fontSize: 13,
    fontWeight: "600",
    color: Colors.primary,
    textAlign: "center",
  },
  monthLabel: {
    fontSize: 10,
    color: Colors.primary,
    marginTop: 8,
    fontWeight: "500",
  },
});

export default BarChart;
