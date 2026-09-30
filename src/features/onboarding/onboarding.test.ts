import { generateUniqueBookingSlug, priceToGrosz } from "./utils";

const slug = generateUniqueBookingSlug("Żaneta Nowak", ["zaneta-nowak"]);
if (slug !== "zaneta-nowak-2" || priceToGrosz("149,99") !== 14999) throw new Error("Onboarding utility test failed");
