import type { Client, Payment, Session, Trainer } from "../types";

export interface ClientsRepo { list(trainerId: string): Promise<Client[]>; }
export interface SessionsRepo { list(trainerId: string): Promise<Session[]>; }
export interface PaymentsRepo { list(trainerId: string): Promise<Payment[]>; }
export interface TrainerProfileUpdate {
  fullName: string;
  instagramHandle: string;
  bookingSlug: string;
  sessionPriceGrosz: number;
  defaultDurationMin: 30 | 45 | 60 | 90;
  weeklyAvailability: import("../types").WeeklyAvailability[];
}
export interface TrainerRepo {
  get(): Promise<Trainer>;
  updateProfile?(update: TrainerProfileUpdate): Promise<Trainer>;
}
export interface BookingRepo { getBookingUrl(): Promise<string>; }
