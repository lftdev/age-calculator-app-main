const THIRTYONE_DAYS_MONTHS = [0, 2, 4, 6, 7, 9, 11]
const THIRTY_DAYS_MONTHS = [3, 5, 8, 10]
export function dayIsValid (day: number, month: number, year: number) {
  if ((day < 1) || (day > 31)) return false
  // If the month is february, check if the day is greater than 28 or 29 in case year is leap.
  if (month === 1) {
    if ((year % 4) === 0) return day <= 29
    return day <= 28
  }
  // If the month has 31 days, check if day is greater than 31.
  if (THIRTYONE_DAYS_MONTHS.includes(month)) return day <= 31
  // If the month has 30 days, check if day is greater than 30.
  if (THIRTY_DAYS_MONTHS.includes(month)) return day <= 30
  // If the month is not february and is not included in THIRTYONE_DAYS_MONTHS or THIRTY_DAYS_MONTHS, the month is invalid.
  return false
}
export function monthIsValid (month: number, year: number) {
  if ((month < 0) || (month > 11)) return false
  // If the entered year is current year, the entered month cannot exceed the current month.
  const today = new Date()
  if (year === today.getUTCFullYear()) return month <= today.getUTCMonth()
  return true
}