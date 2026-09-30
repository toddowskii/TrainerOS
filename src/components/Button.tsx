import { Pressable, Text } from "react-native";
type Props = { label: string; onPress?: () => void; variant?: "primary" | "secondary"; disabled?: boolean };
export function Button({ label, onPress, variant = "primary", disabled = false }: Props) {
  return <Pressable accessibilityRole="button" disabled={disabled} className={`min-h-[44px] items-center justify-center rounded-xl px-4 ${disabled ? "opacity-50" : ""} ${variant === "primary" ? "bg-accent-600" : "bg-slate-200 dark:bg-slate-800"}`} onPress={onPress}><Text className={variant === "primary" ? "font-semibold text-white" : "font-semibold text-slate-900 dark:text-white"}>{label}</Text></Pressable>;
}
