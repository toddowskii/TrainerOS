import { isInactiveClient, monthlyPaidTotal, outstandingTotal } from "./logic";

const now = new Date("2026-09-30T12:00:00.000Z");
const old = new Date("2026-09-01T12:00:00.000Z").toISOString();
const client = { id: "1", trainerId: "t", fullName: "Test", email: "test@example.com", status: "active" as const, lastSessionAt: null, consentAt: old, createdAt: old };
if (!isInactiveClient(client, now) || monthlyPaidTotal([{ id: "p", trainerId: "t", clientId: "1", sessionId: "s", amountGrosz: 12500, status: "paid", paidAt: now.toISOString(), reminderCount: 0 }], now) !== 12500 || outstandingTotal([{ id: "p", trainerId: "t", clientId: "1", sessionId: "s", amountGrosz: 5000, status: "pending", reminderCount: 0 }]) !== 5000) throw new Error("Dashboard logic test failed");
