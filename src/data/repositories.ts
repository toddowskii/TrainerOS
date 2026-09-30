import type { Client, Payment, Session, Trainer } from "../types";

export interface ClientsRepo { list(trainerId: string): Promise<Client[]>; }
export interface SessionsRepo { list(trainerId: string): Promise<Session[]>; }
export interface PaymentsRepo { list(trainerId: string): Promise<Payment[]>; }
export interface TrainerRepo { get(): Promise<Trainer>; }
export interface BookingRepo { getBookingUrl(): Promise<string>; }
