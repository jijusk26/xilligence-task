import { Colors } from "@/constants/colors";
import { transformDate } from "@/helpers/date";
import useTranslation from "@/hooks/use-translation";
import { MfScheme } from "@/types/mutual-funds";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

interface SchemeInfoProps {
  schemeData?: MfScheme;
}

const SchemeInfo: React.FC<SchemeInfoProps> = ({ schemeData }) => {
  const { t } = useTranslation();

  const addressLine = useMemo(() => {
    const addresses = [
      schemeData?.amc_address1,
      schemeData?.amc_address2,
      schemeData?.amc_address3,
      schemeData?.amc_address4,
      schemeData?.amc_address5,
    ];

    console.log("the address", addresses);
    return addresses.filter((a) => a);
  }, []);

  const InfoItem = ({
    iconName,
    label,
    value,
    fullWidth = false,
  }: {
    iconName: keyof typeof MaterialIcons.glyphMap;
    label: string;
    value?: string | number;
    fullWidth?: boolean;
  }) => (
    <View style={[styles.infoItem, fullWidth && styles.infoItemFull]}>
      <View style={styles.iconContainer}>
        <MaterialIcons name={iconName} size={16} color="#6fa287" />
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value !== "" ? value : "Nil"}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.objectiveSection}>
        <Text style={styles.objectiveLabel}>
          {t("scheme_info.objective")}:
          <Text style={styles.objectiveText}>
            {" " + schemeData?.scheme_objective}
          </Text>
        </Text>
      </View>

      <View style={styles.grid}>
        <InfoItem
          iconName="donut-small"
          label={t("scheme_info.expense_ratio")}
          value={
            schemeData?.expense_ratio + `% (${t("scheme_info.inclusive_gst")})`
          }
        />
        <InfoItem
          iconName="pie-chart"
          label={t("scheme_info.aum")}
          value={schemeData?.aum_value}
        />
        <InfoItem
          iconName="lock"
          label={t("scheme_info.lock_period")}
          value={schemeData?.lock_in_period}
        />
        <InfoItem
          iconName="check-circle"
          label={t("scheme_info.benchmark")}
          value={schemeData?.benchmark_index_name}
        />
        <InfoItem
          iconName="refresh"
          label={t("scheme_info.exit_load")}
          value={schemeData?.exit_load ?? "Applicable"}
        />
        <InfoItem
          iconName="calendar-today"
          label={t("scheme_info.listing_date")}
          value={transformDate(schemeData?.listing_date)}
        />
        <InfoItem
          iconName="account-balance"
          label={t("scheme_info.amc")}
          value={schemeData?.amc_name}
        />
        <InfoItem
          iconName="folder"
          label={t("scheme_info.rta")}
          value={schemeData?.rta}
        />
      </View>
      <View style={styles.contactSection}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="contact-page" size={20} color="#6fa287" />
        </View>
        <View style={styles.contactContent}>
          <Text style={[styles.label]}>{t("scheme_info.contact_details")}</Text>
          <Text style={styles.contactText}>{addressLine.join(" ")}</Text>
          {schemeData?.amc_phone && (
            <Text style={styles.contactText}>
              Tel no.: {schemeData.amc_phone}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    paddingBottom: 24,
  },
  objectiveSection: {
    marginBottom: 15,
  },
  objectiveLabel: {
    fontSize: 13,
    fontWeight: "800",
    color: "#333",
    marginBottom: 8,
  },
  objectiveText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -8,
  },
  infoItem: {
    width: "50%",
    paddingHorizontal: 8,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  infoItemFull: {
    width: "100%",
  },
  iconContainer: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    color: Colors.primary,
    marginBottom: 4,
    fontWeight: "800",
  },
  value: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.primaryText,
  },
  contactSection: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  contactContent: {
    flex: 1,
  },
  contactText: {
    fontSize: 14,
    color: Colors.primaryText,
    lineHeight: 20,
    marginTop: 4,
    fontWeight: "800",
  },
});

export default SchemeInfo;
