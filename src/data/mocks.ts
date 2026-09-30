import type { Client, Payment, Session, Trainer } from "../types";
import type { BookingRepo, ClientsRepo, PaymentsRepo, SessionsRepo, TrainerRepo } from "./repositories";

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const request = async <T>(value: T): Promise<T> => {
  await delay(300 + Math.floor(Math.random() * 301));
  if (Math.random() < 0.05) {
    throw new Error("Mock repository request failed");
  }
  return value;
};

export const trainer: Trainer = { id: "trainer-1", fullName: "Anna Kowalska", email: "anna@example.com", instagramHandle: "@annatrains", bookingSlug: "", plan: "pro" };
export const clients: Client[] = Array.from({ length: 8 }, (_, index) => ({
  id: `client-${index + 1}`, trainerId: trainer.id, fullName: ["Jan Nowak", "Ola Wiśniewska", "Piotr Zieliński", "Maria Wójcik", "Tomasz Kamiński", "Kasia Lewandowska", "Marek Dąbrowski", "Ewa Kozłowska"][index],
  email: `client${index + 1}@example.com`, phone: `+48 500 000 00${index + 1}`,
  status: index === 6 ? "churned" : index === 5 ? "inactive" : "active",
  lastSessionAt: index === 7 ? null : new Date(Date.now() - index * 3 * 86400000).toISOString(), consentAt: new Date().toISOString(),
}));
export const sessions: Session[] = Array.from({ length: 15 }, (_, index) => ({
  id: `session-${index + 1}`, trainerId: trainer.id, clientId: clients[index % clients.length].id,
  scheduledAt: new Date(Date.now() + (index - 5) * 86400000).toISOString(), durationMin: 60,
  status: index < 5 ? "completed" : index === 7 ? "cancelled" : "scheduled",
}));
export const payments: Payment[] = Array.from({ length: 10 }, (_, index) => ({
  id: `payment-${index + 1}`, trainerId: trainer.id, clientId: clients[index % clients.length].id, sessionId: sessions[index].id,
  amountGrosz: 15000 + index * 5000, status: index % 4 === 0 ? "paid" : index % 4 === 1 ? "pending" : index % 4 === 2 ? "failed" : "refunded",
  dueDate: new Date(Date.now() + index * 86400000).toISOString(), reminderCount: index % 3,
}));

export const clientsRepo: ClientsRepo = { list: async () => request(clients) };
export const sessionsRepo: SessionsRepo = { list: async () => request(sessions) };
export const paymentsRepo: PaymentsRepo = { list: async () => request(payments) };
export const trainerRepo: TrainerRepo = {
  get: async () => request(trainer),
  updateProfile: async (update) => {
    Object.assign(trainer, update);
    return request(trainer);
  },
};
export const bookingRepo: BookingRepo = { getBookingUrl: async () => request(`https://traineros.example/${trainer.bookingSlug}`) };
