import { Accordion } from "@/components/accordion";
import AppBar from "@/components/app-bar";
import ThemedButton from "@/components/button";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/colors";
import useTranslation from "@/hooks/use-translation";
import { MfScheme } from "@/types/mutual-funds";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import data from "../../data/data.json";
import AllocationAnalysis from "./components/allocation-analysis";
import Analytics from "./components/analytics";
import FundManagers from "./components/fund-managers";
import HoldingAnalysis from "./components/holding-analysis";
import MutualFundInfo from "./components/mutual-fund-info";
import ReturnAnalysis from "./components/return-analysis";
import ReturnCalculator from "./components/return-calculator";
import Returns from "./components/returns";
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
    <ThemedView style={styles.container}>
      <AppBar />
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
        <ThemedView style={styles.fixedBackground}></ThemedView>
        <ThemedView style={styles.infoContainer}>
          <MutualFundInfo data={mfScheme} />
        </ThemedView>
        {mfScheme && (
          <Returns navData={mfScheme?.nav_json || []} fund={mfScheme} />
        )}
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
        <Accordion title={t("holding.title")} style={{ marginHorizontal: 15 }}>
          <HoldingAnalysis holdingData={mfScheme?.holdings_data || []} />
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
        {mfScheme && <ReturnCalculator fund={mfScheme} />}
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <ThemedButton
          title={t("common.one_time")}
          style={{ backgroundColor: Colors.disabled }}
          textStyle={{ color: Colors.primary }}
        />
        <ThemedButton title={t("common.start_sip")} />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: Colors.primary,
    height: 50 + StatusBar.currentHeight!,
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  infoContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    elevation: 5,
    borderRadius: 20,
    overflow: "hidden",
  },
  fixedBackground: {
    backgroundColor: Colors.primary,
    height: height * 0.25,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    position: "absolute",
    top: -10,
    left: 0,
    right: 0,
  },
  buttonWrapper: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    width: "100%",
    padding: 14,
  },
});
export default HomeScreen;
