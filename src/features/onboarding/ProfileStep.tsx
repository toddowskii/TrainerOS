import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Input } from "../../components/Input";
import type { OnboardingForm } from "./schema";

export function ProfileStep({ control, errors }: { control: Control<OnboardingForm>; errors: FieldErrors<OnboardingForm> }) {
  const { t } = useTranslation();
  return <View className="gap-5"><Text className="text-base text-slate-600 dark:text-slate-300">{t("onboarding.profileIntro")}</Text>
    <Controller control={control} name="fullName" render={({ field }) => <Input label={t("onboarding.fullName")} value={field.value} onChangeText={field.onChange} error={errors.fullName?.message ? t(String(errors.fullName.message)) : undefined} />} />
    <Controller control={control} name="instagramHandle" render={({ field }) => <Input label={t("onboarding.instagramHandle")} value={field.value} onChangeText={field.onChange} placeholder="@twojprofil" error={errors.instagramHandle?.message ? t(String(errors.instagramHandle.message)) : undefined} />} />
  </View>;
}
