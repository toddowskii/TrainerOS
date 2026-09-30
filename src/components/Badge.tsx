import { Text } from "react-native";
type Props = { label: string; tone?: "green" | "red" | "amber" };
export function Badge({ label, tone = "green" }: Props) { const colors = { green: "bg-green-100 text-green-700", red: "bg-red-100 text-red-700", amber: "bg-amber-100 text-amber-700" }; return <Text className={`self-start rounded-full px-3 py-1 text-xs font-semibold ${colors[tone]}`}>{label}</Text>; }
