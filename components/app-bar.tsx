import { Colors } from "@/constants/colors";
import useTranslation from "@/hooks/use-translation";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

const AppBar = () => {
  const { t } = useTranslation();

  return (
    <ThemedView style={styles.header}>
      <View style={styles.childs}>
        <MaterialIcons
          name="arrow-back-ios"
          size={24}
          color={Colors.background}
        />
      </View>
      <View style={styles.titleWraper}>
        <ThemedText style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}>
          {t("common.scheme_details")}
        </ThemedText>
      </View>
      <View
        style={{
          ...styles.childs,
          gap: 15,
        }}
      >
        <MaterialIcons name="search" size={24} color={Colors.background} />
        <View style={styles.searchWrapper}>
          <View style={styles.badge}>
            <Text style={{ fontSize: 6, color: Colors.primary }}>3</Text>
          </View>
          <MaterialIcons
            name="shopping-cart"
            size={17}
            color={Colors.primary}
          />
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    height: 50 + StatusBar.currentHeight!,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  childs: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  badge: {
    justifyContent: "center",
    alignItems: "center",
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: Colors.background,
    position: "absolute",
    top: -2,
    right: 0,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  titleWraper: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  searchWrapper: {
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: Colors.background,
    position: "relative",
  },
});

export default AppBar;
