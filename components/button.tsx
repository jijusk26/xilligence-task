import { Colors } from "@/constants/colors";
import React from "react";
import { Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

const ThemedButton = ({
  title,
  onPress,
  style,
  textStyle,
}: {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        height: 50,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary,
        borderRadius: 12,
        ...style,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          color: Colors.background,
          ...textStyle,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ThemedButton;
