import { Controller, type Control, type FieldErrors, type UseFormSetValue, type UseFormWatch } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Input } from "../../components/Input";
import type { OnboardingForm } from "./schema";

const days = [1, 2, 3, 4, 5, 6, 0];
export function AvailabilityStep({ control, errors, watch, setValue }: { control: Control<OnboardingForm>; errors: FieldErrors<OnboardingForm>; watch: UseFormWatch<OnboardingForm>; setValue: UseFormSetValue<OnboardingForm> }) {
  const { t } = useTranslation();
  const slots = watch("availability") || [];
  const selected = (day: number) => slots.find((slot) => slot.day === day);
  const toggle = (day: number) => setValue("availability", selected(day) ? slots.filter((slot) => slot.day !== day) : [...slots, { day, startTime: "09:00", endTime: "17:00" }], { shouldValidate: true });
  return <View className="gap-4"><Text className="text-base text-slate-600 dark:text-slate-300">{t("onboarding.availabilityIntro")}</Text>
    <View className="flex-row flex-wrap gap-2">{days.map((day) => <Pressable key={day} accessibilityRole="checkbox" accessibilityState={{ checked: Boolean(selected(day)) }} onPress={() => toggle(day)} className={`min-h-[44px] min-w-[44px] items-center justify-center rounded-xl px-3 ${selected(day) ? "bg-accent-600" : "bg-slate-200 dark:bg-slate-800"}`}><Text className={selected(day) ? "font-semibold text-white" : "font-semibold text-slate-800 dark:text-white"}>{t(`onboarding.days.${day}`)}</Text></Pressable>)}</View>
    {slots.map((slot) => <View key={slot.day} className="gap-3 rounded-xl bg-slate-100 p-4 dark:bg-slate-800"><Text className="font-semibold text-slate-900 dark:text-white">{t(`onboarding.days.${slot.day}`)}</Text><View className="flex-row gap-3"><Controller control={control} name={`availability.${slots.indexOf(slot)}.startTime`} render={({ field }) => <View className="flex-1"><Input label={t("onboarding.startTime")} value={field.value} onChangeText={field.onChange} error={errors.availability?.[slots.indexOf(slot)]?.message ? t(String(errors.availability?.[slots.indexOf(slot)]?.message)) : undefined} /></View>} /><Controller control={control} name={`availability.${slots.indexOf(slot)}.endTime`} render={({ field }) => <View className="flex-1"><Input label={t("onboarding.endTime")} value={field.value} onChangeText={field.onChange} /></View>} /></View></View>)}
    {errors.availability?.message ? <Text className="text-sm text-red-600 dark:text-red-400">{t(String(errors.availability.message))}</Text> : null}
  </View>;
}
