import { ScreenHeader } from "../src/components/ScreenHeader";
import { ActivityIndicator, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { trainerRepo } from "../src/data";

export default function Index() {
  const { t } = useTranslation();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    void trainerRepo.get().then((trainer) => {
      if (!trainer.bookingSlug) router.replace("/onboarding" as import("expo-router").RelativePathString);
      else setReady(true);
    }).catch(() => setReady(true));
  }, []);
  if (!ready) return <View className="flex-1 items-center justify-center bg-slate-50 dark:bg-slate-950"><ActivityIndicator color="#0d9f77" /><Text className="mt-3 text-slate-600 dark:text-slate-300">{t("common.loading")}</Text></View>;
  return (
    <View className="flex-1 bg-slate-50 px-5 pt-16 dark:bg-slate-950">
      <ScreenHeader title={t("tabs.dashboard")} />
    </View>
  );
}
