import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  pl: { translation: {
    tabs: { dashboard: "Panel", clients: "Klienci", sessions: "Sesje", payments: "Płatności", share: "Udostępnij" },
    common: { placeholder: "Wkrótce", loading: "Ładowanie…", tryAgain: "Spróbuj ponownie", back: "Wstecz", next: "Dalej", finish: "Zakończ", minutes: "min" },
    onboarding: {
      title: "Ustaw swój profil", step: "Krok {{current}} z {{total}}", progress: "Postęp konfiguracji",
      profileIntro: "Zacznijmy od podstaw. Te dane zobaczą Twoi klienci.",
      fullName: "Imię i nazwisko", instagramHandle: "Nazwa na Instagramie",
      availabilityIntro: "Wybierz dni i ustaw godziny, w których przyjmujesz rezerwacje.",
      days: { "0": "Nd", "1": "Pn", "2": "Wt", "3": "Śr", "4": "Cz", "5": "Pt", "6": "Sb" },
      startTime: "Od", endTime: "Do", pricingIntro: "Ustal cenę i domyślny czas trwania sesji.",
      sessionPrice: "Cena sesji (PLN)", duration: "Domyślny czas trwania",
      successTitle: "Twój profil jest gotowy!", successSubtitle: "Udostępnij ten link, aby klienci mogli się umówić.",
      copyLink: "Kopiuj link", copied: "Skopiowano", goDashboard: "Przejdź do panelu",
      loadError: "Nie udało się wczytać profilu.", saveError: "Nie udało się zapisać profilu.",
      errors: { fullName: "Podaj imię i nazwisko.", instagramHandle: "Podaj nazwę na Instagramie.", availability: "Wybierz co najmniej jeden dzień.", time: "Użyj formatu HH:MM.", timeOrder: "Godzina końcowa musi być późniejsza.", price: "Podaj cenę większą od zera." },
    },
  } },
  en: { translation: {
    tabs: { dashboard: "Dashboard", clients: "Clients", sessions: "Sessions", payments: "Payments", share: "Share" },
    common: { placeholder: "Coming soon", loading: "Loading…", tryAgain: "Try again", back: "Back", next: "Next", finish: "Finish", minutes: "min" },
    onboarding: {
      title: "Set up your profile", step: "Step {{current}} of {{total}}", progress: "Setup progress",
      profileIntro: "Let's start with the basics. Your clients will see these details.",
      fullName: "Full name", instagramHandle: "Instagram handle", availabilityIntro: "Choose days and set the hours when you accept bookings.",
      days: { "0": "Sun", "1": "Mon", "2": "Tue", "3": "Wed", "4": "Thu", "5": "Fri", "6": "Sat" },
      startTime: "From", endTime: "To", pricingIntro: "Set your session price and default duration.",
      sessionPrice: "Session price (PLN)", duration: "Default duration",
      successTitle: "Your profile is ready!", successSubtitle: "Share this link so clients can book a session.",
      copyLink: "Copy link", copied: "Copied", goDashboard: "Go to dashboard",
      loadError: "Could not load your profile.", saveError: "Could not save your profile.",
      errors: { fullName: "Enter your full name.", instagramHandle: "Enter your Instagram handle.", availability: "Choose at least one day.", time: "Use the HH:MM format.", timeOrder: "End time must be later.", price: "Enter a price greater than zero." },
    },
  } },
} as const;

void i18n.use(initReactI18next).init({ resources, lng: "pl", fallbackLng: "en", interpolation: { escapeValue: false } });
export default i18n;
