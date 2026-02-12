import { formatDate, getYearDifference } from "@/helpers/date";
import { avatarName } from "@/helpers/name";
import useTranslation from "@/hooks/use-translation";
import { FundManager } from "@/types/mutual-funds";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const FundManagers = ({ fundmanagers }: { fundmanagers: FundManager[] }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      {fundmanagers.map((fm) => {
        return (
          <View style={styles.fundManagerCard} key={fm.person_id}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {avatarName(fm.person_name)}
              </Text>
            </View>
            <View style={styles.nameWrapper}>
              <Text style={styles.name}>{fm.person_name},</Text>
              <Text style={styles.date}>
                {formatDate(fm.date_from)} - {t("fundManager.present")} |{" "}
                {getYearDifference(fm.date_from)}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    width: "100%",
  },
  fundManagerCard: {
    flexDirection: "row",
    padding: 10,
    width: "100%",
    gap: 15,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "#8166eb",
    justifyContent: "center",
    alignItems: "center",
  },
  nameWrapper: { justifyContent: "center", gap: 4 },
  avatarText: { fontSize: 20, color: "#fff", fontWeight: "800" },
  name: { fontSize: 18, color: "#000", fontWeight: "800" },
  date: { fontSize: 16, color: "#787878" },
});

export default FundManagers;
