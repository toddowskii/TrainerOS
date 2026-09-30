import type { PropsWithChildren } from "react";
import { View } from "react-native";
export function Card({ children }: PropsWithChildren) { return <View className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900">{children}</View>; }
