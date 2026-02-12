import {
  Canvas,
  LinearGradient,
  Path,
  Skia,
  vec,
} from "@shopify/react-native-skia";
import React, { useMemo } from "react";
import { Dimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export interface LineChartDataPoint {
  value: number;
  date: string;
  label?: string;
}

interface LineChartProps {
  data: LineChartDataPoint[];
  width?: number;
  height?: number;
  lineColor?: string;
  gradientColors?: string[];
  strokeWidth?: number;
  onPointSelected?: (point: LineChartDataPoint | null) => void;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  width = SCREEN_WIDTH - 60,
  height = 200,
  lineColor = "#6fa287",
  gradientColors = ["#6fa28740", "#6fa28710"],
  strokeWidth = 2.5,
  onPointSelected,
}) => {
  const touchX = useSharedValue(-1);
  const touchY = useSharedValue(-1);
  const isPressed = useSharedValue(false);

  const { minValue, maxValue, points, pathString, fillPathString } =
    useMemo(() => {
      if (!data || data.length === 0) {
        return {
          minValue: 0,
          maxValue: 100,
          points: [],
          pathString: "",
          fillPathString: "",
        };
      }

      const values = data.map((d) => d.value);
      const min = Math.min(...values);
      const max = Math.max(...values);
      const range = max - min || 1;

      const padding = 10;
      const chartWidth = width - padding * 2;
      const chartHeight = height - padding * 2;

      const calculatedPoints = data.map((d, index) => {
        const x = padding + (index / (data.length - 1 || 1)) * chartWidth;
        const y =
          padding + chartHeight - ((d.value - min) / range) * chartHeight;
        return { x, y, value: d.value, date: d.date };
      });

      const path = Skia.Path.Make();
      if (calculatedPoints.length > 0) {
        path.moveTo(calculatedPoints[0].x, calculatedPoints[0].y);

        for (let i = 1; i < calculatedPoints.length; i++) {
          const prev = calculatedPoints[i - 1];
          const curr = calculatedPoints[i];

          const cpx1 = prev.x + (curr.x - prev.x) / 3;
          const cpx2 = prev.x + (2 * (curr.x - prev.x)) / 3;

          path.cubicTo(cpx1, prev.y, cpx2, curr.y, curr.x, curr.y);
        }
      }

      const fillPath = Skia.Path.MakeFromSVGString(path.toSVGString());
      if (fillPath && calculatedPoints.length > 0) {
        const lastPoint = calculatedPoints[calculatedPoints.length - 1];
        const firstPoint = calculatedPoints[0];
        fillPath.lineTo(lastPoint.x, height);
        fillPath.lineTo(firstPoint.x, height);
        fillPath.close();
      }

      return {
        minValue: min,
        maxValue: max,
        points: calculatedPoints,
        pathString: path.toSVGString(),
        fillPathString: fillPath?.toSVGString() || "",
      };
    }, [data, width, height]);

  const findNearestPoint = (x: number) => {
    if (points.length === 0) return null;

    let nearest = points[0];
    let minDistance = Math.abs(x - points[0].x);

    for (const point of points) {
      const distance = Math.abs(x - point.x);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = point;
      }
    }

    return nearest;
  };

  const handleTouch = (x: number, y: number) => {
    const nearest = findNearestPoint(x);
    if (nearest) {
      touchX.value = nearest.x;
      touchY.value = nearest.y;
      if (onPointSelected) {
        const dataPoint = data.find(
          (d) => d.value === nearest.value && d.date === nearest.date,
        );
        if (dataPoint) {
          onPointSelected(dataPoint);
        }
      }
    }
  };

  const panGesture = Gesture.Pan()
    .onBegin((e) => {
      isPressed.value = true;
      runOnJS(handleTouch)(e.x, e.y);
    })
    .onUpdate((e) => {
      runOnJS(handleTouch)(e.x, e.y);
    })
    .onEnd(() => {
      isPressed.value = false;
      touchX.value = withTiming(-1, { duration: 200 });
      touchY.value = withTiming(-1, { duration: 200 });
      if (onPointSelected) {
        runOnJS(onPointSelected)(null);
      }
    });

  const pointerStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      left: touchX.value - 8,
      top: touchY.value - 8,
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: lineColor,
      borderWidth: 3,
      borderColor: "#FFFFFF",
      opacity: withTiming(touchX.value > 0 ? 1 : 0, { duration: 150 }),
      transform: [
        {
          scale: withTiming(touchX.value > 0 ? 1 : 0.5, { duration: 150 }),
        },
      ],
    };
  });

  const lineStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      left: touchX.value,
      top: 0,
      width: 1.5,
      height: height,
      backgroundColor: lineColor,
      opacity: withTiming(touchX.value > 0 ? 1 : 0, { duration: 150 }),
    };
  });

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <GestureDetector gesture={panGesture}>
      <View style={{ width, height, position: "relative" }}>
        <Canvas style={{ width, height }}>
          {fillPathString && (
            <Path path={fillPathString} style="fill">
              <LinearGradient
                start={vec(0, 0)}
                end={vec(0, height)}
                colors={gradientColors}
              />
            </Path>
          )}
          <Path
            path={pathString}
            style="stroke"
            strokeWidth={strokeWidth}
            color={lineColor}
            strokeCap="round"
            strokeJoin="round"
          />
        </Canvas>
        <Animated.View style={lineStyle} />
        <Animated.View style={pointerStyle} />
      </View>
    </GestureDetector>
  );
};

export default LineChart;
