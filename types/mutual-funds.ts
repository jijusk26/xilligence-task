export interface ReturnsBO {
  month: string;
  percentage: number | string;
}
export interface ApiResponse {
  success: string;
  result: ResultItem[];
  successMessage: string;
  errorMessage: string;
}

export interface ResultItem {
  mf_schemes: MfScheme[];
}

export interface MfScheme {
  scheme_id: number;
  scheme_name: string;
  scheme_code: string;
  isin: string;
  min_lumpsum_amount: number;
  min_investment: number;
  min_sip_amount: number;
  minimum_amount: number;
  benchmark_index_name: string;
  category_id: number;
  category_name: string;
  sub_category_id: number;
  sub_category_name: string;
  amc_id: number;
  amc_name: string;
  amc_full_name: string;
  amc_code: string;
  amc_color_codes: string;
  amc_image_icons: string;
  amc_address1: string;
  amc_address2: string;
  amc_address3: string;
  amc_address4: string;
  amc_address5: string;
  amc_phone: string;
  aum_value: string;
  nav_date: string;
  nav_value: number;
  latest_nav: number;
  latest_nav_date: string;
  nav_change_percentage: string;
  one_year_return: number;
  three_year_return: number;
  five_year_return: number;
  weekly: number;
  monthly: number;
  three_month: number;
  six_month: number;
  fund_rating: string;
  riskometer_value: string;
  colour_name: string;
  scheme_objective: string;
  scheme_description_ai: string;
  scheme_type_ai: string;
  lock_in_period: string;
  exit_load: string;
  listing_date: string;
  plan_type: string;
  purchase_allowed: "Y" | "N";
  sip_flag: "Y" | "N";
  sip_frequency: string;
  is_index_fund: number;
  is_etf_fof_fund: number;
  analytics_data: AnalyticsData;
  sip_returns: ReturnsBO[];
  lumpsum_return: ReturnsBO[];
  frequency_details: FrequencyDetail[];
  mf_sector_details: SectorDetail[];
  holdings_data: HoldingData[];
  holding_asset_allocation: AssetAllocation[];
  fund_managers: FundManager[];
  scheme_duration: SchemeDuration[];
  nav_json: NavHistory[];
  is_user_wishlist_added: number;
  is_user_cart_added: number;
  per_day_nav: string;
  per_day_nav_percentage: string;
  rta: string;
  expense_ratio: number;
  bajaj_amc_id: number;
}

export interface AnalyticsData {
  beta: string;
  alpha: string;
  pescore: string;
  treynor: string;
  rsquared: string;
  sharpe_ratio: string;
  sortino_ratio: string;
  information_ratio: string;
  standard_deviation: string;
  Drawdown_1Y: string;
  Drawdown_3Y: string;
  DividendYield_1Y: string;
  DividendYield_3Y: string;
  plan_id: number;
  isin_code: string;
  as_on_date: string;
}

export interface FrequencyDetail {
  id: number;
  scheme_code: string;
  sip_frequency: "DAILY" | "MONTHLY" | "QUARTERLY";
  sip_minimum_gap: number;
  sip_maximum_gap: number;
  sip_installment_gap: number;
  sip_minimum_installment_amount: number;
  sip_maximum_installment_amount: number;
  sip_minimum_installment_numbers: number;
  sip_maximum_installment_numbers: number;
  created_on: number;
  modified_on: number;
  mf_scheme_id: number;
}

export interface SectorDetail {
  sector_code: number;
  isin: string;
  sector_name: string;
  percentage_assets: number;
}

export interface HoldingData {
  id: number;
  scheme_code: string;
  isin: string;
  holdings_percentages: number;
  holding_value: number;
  instrument_description: string;
  Company_names: string;
  mf_scheme_id: number;
  modified_on: number;
}

export interface AssetAllocation {
  asset_name: string;
  asset_percentage: number;
}

export interface FundManager {
  date_from: string;
  isin_code: string;
  person_id: number;
  person_name: string;
  person_type: string;
}

export interface SchemeDuration {
  duration_value: number;
  duration: string;
  NAV: number;
}

export interface NavHistory {
  nav: number;
  nav_date: string;
  adjusted_nav: number;
  scheme_code: number;
}
