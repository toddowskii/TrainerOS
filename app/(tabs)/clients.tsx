import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { ScreenHeader } from "../../src/components/ScreenHeader";
export default function Clients() {
  const { t } = useTranslation();
  return <View className="flex-1 bg-slate-50 px-5 pt-16 dark:bg-slate-950"><ScreenHeader title={t("tabs.clients")} /></View>;
}
