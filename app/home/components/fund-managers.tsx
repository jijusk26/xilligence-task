import { formatDate, getYearDifference } from "@/helpers/date";
import { avatarName } from "@/helpers/name";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const fundmanagers = [
  {
    date_from: "2025-08-29",
    isin_code: "INF109KC1TQ6",
    person_id: 2174,
    person_name: "Sanket Gaidhani",
    person_type: "Fund Manager",
  },
  {
    date_from: "2024-01-22",
    isin_code: "INF109KC1TQ6",
    person_id: 1836,
    person_name: "Darshil Dedhia",
    person_type: "Fund Manager",
  },
  {
    date_from: "2024-01-22",
    isin_code: "INF109KC1TQ6",
    person_id: 1889,
    person_name: "Rohit Lakhotia",
    person_type: "Fund Manager",
  },
  {
    date_from: "2022-07-01",
    isin_code: "INF109KC1TQ6",
    person_id: 1802,
    person_name: "Sharmila D'Silva",
    person_type: "Fund Manager - Foreign Securities",
  },
];

const FundManagers = () => {
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
                {formatDate(fm.date_from)} - Present |{" "}
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
