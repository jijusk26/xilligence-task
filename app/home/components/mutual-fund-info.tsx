import { Colors } from "@/constants/colors";
import useTranslation from "@/hooks/use-translation";
import { MfScheme } from "@/types/mutual-funds";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MutualFundInfoProps {
  data?: MfScheme;
}

const MutualFundInfo: React.FC<MutualFundInfoProps> = ({ data }) => {
  const { t } = useTranslation();
  const benchmarkReturn = 10.12;
  const isPositiveChange =
    data?.nav_change_percentage?.startsWith("+") ||
    parseFloat(data?.nav_change_percentage || "0") >= 0;

  const renderStars = (rating: string) => {
    const starCount = parseInt(rating) || 0;
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <MaterialIcons
            key={star}
            name="star"
            size={12}
            color={star <= starCount ? "#6fa287" : "#E0E0E0"}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.badges}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {data?.category_name || "Equity"}
            </Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {data?.sub_category_name || "Flexi Cap"}
            </Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{data?.plan_type || "Growth"}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.bookmarkButton}>
          <MaterialIcons name="bookmark-border" size={24} color="#6fa287" />
        </TouchableOpacity>
      </View>

      <View style={styles.titleSection}>
        <View style={styles.logoContainer}>
          {data?.amc_image_icons ? (
            <Image
              source={{ uri: data?.amc_image_icons }}
              style={styles.logo}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>
                {data?.scheme_name
                  .split(" ")
                  .slice(0, 3)
                  .map((n) => n.charAt(0))
                  .join("")}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.titleContent}>
          <Text style={styles.fundName}>{data?.scheme_name}</Text>
          <LinearGradient
            colors={["#dc2828", "#0616ce"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.resilientBadge}
          >
            <MaterialIcons name="verified" size={12} color="#fff" />
            <Text style={styles.resilientText}>{t("fund_info.resilent")}</Text>
          </LinearGradient>
        </View>
      </View>
      <View style={styles.infoGrid}>
        <View style={styles.infoRowContainer}>
          <View style={styles.infoColumnFlex}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                {t("fund_info.nav")} :{" "}
                {moment(data?.nav_date).format("DD MMM YYYY")}
              </Text>
            </View>
            <View style={styles.navValueRow}>
              <Text style={styles.navValue}>
                ₹{data?.nav_value?.toFixed(0) || "0"}.
                <Text style={styles.navValueDecimal}>
                  {(data?.nav_value?.toString().split(".")[1] || "00").slice(
                    0,
                    2,
                  ) || "00"}
                </Text>
              </Text>
              <MaterialIcons
                name={isPositiveChange ? "arrow-drop-up" : "arrow-drop-down"}
                size={15}
                color={isPositiveChange ? "#4CAF50" : "#F44336"}
              />
              <Text
                style={[
                  styles.navChange,
                  isPositiveChange ? styles.positive : styles.negative,
                ]}
              >
                ₹{Number(data?.per_day_nav).toFixed(2) || "0.00"} (
                {data?.nav_change_percentage || "0"}%)
              </Text>
            </View>
          </View>
          <View style={styles.infoColumnFlex}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("scheme_info.aum")}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.aumValue}>{data?.aum_value}</Text>
            </View>
          </View>
        </View>
        <View style={styles.infoRowContainer}>
          <View style={styles.infoColumnFlex}>
            <Text style={styles.infoLabel}>
              {t("fund_info.one_year_return")}
            </Text>
            <Text style={styles.infoValue}>{data?.one_year_return}%</Text>
          </View>
          <View style={styles.infoColumnFlex}>
            <Text style={styles.infoLabel}>
              {t("fund_info.benchmark_index")}
            </Text>
            <Text style={styles.infoValue}>{data?.benchmark_index_name}</Text>
          </View>
        </View>
        <View style={styles.infoRowContainer}>
          <View style={styles.infoColumnFlex}>
            <Text style={styles.infoLabel}>
              {t("fund_info.one_year_benchmark_return")}
            </Text>
            <Text style={styles.infoValue}>{benchmarkReturn}%</Text>
          </View>
          <View style={styles.infoColumnFlex}>
            <Text style={styles.infoLabel}>
              {t("fund_info.value_research_rating")}
            </Text>
            {renderStars(data?.fund_rating || "5")}
          </View>
        </View>
      </View>
      <Text style={styles.description}>"{data?.scheme_description_ai}"</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    backgroundColor: "#E8F5E9",
    borderRadius: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  badges: {
    flexDirection: "row",
    gap: 8,
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: "transparent",
  },
  badgeText: {
    fontSize: 10,
    color: Colors.primaryText,
    fontWeight: "500",
  },
  bookmarkButton: {
    padding: 4,
  },
  titleSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logoContainer: {
    width: 60,
    height: 60,
    marginRight: 16,
    borderWidth: 1,
    borderColor: Colors.disabled,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    overflow: "hidden",
  },
  logo: {
    width: 60,
    height: 60,
  },
  logoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#6fa287",
  },
  titleContent: {
    flex: 1,
  },
  fundName: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primaryText,
    marginBottom: 8,
  },
  resilientBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: "flex-start",
    gap: 4,
  },
  resilientText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#fff",
    fontStyle: "italic",
  },
  infoGrid: {
    width: "100%",
    marginBottom: 10,
    gap: 10,
  },
  infoRowContainer: {
    flexDirection: "row",
    gap: 10,
  },
  infoColumnFlex: {
    flex: 1,
  },
  infoColumn: {
    flex: 1,
  },
  infoRow: {
    marginBottom: 0,
  },
  spacedRow: {
    marginTop: 8,
  },
  infoLabel: {
    fontSize: 13,
    color: "#999",
    marginBottom: 4,
  },
  navValueRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  navValue: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.primaryText,
  },
  navValueDecimal: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.primaryText,
  },
  navChange: {
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 4,
  },
  positive: {
    color: "#4CAF50",
  },
  negative: {
    color: "#F44336",
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.primaryText,
  },
  aumValue: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primaryText,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 2,
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.primaryText,
    lineHeight: 22,
    fontWeight: "600",
  },
});

export default MutualFundInfo;
