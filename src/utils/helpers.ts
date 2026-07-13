export const formatPhoneNumber = (value: string) =>
  value
    .replace(/\D/g, "")
    .slice(0, 9)
    .replace(/(.{3})/g, "$1 ")
    .trim();
