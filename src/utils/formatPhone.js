export function formatPhone(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(?=\d)/g, "$1 ")
    .trim();
};