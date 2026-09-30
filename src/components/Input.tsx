import { Text, TextInput, View } from "react-native";
type Props = { label: string; value?: string; onChangeText?: (value: string) => void; placeholder?: string; error?: string; keyboardType?: "default" | "numeric" };
export function Input({ label, value, onChangeText, placeholder, error, keyboardType = "default" }: Props) {
  return <View className="gap-2"><Text className="font-medium text-slate-700 dark:text-slate-200">{label}</Text><TextInput accessibilityLabel={label} className={`min-h-[44px] rounded-xl border bg-white px-4 text-slate-900 dark:bg-slate-900 dark:text-white ${error ? "border-red-500" : "border-slate-300 dark:border-slate-700"}`} value={value} onChangeText={onChangeText} placeholder={placeholder} keyboardType={keyboardType} /><>{error ? <Text className="text-sm text-red-600 dark:text-red-400">{error}</Text> : null}</></View>;
}
