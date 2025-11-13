export function today(): string {
  return new Date().toISOString().slice(0, 10) // YYYY-MM-DD
}
export function nowHHmm(): string {
  return new Date().toTimeString().slice(0, 5) // HH:MM
}
