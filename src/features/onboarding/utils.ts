export const priceToGrosz = (price: string | number) => {
  const value = typeof price === "number" ? price : Number(price.replace(",", "."));
  return Math.round(value * 100);
};

export const generateUniqueBookingSlug = (name: string, existingSlugs: string[] = []) => {
  const base = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "trainer";
  const taken = new Set(existingSlugs);
  let slug = base;
  let suffix = 2;
  while (taken.has(slug)) slug = `${base}-${suffix++}`;
  return slug;
};
