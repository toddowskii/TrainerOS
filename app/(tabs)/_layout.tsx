import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";

export default function TabsLayout() {
  const { t } = useTranslation();
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "#0d9f77" }}>
    <Tabs.Screen name="index" options={{ title: t("tabs.dashboard") }} />
    <Tabs.Screen name="clients" options={{ title: t("tabs.clients") }} />
    <Tabs.Screen name="sessions" options={{ title: t("tabs.sessions") }} />
    <Tabs.Screen name="payments" options={{ title: t("tabs.payments") }} />
    <Tabs.Screen name="share" options={{ title: t("tabs.share") }} />
  </Tabs>;
}
