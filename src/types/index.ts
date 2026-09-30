export type Trainer = {
  id: string; fullName: string; email: string; instagramHandle: string;
  bookingSlug: string; plan: string; stripeAccountId?: string;
  sessionPriceGrosz?: number;
  defaultDurationMin?: 30 | 45 | 60 | 90;
  weeklyAvailability?: WeeklyAvailability[];
};
export type WeeklyAvailability = { day: number; startTime: string; endTime: string };
export type ClientStatus = "active" | "inactive" | "churned";
export type Client = {
  id: string; trainerId: string; fullName: string; email: string; phone?: string;
  status: ClientStatus; lastSessionAt: string | null; intakeSurveyUrl?: string; consentAt: string;
};
export type SessionStatus = "scheduled" | "completed" | "cancelled" | "no_show";
export type Session = {
  id: string; trainerId: string; clientId: string; scheduledAt: string;
  durationMin: number; status: SessionStatus; meetingUrl?: string;
};
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type Payment = {
  id: string; trainerId: string; clientId: string; sessionId: string;
  amountGrosz: number; status: PaymentStatus; dueDate?: string; paidAt?: string; reminderCount: number;
};
