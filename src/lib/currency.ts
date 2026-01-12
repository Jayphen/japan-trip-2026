// Exchange rate: 1 AUD = 95 JPY
export const EXCHANGE_RATE_AUD_TO_JPY = 95;
export const HOME_CURRENCY_CODE = "AUD";

export function convertToHomeCurrency(jpyAmount: number): number {
  if (!jpyAmount) return 0;
  return jpyAmount / EXCHANGE_RATE_AUD_TO_JPY;
}

export function formatCurrency(amount: number, currency: "JPY" | "AUD"): string {
  if (currency === "JPY") {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0,
    }).format(amount);
  } else {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }
}

export const CATEGORIES = [
  { id: "FOOD", label: "Food", color: "orange-500", bgColor: "orange-100", textColor: "orange-700" },
  { id: "TRANSPORT", label: "Transport", color: "blue-500", bgColor: "blue-100", textColor: "blue-700" },
  { id: "SHOPPING", label: "Shopping", color: "pink-500", bgColor: "pink-100", textColor: "pink-700" },
  { id: "ACCOMMODATION", label: "Hotel", color: "indigo-500", bgColor: "indigo-100", textColor: "indigo-700" },
  { id: "ENTERTAINMENT", label: "Fun", color: "purple-500", bgColor: "purple-100", textColor: "purple-700" },
  { id: "MISC", label: "Misc", color: "gray-500", bgColor: "gray-100", textColor: "gray-700" },
] as const;

export type CategoryId = typeof CATEGORIES[number]["id"];

export function getCategoryConfig(id: string) {
  return CATEGORIES.find(c => c.id === id) || CATEGORIES[5]; // Default to Misc
}
