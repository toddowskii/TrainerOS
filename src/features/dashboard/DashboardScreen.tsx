import { useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { EmptyState } from "../../components/EmptyState";
import { ScreenHeader } from "../../components/ScreenHeader";
import { clientsRepo, paymentsRepo, sessionsRepo, trainerRepo } from "../../data";
import type { Client, Session } from "../../types";
import { isInactiveClient, monthlyPaidTotal, monthlySessionCount, nextScheduledSessions, outstandingTotal, unpaidClientTotals } from "./logic";

const money = (amountGrosz: number) => `${(amountGrosz / 100).toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PLN`;

function Skeleton() {
  return <View className="gap-3"><View className="h-9 w-2/3 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" /><View className="h-24 rounded-2xl bg-slate-200 dark:bg-slate-800" /><View className="h-40 rounded-2xl bg-slate-200 dark:bg-slate-800" /></View>;
}

function SessionRow({ session, client }: { session: Session; client?: Client }) {
  const { t, i18n } = useTranslation();
  return <Pressable accessibilityRole="button" className="flex-row items-center justify-between gap-3 border-b border-slate-100 py-4 dark:border-slate-800" onPress={() => router.push(`/session/${session.id}` as import("expo-router").RelativePathString)}>
    <View className="flex-1 gap-1"><Text className="font-semibold text-slate-900 dark:text-white">{client?.fullName || t("dashboard.unknownClient")}</Text><Text className="text-slate-500 dark:text-slate-400">{new Date(session.scheduledAt).toLocaleTimeString(i18n.language, { hour: "2-digit", minute: "2-digit" })} · {session.durationMin} {t("common.minutes")}</Text></View>
    <Badge label={t(`dashboard.status.${session.status}`)} tone={session.status === "scheduled" ? "green" : session.status === "cancelled" ? "red" : "amber"} />
  </Pressable>;
}

export function DashboardScreen() {
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();
  const trainerQuery = useQuery({ queryKey: ["trainer"], queryFn: () => trainerRepo.get() });
  const trainerId = trainerQuery.data?.id;
  const clientsQuery = useQuery({ queryKey: ["clients", trainerId], queryFn: () => clientsRepo.list(trainerId as string), enabled: Boolean(trainerId) });
  const sessionsQuery = useQuery({ queryKey: ["sessions", trainerId], queryFn: () => sessionsRepo.list(trainerId as string), enabled: Boolean(trainerId) });
  const paymentsQuery = useQuery({ queryKey: ["payments", trainerId], queryFn: () => paymentsRepo.list(trainerId as string), enabled: Boolean(trainerId) });
  const isLoading = trainerQuery.isPending || clientsQuery.isPending || sessionsQuery.isPending || paymentsQuery.isPending;
  const error = trainerQuery.error || clientsQuery.error || sessionsQuery.error || paymentsQuery.error;
  const clients = useMemo(() => clientsQuery.data || [], [clientsQuery.data]);
  const sessions = useMemo(() => sessionsQuery.data || [], [sessionsQuery.data]);
  const payments = paymentsQuery.data || [];
  const upcoming = useMemo(() => nextScheduledSessions(sessions), [sessions]);
  const clientById = useMemo(() => new Map(clients.map((client) => [client.id, client])), [clients]);
  const inactive = clients.filter((client) => client.status !== "churned" && isInactiveClient(client));
  const unpaid = unpaidClientTotals(clients, payments);
  const refresh = () => void Promise.all([trainerQuery.refetch(), clientsQuery.refetch(), sessionsQuery.refetch(), paymentsQuery.refetch()]);
  useEffect(() => {
    if (trainerQuery.data && !trainerQuery.data.bookingSlug) router.replace("/onboarding" as import("expo-router").RelativePathString);
  }, [trainerQuery.data]);

  if (isLoading) return <ScrollView className="flex-1 bg-slate-50 px-5 pt-16 dark:bg-slate-950"><Skeleton /></ScrollView>;
  if (error || !trainerQuery.data) return <View className="flex-1 items-center justify-center bg-slate-50 px-5 dark:bg-slate-950"><Text className="mb-4 text-center text-red-600 dark:text-red-400">{t("dashboard.error")}</Text><Button label={t("common.tryAgain")} onPress={refresh} /></View>;

  return <ScrollView className="flex-1 bg-slate-50 dark:bg-slate-950" contentContainerClassName="gap-6 px-5 pb-10 pt-16" refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh} />}>
    <ScreenHeader title={t("dashboard.greeting", { name: trainerQuery.data.fullName.split(" ")[0] })} subtitle={new Date().toLocaleDateString(i18n.language, { weekday: "long", day: "numeric", month: "long" })} />
    <View className="flex-row gap-2"><Card><Text className="text-2xl font-bold text-slate-900 dark:text-white">{monthlySessionCount(sessions)}</Text><Text className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t("dashboard.sessionsMonth")}</Text></Card><Card><Text className="text-2xl font-bold text-slate-900 dark:text-white">{money(monthlyPaidTotal(payments))}</Text><Text className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t("dashboard.collectedMonth")}</Text></Card><Card><Text className="text-2xl font-bold text-red-600">{money(outstandingTotal(payments))}</Text><Text className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t("dashboard.outstanding")}</Text></Card></View>
    <View className="gap-3"><Text className="text-xl font-bold text-slate-900 dark:text-white">{t("dashboard.nextSessions")}</Text><Card>{upcoming.length ? upcoming.map((session) => <SessionRow key={session.id} session={session} client={clientById.get(session.clientId)} />) : <EmptyState title={t("dashboard.noSessions")} />}</Card></View>
    <View className="gap-3"><Text className="text-xl font-bold text-slate-900 dark:text-white">{t("dashboard.attention")}</Text>{unpaid.length === 0 && inactive.length === 0 ? <EmptyState title={t("dashboard.nothingAttention")} /> : <View className="gap-3">{unpaid.map(({ client, amountGrosz }) => <Card key={`unpaid-${client.id}`}><View className="flex-row items-center justify-between gap-3"><Pressable className="flex-1" onPress={() => router.push(`/client/${client.id}` as import("expo-router").RelativePathString)}><Text className="font-semibold text-slate-900 dark:text-white">{client.fullName}</Text><Text className="text-red-600">{money(amountGrosz)}</Text></Pressable><Badge label={t("dashboard.unpaid")} tone="red" /><Button label={t("dashboard.remind")} onPress={() => { if (clientsRepo.updateReminder) void clientsRepo.updateReminder(client.id).then(() => queryClient.invalidateQueries({ queryKey: ["clients", trainerId] })); }} /></View></Card>)}{inactive.map((client) => <Pressable key={`inactive-${client.id}`} onPress={() => router.push(`/client/${client.id}` as import("expo-router").RelativePathString)}><Card><View className="flex-row items-center justify-between"><Text className="font-semibold text-slate-900 dark:text-white">{client.fullName}</Text><Badge label={t("dashboard.inactive")} tone="amber" /></View></Card></Pressable>)}</View>}</View>
  </ScrollView>;
}
