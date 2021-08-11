export function isPhone(phone: string) {
  return /^1[123456789]\d{9}$/.test(phone)
}
