import type { Client, Payment, Session } from "../../types";

const DAY_MS = 24 * 60 * 60 * 1000;

export const isInactiveClient = (client: Client, now = new Date()) => {
  if (client.lastSessionAt) return now.getTime() - new Date(client.lastSessionAt).getTime() >= 14 * DAY_MS;
  return client.createdAt ? now.getTime() - new Date(client.createdAt).getTime() >= 14 * DAY_MS : false;
};

const isSameMonth = (date: string, now: Date) => {
  const value = new Date(date);
  return value.getFullYear() === now.getFullYear() && value.getMonth() === now.getMonth();
};

export const monthlySessionCount = (sessions: Session[], now = new Date()) =>
  sessions.filter((session) => isSameMonth(session.scheduledAt, now)).length;

export const monthlyPaidTotal = (payments: Payment[], now = new Date()) =>
  payments.filter((payment) => payment.status === "paid" && isSameMonth(payment.paidAt || payment.dueDate || "", now))
    .reduce((total, payment) => total + payment.amountGrosz, 0);

export const outstandingTotal = (payments: Payment[]) =>
  payments.filter((payment) => payment.status === "pending" || payment.status === "failed")
    .reduce((total, payment) => total + payment.amountGrosz, 0);

export const unpaidClientTotals = (clients: Client[], payments: Payment[]) =>
  clients.map((client) => ({
    client,
    amountGrosz: payments.filter((payment) => payment.clientId === client.id && (payment.status === "pending" || payment.status === "failed"))
      .reduce((total, payment) => total + payment.amountGrosz, 0),
  })).filter((item) => item.amountGrosz > 0);

export const nextScheduledSessions = (sessions: Session[], now = new Date()) =>
  sessions.filter((session) => session.status === "scheduled" && new Date(session.scheduledAt) >= now)
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()).slice(0, 5);

