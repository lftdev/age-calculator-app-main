import { NaNError, InvalidDayError, InvalidMonthError, InvalidYearError } from './modules/errors.js'
import { monthIsValid, dayIsValid } from './modules/date-validation.js'
import './style.css'
// Create constant for get today's date.
const TODAY = new Date(Date.now())
// Limit user input on each input field.
document.getElementById('year').oninput = event => {
  const target = event.target
  const value = target.value
  const year = TODAY.getFullYear()
  if (parseInt(value) > year) target.value = year.toString()
}
document.getElementById('month').oninput = event => {
  const target = event.target
  const value = target.value
  if (value.length > 2) target.value = value.substring(0, 2)
}
document.getElementById('day').oninput = event => {
  const target = event.target
  const value = target.value
  if (value.length > 2) target.value = value.substring(0, 2)
}
// Add submit listener to birthday-form.
document.getElementById('birthday-form').onsubmit = event => {
  event.preventDefault()
  // Remove invalidations.
  document.querySelectorAll('span.invalid').forEach(column => {
    column.classList.remove('invalid')
    column.lastElementChild.innerHTML = ''
  })
  try {
    const { day, month, year } = parseInputs()
    validateInputs(day, month, year)
    const result = calculate(new Date(year, month, day))
    printResult(result)
  } catch (error) {
    let column
    switch (error.name) {
      case 'NaNError':
        column = document.querySelector(`#${error.origin}-input-column`)
        break
      case 'InvalidDayError':
        column = document.querySelector('#day-input-column')
        break
      case 'InvalidMonthError':
        column = document.querySelector('#month-input-column')
        break
      case 'InvalidYearError':
        column = document.querySelector('#year-input-column')
    }
    column.classList.add('invalid')
    column.lastElementChild.innerHTML = error.message
  }
}
function parseInputs () {
  const numericInputs = {
    day: 0,
    month: 0,
    year: 0
  }
  document.querySelectorAll('input[type="number"]')
    .forEach(field => {
      const value = parseInt(field.value)
      if (isNaN(value)) throw new NaNError(field.id)
      else numericInputs[field.id] = value
    })
  numericInputs.month--
  return numericInputs
}
function validateInputs (day, month, year) {
  if ((year < 1900) || (year > TODAY.getFullYear())) throw new InvalidYearError()
  if (!monthIsValid(month, year)) throw new InvalidMonthError()
  if (!dayIsValid(day, month, year)) throw new InvalidDayError()
}
function calculate (birthday) {
  // Get difference between today and birthday in milliseconds per day.
  const daysInMills = (((new Date(Date.UTC(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()) - birthday.getTime()).getTime() / 1000) / 60) / 60) / 24
  const years = Math.floor(daysInMills / 365)
  console.log('days ', TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate())
  // Get remaining months after the current year's birthday.
  const months = Math.floor((daysInMills / (365 / 12)) - 12 * years)
  // Get remaining days after the current year's birthday.
  const days = Math.floor(daysInMills - 365 * years - (365 / 12) * months)
  return { days, months, years }
}
function printResult (date) {
  const { days, months, years } = date
  const [spanYears, spanMonths, spanDays] = document.querySelectorAll('span.number')
  spanDays.innerHTML = `${days}`
  spanMonths.innerHTML = `${months}`
  spanYears.innerHTML = `${years}`
}
