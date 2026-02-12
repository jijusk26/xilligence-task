import { Colors } from "@/constants/colors";
import useTranslation from "@/hooks/use-translation";
import { MfScheme } from "@/types/mutual-funds";
import Slider from "@react-native-community/slider";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ReturnCalculator = ({ fund }: { fund: MfScheme }) => {
  const { t } = useTranslation();
  const [investmentType, setInvestmentType] = useState<"sip" | "lumpsum">(
    "sip",
  );
  const [amount, setAmount] = useState(5000);
  const [duration, setDuration] = useState("1M");

  useEffect(() => {
    setAmount(
      investmentType === "sip" ? fund.min_sip_amount : fund.min_lumpsum_amount,
    );
  }, [investmentType]);

  const durations = [
    { label: "1M", months: 1 },
    { label: "3M", months: 3 },
    { label: "6M", months: 6 },
    { label: "1Y", months: 12 },
    { label: "3Y", months: 36 },
    { label: "5Y", months: 60 },
  ];

  const selectedDurationData = durations.find((d) => d.label === duration);
  const months = selectedDurationData?.months || 1;

  const calculateReturns = () => {
    const annualReturn =
      parseFloat(String(fund?.one_year_return || "12")) / 100;
    const monthlyReturn = Math.pow(1 + annualReturn, 1 / 12) - 1;

    let totalInvestment = 0;
    let futureValue = 0;

    if (investmentType === "sip") {
      totalInvestment = amount * months;
      for (let i = 0; i < months; i++) {
        futureValue += amount * Math.pow(1 + monthlyReturn, months - i);
      }
    } else {
      totalInvestment = amount;
      futureValue = amount * Math.pow(1 + monthlyReturn, months);
    }

    const gainAmount = futureValue - totalInvestment;
    const gainPercentage = ((gainAmount / totalInvestment) * 100).toFixed(2);

    return {
      totalInvestment: Math.round(totalInvestment),
      futureValue: Math.round(futureValue),
      gainPercentage,
    };
  };

  const { totalInvestment, futureValue, gainPercentage } = calculateReturns();

  return (
    <View style={styles.container}>
      <View
        style={{
          borderLeftColor: Colors.disabled,
          borderRightColor: Colors.disabled,
          borderTopColor: Colors.disabled,
          borderWidth: 1,
          borderBottomWidth: 0,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <View style={{ padding: 14 }}>
          <Text style={styles.title}>{t("return_calculator.title")}</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                investmentType === "sip" && styles.toggleButtonActive,
              ]}
              onPress={() => setInvestmentType("sip")}
            >
              <Text
                style={[
                  styles.toggleText,
                  investmentType === "sip" && styles.toggleTextActive,
                ]}
              >
                {t("return_calculator.monthly_sip")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                investmentType === "lumpsum" && styles.toggleButtonActive,
              ]}
              onPress={() => setInvestmentType("lumpsum")}
            >
              <Text
                style={[
                  styles.toggleText,
                  investmentType === "lumpsum" && styles.toggleTextActive,
                ]}
              >
                {t("return_calculator.one_time")}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.amountSection}>
            <Text style={styles.amountLabel}>
              {investmentType === "sip"
                ? t("return_calculator.monthly_sip_amount")
                : t("return_calculator.investment_amount")}
            </Text>
            <View style={styles.amountBadge}>
              <Text style={styles.amountText}>
                ₹{amount.toLocaleString("en-IN")}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={
              investmentType === "sip"
                ? fund.min_sip_amount
                : fund.min_lumpsum_amount
            }
            maximumValue={100000}
            step={500}
            value={amount}
            onValueChange={setAmount}
            minimumTrackTintColor={Colors.primary}
            maximumTrackTintColor="#aeb5bb"
            thumbTintColor={Colors.primary}
          />
        </View>
        <View style={{ padding: 14, paddingTop: 0 }}>
          <Text style={styles.durationLabel}>
            {t("return_calculator.select_duration")}
          </Text>
          <View style={styles.durationContainer}>
            {durations.map((item) => (
              <TouchableOpacity
                key={item.label}
                style={[
                  styles.durationButton,
                  duration === item.label && styles.durationButtonActive,
                ]}
                onPress={() => setDuration(item.label)}
              >
                <Text
                  style={[
                    styles.durationText,
                    duration === item.label && styles.durationTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.resultsContainer}>
        <Text style={styles.resultTitle}>
          {t("return_calculator.total_investment")}{" "}
          <Text style={[styles.resultTitle, { fontWeight: "800" }]}>
            ₹{totalInvestment.toLocaleString("en-IN")}
          </Text>
        </Text>
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>
            {t("return_calculator.would_have_become")}
            {"  "}
            <Text style={styles.resultValue}>
              ₹{futureValue.toLocaleString("en-IN")}{" "}
              <Text style={styles.resultGain}>(+{gainPercentage}%)</Text>
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 14,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.primaryText,
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 30,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
  },
  toggleButtonActive: {
    backgroundColor: Colors.primary,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primaryText,
  },
  toggleTextActive: {
    color: "#fff",
  },
  amountSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  amountLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.primaryText,
  },
  amountBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
  },
  amountText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },
  sliderContainer: {
    width: "100%",
    marginBottom: 18,
    paddingVertical: 8,
  },
  slider: {
    width: "100%",
    height: 20,
  },
  durationLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primaryText,
    marginBottom: 12,
  },
  durationContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
  durationButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  durationButtonActive: {
    backgroundColor: Colors.primary,
  },
  durationText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primaryText,
  },
  durationTextActive: {
    color: "#fff",
  },
  resultsContainer: {
    backgroundColor: "#F5F5F5",
    padding: 20,
    borderRadius: 12,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    gap: 8,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.primaryText,
    textAlign: "center",
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primaryText,
    textAlign: "center",
  },
  resultValue: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary,
  },
  resultGain: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary,
  },
});

export default ReturnCalculator;
