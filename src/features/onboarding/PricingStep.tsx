import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Input } from "../../components/Input";
import type { OnboardingForm } from "./schema";

const durations = [30, 45, 60, 90] as const;
export function PricingStep({ control, errors }: { control: Control<OnboardingForm>; errors: FieldErrors<OnboardingForm> }) {
  const { t } = useTranslation();
  return <View className="gap-5"><Text className="text-base text-slate-600 dark:text-slate-300">{t("onboarding.pricingIntro")}</Text>
    <Controller control={control} name="sessionPrice" render={({ field }) => <Input label={t("onboarding.sessionPrice")} value={field.value} onChangeText={field.onChange} keyboardType="numeric" placeholder="150" error={errors.sessionPrice?.message ? t(String(errors.sessionPrice.message)) : undefined} />} />
    <View className="gap-2"><Text className="font-medium text-slate-700 dark:text-slate-200">{t("onboarding.duration")}</Text><Controller control={control} name="defaultDuration" render={({ field }) => <View className="flex-row flex-wrap gap-2">{durations.map((duration) => <Pressable key={duration} accessibilityRole="radio" accessibilityState={{ selected: field.value === duration }} onPress={() => field.onChange(duration)} className={`min-h-[44px] min-w-[70px] items-center justify-center rounded-xl px-3 ${field.value === duration ? "bg-accent-600" : "bg-slate-200 dark:bg-slate-800"}`}><Text className={field.value === duration ? "font-semibold text-white" : "font-semibold text-slate-800 dark:text-white"}>{duration} {t("common.minutes")}</Text></Pressable>)}</View>} /></View>
  </View>;
}
