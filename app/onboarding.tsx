import { zodResolver } from "@hookform/resolvers/zod";
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button } from "../src/components/Button";
import { Card } from "../src/components/Card";
import { ScreenHeader } from "../src/components/ScreenHeader";
import { trainerRepo } from "../src/data";
import { AvailabilityStep } from "../src/features/onboarding/AvailabilityStep";
import { onboardingSchema, type OnboardingForm } from "../src/features/onboarding/schema";
import { PricingStep } from "../src/features/onboarding/PricingStep";
import { ProfileStep } from "../src/features/onboarding/ProfileStep";
import { generateUniqueBookingSlug, priceToGrosz } from "../src/features/onboarding/utils";

export default function Onboarding() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error" | "success">("loading");
  const [error, setError] = useState("");
  const [bookingLink, setBookingLink] = useState("");
  const [copied, setCopied] = useState(false);
  const form = useForm<OnboardingForm>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: { fullName: "", instagramHandle: "", availability: [], sessionPrice: "", defaultDuration: 60 },
    mode: "onTouched",
  });

  useEffect(() => {
    void trainerRepo.get().then((trainer) => {
      form.reset({ fullName: trainer.fullName, instagramHandle: trainer.instagramHandle, availability: trainer.weeklyAvailability || [], sessionPrice: trainer.sessionPriceGrosz ? String(trainer.sessionPriceGrosz / 100) : "", defaultDuration: trainer.defaultDurationMin || 60 });
      setStatus("ready");
    }).catch(() => { setError(t("onboarding.loadError")); setStatus("error"); });
  }, [form, t]);

  const next = async () => {
    const fields: (keyof OnboardingForm)[][] = [["fullName", "instagramHandle"], ["availability"], ["sessionPrice", "defaultDuration"]];
    if (!(await form.trigger(fields[step]))) return;
    if (step < 2) setStep(step + 1);
    else await finish();
  };

  const finish = async () => {
    setStatus("loading");
    try {
      const values = form.getValues();
      const slug = generateUniqueBookingSlug(values.fullName);
      if (!trainerRepo.updateProfile) throw new Error("Trainer profile updates are unavailable");
      await trainerRepo.updateProfile({ fullName: values.fullName, instagramHandle: values.instagramHandle, bookingSlug: slug, sessionPriceGrosz: priceToGrosz(values.sessionPrice), defaultDurationMin: values.defaultDuration, weeklyAvailability: values.availability });
      setBookingLink(`https://traineros.example/${slug}`);
      setStatus("success");
    } catch {
      setError(t("onboarding.saveError"));
      setStatus("error");
    }
  };

  if (status === "loading") return <View className="flex-1 items-center justify-center bg-slate-50 dark:bg-slate-950"><ActivityIndicator color="#0d9f77" /><Text className="mt-3 text-slate-600 dark:text-slate-300">{t("common.loading")}</Text></View>;
  if (status === "error") return <View className="flex-1 justify-center bg-slate-50 px-5 dark:bg-slate-950"><Card><Text className="mb-4 text-center text-red-600 dark:text-red-400">{error}</Text><Button label={t("common.tryAgain")} onPress={() => { setError(""); setStatus("ready"); }} /></Card></View>;
  if (status === "success") return <View className="flex-1 justify-center bg-slate-50 px-5 dark:bg-slate-950"><Card><View className="gap-4"><ScreenHeader title={t("onboarding.successTitle")} subtitle={t("onboarding.successSubtitle")} /><View className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800"><Text selectable className="text-accent-700 dark:text-accent-500">{bookingLink}</Text></View><Button label={copied ? t("onboarding.copied") : t("onboarding.copyLink")} onPress={() => { void Clipboard.setStringAsync(bookingLink); setCopied(true); }} /><Button variant="secondary" label={t("onboarding.goDashboard")} onPress={() => router.replace("/")} /></View></Card></View>;

  return <ScrollView className="flex-1 bg-slate-50 dark:bg-slate-950" contentContainerClassName="gap-6 px-5 pb-10 pt-16"><ScreenHeader title={t("onboarding.title")} subtitle={t("onboarding.step", { current: step + 1, total: 3 })} /><View className="flex-row gap-2" accessibilityLabel={t("onboarding.progress")}><View className={`h-2 flex-1 rounded-full ${step >= 0 ? "bg-accent-600" : "bg-slate-200"}`} /><View className={`h-2 flex-1 rounded-full ${step >= 1 ? "bg-accent-600" : "bg-slate-200 dark:bg-slate-800"}`} /><View className={`h-2 flex-1 rounded-full ${step >= 2 ? "bg-accent-600" : "bg-slate-200 dark:bg-slate-800"}`} /></View><Card>{step === 0 ? <ProfileStep control={form.control} errors={form.formState.errors} /> : step === 1 ? <AvailabilityStep control={form.control} errors={form.formState.errors} watch={form.watch} setValue={form.setValue} /> : <PricingStep control={form.control} errors={form.formState.errors} />}</Card><View className="flex-row gap-3"><View className="flex-1">{step > 0 ? <Button variant="secondary" label={t("common.back")} onPress={() => setStep(step - 1)} /> : null}</View><View className="flex-1"><Button label={step === 2 ? t("common.finish") : t("common.next")} onPress={() => void next()} /></View></View></ScrollView>;
}
