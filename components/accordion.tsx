import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export function Accordion({
  title,
  children,
  duration = 500,
  style,
  titleStyle,
}: {
  title: string;
  children: React.ReactNode;
  duration?: number;
  style?: ViewStyle;
  titleStyle?: ViewStyle;
}) {
  const isExpanded = useSharedValue(false);

  useEffect(() => {
    isExpanded.value = !isExpanded.value;
  }, []);

  const toggleAccordion = () => {
    isExpanded.value = !isExpanded.value;
  };

  return (
    <View
      style={[
        style,
        {
          borderWidth: 1,
          borderColor: "#d3d3d3",
          borderRadius: 15,
          overflow: "hidden",
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={toggleAccordion}
        style={[styles.header, titleStyle]}
      >
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      <AccordionItem
        isExpanded={isExpanded}
        viewKey={title}
        style={{}}
        duration={duration}
      >
        {children}
      </AccordionItem>
    </View>
  );
}

export function AccordionItem({
  isExpanded,
  children,
  viewKey,
  style,
  duration = 500,
}: {
  isExpanded: SharedValue<boolean>;
  children: any;
  viewKey: any;
  style: ViewStyle;
  duration: number;
}) {
  const height = useSharedValue(0);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isExpanded.value), {
      duration,
    }),
  );
  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  return (
    <Animated.View
      key={`accordionItem_${viewKey}`}
      style={[styles.animatedView, bodyStyle, style]}
    >
      <View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={styles.wrapper}
      >
        {children}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
  },
  animatedView: {
    width: "100%",
    overflow: "hidden",
  },
  header: {
    padding: 16,
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
});
