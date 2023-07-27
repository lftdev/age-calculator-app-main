import { NaNError, InvalidDayError, InvalidMonthError, InvalidYearError } from './modules/errors.js'
import { monthIsValid, dayIsValid } from './modules/date-validation.ts'
import './style.css'
// Create constant for get today's date.
const TODAY = new Date(Date.now());
// Add submit listener to birthday-form.
const form = document.getElementById('birthday-form')
if (form instanceof HTMLFormElement)
  form.onsubmit = event => {
    event.preventDefault()
    // Remove invalidations.
    document.querySelectorAll('span.invalid').forEach(column => {
      column.classList.remove('invalid')
      const p = column.lastElementChild
      if (p instanceof HTMLParagraphElement)
        p.innerHTML = ''
    })
    try {
      const { day, month, year } = parseInputs()
      validateInputs(day, month, year)
      const result = calculate(new Date(year, month, day))
      printResult(result)
    } catch (error) {
      const column = document.querySelector(`#${error.origin}-input-column`)
      if (column instanceof HTMLSpanElement) {
        column.classList.add('invalid');
        (column.lastElementChild as HTMLParagraphElement).innerHTML = error.message
      }
    }
  }
function parseInputs () {
  const numericInputs = {
    day: 0,
    month: 0,
    year: 0
  }
  document.querySelectorAll('input[type="number"]')
    .forEach((field) => {
      if (field instanceof HTMLInputElement) {
        const value = parseInt(field.value)
        if (isNaN(value)) throw new NaNError(field.id)
        else numericInputs[field.id] = value
      }
    })
  numericInputs.month--
  return numericInputs
}
function validateInputs (day: number, month: number, year: number) {
  if ((year < 1900) || (year > TODAY.getFullYear())) throw new InvalidYearError()
  if (!monthIsValid(month, year)) throw new InvalidMonthError()
  if (!dayIsValid(day, month, year)) throw new InvalidDayError()
}
function calculate (birthday: Date) {
  // Get difference between today and birthday in milliseconds per day.
  const daysInMills = (((new Date(Date.UTC(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()) - birthday.getTime()).getTime() / 1000) / 60) / 60) / 24
  const years = Math.floor(daysInMills / 365)
  console.log('days ', TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate())
  // Get remaining months after the current year's birthday.
  const months = Math.floor((daysInMills / (365 / 12)) - 12 * years)
  // Get remaining days after the current year's birthday.
  const days = Math.floor(daysInMills - 365 * years - (365 / 12) * months)
  return {days, months, years}
}
function printResult (date: {days: number, months: number, years: number}) {
  const {days, months, years} = date
  const [spanYears, spanMonths, spanDays] = document.querySelectorAll('span.number')
  spanDays.innerHTML = `${days}`
  spanMonths.innerHTML = `${months}`
  spanYears.innerHTML = `${years}`
}