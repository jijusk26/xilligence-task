import { Canvas, Group, Path, Skia } from "@shopify/react-native-skia";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";

export interface PieChartData {
  value: number;
  color: string;
  label?: string;
}

interface PieChartProps {
  data: PieChartData[];
  size?: number;
  innerRadius?: number;
  strokeWidth?: number;
  showLabels?: boolean;
  animationDuration?: number;
}

const PieChart: React.FC<PieChartProps> = ({
  data,
  size = 200,
  innerRadius = 0.6,
  strokeWidth = 2,
  showLabels = false,
  animationDuration = 1000,
}) => {
  const animationProgress = useSharedValue(0);
  const radius = size / 2;
  const center = { x: radius, y: radius };

  useEffect(() => {
    animationProgress.value = withTiming(1, {
      duration: animationDuration,
      easing: Easing.inOut(Easing.cubic),
    });
  }, [animationDuration]);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const createSlicePath = (
    startAngle: number,
    endAngle: number,
    outerRadius: number,
    innerRadiusValue: number,
  ) => {
    const path = Skia.Path.Make();

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const startOuterX = center.x + outerRadius * Math.cos(startRad);
    const startOuterY = center.y + outerRadius * Math.sin(startRad);

    path.moveTo(startOuterX, startOuterY);

    path.arcToOval(
      {
        x: center.x - outerRadius,
        y: center.y - outerRadius,
        width: outerRadius * 2,
        height: outerRadius * 2,
      },
      startAngle,
      endAngle - startAngle,
      false,
    );

    const endInnerX = center.x + innerRadiusValue * Math.cos(endRad);
    const endInnerY = center.y + innerRadiusValue * Math.sin(endRad);

    path.lineTo(endInnerX, endInnerY);

    path.arcToOval(
      {
        x: center.x - innerRadiusValue,
        y: center.y - innerRadiusValue,
        width: innerRadiusValue * 2,
        height: innerRadiusValue * 2,
      },
      endAngle,
      -(endAngle - startAngle),
      false,
    );

    path.close();
    return path;
  };

  const slices = data.map((item, index) => {
    const startAngle = data
      .slice(0, index)
      .reduce((sum, d) => sum + (d.value / total) * 360, -90);
    const endAngle = startAngle + (item.value / total) * 360;

    const path = createSlicePath(
      startAngle,
      endAngle,
      radius - strokeWidth / 2,
      radius * innerRadius,
    );

    return {
      path,
      color: item.color,
      label: item.label,
      percentage: ((item.value / total) * 100).toFixed(1),
    };
  });

  return (
    <View style={styles.container}>
      <View style={{ width: size, height: size }}>
        <Canvas style={{ width: size, height: size }}>
          <Group>
            {slices.map((slice, index) => (
              <Path
                key={index}
                path={slice.path}
                color={slice.color}
                style="fill"
              />
            ))}
          </Group>
        </Canvas>
      </View>
      {showLabels && (
        <View style={styles.legendContainer}>
          {data.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: item.color }]}
              />
              <Text style={styles.legendText}>
                {item.label || `Item ${index + 1}`}: {slices[index].percentage}%
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  centerTextContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  centerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  centerSubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  legendContainer: {
    marginTop: 16,
    width: "100%",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: "#333",
  },
});

export default PieChart;
