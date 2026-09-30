import { Pressable, Text } from "react-native";
type Props = { label: string; onPress?: () => void; variant?: "primary" | "secondary" };
export function Button({ label, onPress, variant = "primary" }: Props) {
  return <Pressable accessibilityRole="button" className={`min-h-[44px] items-center justify-center rounded-xl px-4 ${variant === "primary" ? "bg-accent-600" : "bg-slate-200 dark:bg-slate-800"}`} onPress={onPress}><Text className={variant === "primary" ? "font-semibold text-white" : "font-semibold text-slate-900 dark:text-white"}>{label}</Text></Pressable>;
}
