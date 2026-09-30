import { ScreenHeader } from "../src/components/ScreenHeader";
import { ActivityIndicator, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { trainerRepo } from "../src/data";

export default function Index() {
  const { t } = useTranslation();
  const trainerQuery = useQuery({ queryKey: ["trainer"], queryFn: () => trainerRepo.get() });
  useEffect(() => {
    if (trainerQuery.data && !trainerQuery.data.bookingSlug) router.replace("/onboarding" as import("expo-router").RelativePathString);
  }, [trainerQuery.data]);
  if (trainerQuery.isPending) return <View className="flex-1 items-center justify-center bg-slate-50 dark:bg-slate-950"><ActivityIndicator color="#0d9f77" /><Text className="mt-3 text-slate-600 dark:text-slate-300">{t("common.loading")}</Text></View>;
  if (trainerQuery.isError) return <View className="flex-1 items-center justify-center bg-slate-50 px-5 dark:bg-slate-950"><Text className="text-center text-red-600 dark:text-red-400">{t("onboarding.loadError")}</Text></View>;
  if (!trainerQuery.data?.bookingSlug) return null;
  return (
    <View className="flex-1 bg-slate-50 px-5 pt-16 dark:bg-slate-950">
      <ScreenHeader title={t("tabs.dashboard")} />
    </View>
  );
}
