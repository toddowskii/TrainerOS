import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  pl: { translation: { tabs: { dashboard: "Panel", clients: "Klienci", sessions: "Sesje", payments: "Płatności", share: "Udostępnij" }, common: { placeholder: "Wkrótce" } } },
  en: { translation: { tabs: { dashboard: "Dashboard", clients: "Clients", sessions: "Sessions", payments: "Payments", share: "Share" }, common: { placeholder: "Coming soon" } } },
} as const;

void i18n.use(initReactI18next).init({ resources, lng: "pl", fallbackLng: "en", interpolation: { escapeValue: false } });
export default i18n;
