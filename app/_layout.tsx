import "../global.css";

import { Tabs } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import "../src/i18n";

const queryClient = new QueryClient();

export default function RootLayout() {
  const { t } = useTranslation();
  return (
    <QueryClientProvider client={queryClient}>
      <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "#0d9f77" }}>
        <Tabs.Screen name="onboarding" options={{ href: null }} />
        <Tabs.Screen name="index" options={{ title: t("tabs.dashboard") }} />
        <Tabs.Screen name="clients" options={{ title: t("tabs.clients") }} />
        <Tabs.Screen name="sessions" options={{ title: t("tabs.sessions") }} />
        <Tabs.Screen name="payments" options={{ title: t("tabs.payments") }} />
        <Tabs.Screen name="share" options={{ title: t("tabs.share") }} />
      </Tabs>
    </QueryClientProvider>
  );
}
