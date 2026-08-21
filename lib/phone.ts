export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function normalizePhone(value: string) {
  let digits = digitsOnly(value);
  if (digits.startsWith("0") && digits.length === 11) digits = digits.slice(1);
  if (digits.length === 10) digits = `91${digits}`;
  return digits;
}

export function phoneLooksValid(value: string) {
  const digits = normalizePhone(value);
  return digits.length >= 10 && digits.length <= 15;
}
