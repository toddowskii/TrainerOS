import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button } from "../../src/components/Button";
import { Card } from "../../src/components/Card";
import { ScreenHeader } from "../../src/components/ScreenHeader";
import { clientsRepo, sessionsRepo, trainerRepo } from "../../src/data";

export default function SessionDetail() {
  const { t, i18n } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const trainer = useQuery({ queryKey: ["trainer"], queryFn: () => trainerRepo.get() });
  const sessions = useQuery({ queryKey: ["sessions", trainer.data?.id], queryFn: () => sessionsRepo.list(trainer.data!.id), enabled: Boolean(trainer.data?.id) });
  const clients = useQuery({ queryKey: ["clients", trainer.data?.id], queryFn: () => clientsRepo.list(trainer.data!.id), enabled: Boolean(trainer.data?.id) });
  const session = sessions.data?.find((item) => item.id === id);
  if (trainer.isPending || sessions.isPending || clients.isPending) return <View className="flex-1 items-center justify-center"><ActivityIndicator /></View>;
  if (!session) return <View className="flex-1 justify-center px-5"><Text>{t("dashboard.notFound")}</Text></View>;
  const client = clients.data?.find((item) => item.id === session.clientId);
  return <View className="flex-1 gap-5 bg-slate-50 px-5 pt-16 dark:bg-slate-950"><ScreenHeader title={client?.fullName || t("dashboard.unknownClient")} subtitle={new Date(session.scheduledAt).toLocaleString(i18n.language)} /><Card><Text className="text-slate-700 dark:text-slate-200">{session.durationMin} {t("common.minutes")}</Text><Text className="mt-2 text-slate-700 dark:text-slate-200">{t(`dashboard.status.${session.status}`)}</Text></Card><Button variant="secondary" label={t("common.back")} onPress={() => router.back()} /></View>;
}
