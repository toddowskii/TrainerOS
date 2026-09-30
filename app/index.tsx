import { ScreenHeader } from "../src/components/ScreenHeader";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

export default function Index() {
  const { t } = useTranslation();
  return (
    <View className="flex-1 bg-slate-50 px-5 pt-16 dark:bg-slate-950">
      <ScreenHeader title={t("tabs.dashboard")} />
    </View>
  );
}
