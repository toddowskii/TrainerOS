import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().trim().min(2, "onboarding.errors.fullName"),
  instagramHandle: z.string().trim().min(2, "onboarding.errors.instagramHandle"),
});

export const availabilitySchema = z.object({
  availability: z.array(z.object({
    day: z.number(),
    startTime: z.string().regex(/^\d{2}:\d{2}$/, "onboarding.errors.time"),
    endTime: z.string().regex(/^\d{2}:\d{2}$/, "onboarding.errors.time"),
  })).min(1, "onboarding.errors.availability"),
}).superRefine((value, ctx) => {
  value.availability.forEach((slot, index) => {
    if (slot.startTime >= slot.endTime) ctx.addIssue({ code: "custom", path: ["availability", index], message: "onboarding.errors.timeOrder" });
  });
});

export const pricingSchema = z.object({
  sessionPrice: z.string().refine((value) => Number(value.replace(",", ".")) > 0, "onboarding.errors.price"),
  defaultDuration: z.union([z.literal(30), z.literal(45), z.literal(60), z.literal(90)]),
});

export const onboardingSchema = profileSchema.and(availabilitySchema).and(pricingSchema);
export type OnboardingForm = z.infer<typeof profileSchema> & z.infer<typeof availabilitySchema> & z.infer<typeof pricingSchema>;
