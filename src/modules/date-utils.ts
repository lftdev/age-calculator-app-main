const THIRTYONE_DAYS_MONTHS = [0, 2, 4, 6, 7, 9, 11];
const THIRTY_DAYS_MONTHS = [3, 5, 8, 10];
export function exceedsMonthDays(day: number, month: number, year: number): boolean {
  if (THIRTYONE_DAYS_MONTHS.includes(month))
    return day > 31
  else if (THIRTY_DAYS_MONTHS.includes(month))
    return day > 30
  else if ((year % 4) == 0)
    return day > 29
  return day > 28
}
export function monthIsInFuture(month: number, year: number): boolean {
  const today = new Date()
  if (year == today.getUTCFullYear())
    return month > today.getUTCMonth()
  return false
}
export function yearIsInFuture(year: number): boolean {
  return year > new Date().getUTCFullYear()
}
