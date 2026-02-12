import { Accordion } from "@/components/accordion";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/colors";
import useTranslation from "@/hooks/use-translation";
import { MfScheme } from "@/types/mutual-funds";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StatusBar, View } from "react-native";
import data from "../../data/data.json";
import AllocationAnalysis from "./components/allocation-analysis";
import Analytics from "./components/analytics";
import FundManagers from "./components/fund-managers";
import ReturnAnalysis from "./components/return-analysis";
import RiskoMeter from "./components/riskometer";
import SchemeInfo from "./components/scheme-info";
const { height, width } = Dimensions.get("screen");

const HomeScreen = () => {
  const { t } = useTranslation();
  const [mfScheme, setMfScheme] = useState<MfScheme>();

  useEffect(() => {
    return setMfScheme(data.result[0].mf_schemes[0] as MfScheme);
  }, []);

  return (
    <ThemedView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <ThemedView
        style={{
          backgroundColor: Colors.primary,
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
            backgroundColor: Colors.primary,
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
          title={t("return_analysis.title")}
          style={{ marginHorizontal: 15 }}
        >
          <ReturnAnalysis
            lumpsumData={mfScheme?.lumpsum_return || []}
            sipData={mfScheme?.sip_returns || []}
          />
        </Accordion>
        <Accordion
          title={t("analytics.title")}
          style={{ marginHorizontal: 15 }}
        >
          <Analytics data={mfScheme?.analytics_data} />
        </Accordion>
        <Accordion
          title={t("allocation.title")}
          style={{ marginHorizontal: 15 }}
        >
          <AllocationAnalysis
            AssetData={mfScheme?.holding_asset_allocation || []}
            SectorData={mfScheme?.mf_sector_details || []}
          />
        </Accordion>
        <Accordion
          title={t("riskometer.title")}
          style={{ marginHorizontal: 15 }}
        >
          <RiskoMeter risk={mfScheme?.riskometer_value || "Low"} />
        </Accordion>
        <Accordion
          title={t("scheme_info.title")}
          style={{ marginHorizontal: 15 }}
        >
          <SchemeInfo schemeData={mfScheme} />
        </Accordion>
        <Accordion title={"Fund Manager"} style={{ marginHorizontal: 15 }}>
          <FundManagers fundmanagers={mfScheme?.fund_managers || []} />
        </Accordion>
      </ScrollView>
    </ThemedView>
  );
};

export default HomeScreen;
