import { Text, View } from "react-native";
export function ScreenHeader({ title, subtitle }: { title: string; subtitle?: string }) { return <View className="gap-1"><Text className="text-3xl font-bold text-slate-900 dark:text-white">{title}</Text>{subtitle ? <Text className="text-base text-slate-500 dark:text-slate-400">{subtitle}</Text> : null}</View>; }
