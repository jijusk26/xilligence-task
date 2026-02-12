import { Accordion } from "@/components/accordion";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import React from "react";
import { Dimensions, ScrollView, StatusBar, View } from "react-native";
import AllocationAnalysis from "./components/allocation-analysis";
import FundManagers from "./components/fund-managers";
const { height, width } = Dimensions.get("screen");

const HomeScreen = () => {
  return (
    <ThemedView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <ThemedView
        style={{
          backgroundColor: "green",
          height: 50 + StatusBar.currentHeight!,
          paddingTop: StatusBar.currentHeight,
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <ThemedText style={{ color: "#fff", fontSize: 20 }}>
          Scheme Details
        </ThemedText>
      </ThemedView>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          position: "relative",
        }}
        contentContainerStyle={{
          gap: 15,
        }}
      >
        <ThemedView
          style={{
            backgroundColor: "green",
            height: height * 0.25,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            position: "absolute",
            top: -10,
            left: 0,
            right: 0,
          }}
        ></ThemedView>
        <ThemedView
          style={{
            backgroundColor: "#fff",
            height: height * 0.25,
            marginHorizontal: 15,
            elevation: 5,
            borderRadius: 20,
            overflow: "hidden",
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <View style={{ padding: 10 }}>
                <ThemedText style={{ color: "#000", fontSize: 12 }}>
                  Equity
                </ThemedText>
              </View>
              <View style={{ padding: 10 }}>
                <ThemedText style={{ color: "#000", fontSize: 12 }}>
                  Equity
                </ThemedText>
              </View>
              <View style={{ padding: 10 }}>
                <ThemedText style={{ color: "#000", fontSize: 12 }}>
                  Equity
                </ThemedText>
              </View>
            </View>
            <View></View>
          </View>
        </ThemedView>
        <Accordion
          title={"Allocation Analysis"}
          style={{ marginHorizontal: 15 }}
        >
          <AllocationAnalysis />
        </Accordion>
        <Accordion title={"Fund Manager"} style={{ marginHorizontal: 15 }}>
          <FundManagers />
        </Accordion>
      </ScrollView>
    </ThemedView>
  );
};

export default HomeScreen;
