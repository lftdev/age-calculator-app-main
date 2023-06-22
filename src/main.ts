import './scss/style.scss'
import {NaNError, DayOutOfMonthLimitsError, InvalidMonthError, InvalidYearError} from './modules/errors'
import { monthIsInFuture, exceedsMonthDays } from './modules/date-utils'
const TODAY = new Date(Date.now());
(document.getElementById('year') as HTMLInputElement).oninput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  const year = TODAY.getFullYear()
  if (parseInt(value) > year)
    target.value = year.toString()
}
(document.getElementById('month') as HTMLInputElement).oninput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  if (value.length > 2)
    target.value = value.substring(0, 2)
}
(document.getElementById('day') as HTMLInputElement).oninput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  if (value.length > 2)
    target.value = value.substring(0, 2)
}
interface ValidInputsFormat {
  [key: string]: number
}
function getInputs() {
  const validInputs: ValidInputsFormat = {
    day: 0,
    month: 0,
    year: 0
  }
  const fields = document.querySelectorAll('input[type="number"]') as NodeListOf<HTMLInputElement>
  fields.forEach(field => {
    const value = parseInt(field.value)
    if (isNaN(value))
      throw new NaNError(field.id)
    else validInputs[field.id] = value
  })
  return validInputs
}
function validateInputs(inputs: ValidInputsFormat) {
  const keys = Object.keys(inputs)
  keys.forEach(key => {
    switch(key) {
      case 'day':
        if (inputs['day'] < 1 || exceedsMonthDays(inputs['day'], inputs['month'], inputs['year']))
          throw new DayOutOfMonthLimitsError()
          break
      case 'month':
        if ((inputs['month'] < 0) || (monthIsInFuture(inputs['month'], inputs['year'])))
          throw new InvalidMonthError()
          break
      case 'year':
        if ((inputs['year'] < 1900) || (inputs['year'] > TODAY.getFullYear()))
          throw new InvalidYearError()
    }
  });
}
function calculate(birthday: Date) {
  // Get birthday and today's date difference in milliseconds per day
  const daysInMills = (((new Date(Date.UTC(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()) - birthday.getTime()).getTime() / 1000) / 60) / 60) / 24
  const years = Math.floor(daysInMills / 365)
  // Get remaining months after the birthday
  const months = Math.floor((daysInMills / (365 / 12)) - 12 * years)
  // Get remaining days after the birthday
  const days = Math.floor(daysInMills - 365 * years - (365 / 12) * months)
  printResult(days, months, years)
}
function printResult(days: number, months: number, years: number) {
  const [span_years, span_months, span_days] = (document.querySelectorAll('span.number') as NodeListOf<HTMLSpanElement>)
  span_days.innerHTML = `${days}`
  span_months.innerHTML = `${months}`
  span_years.innerHTML = `${years}`
}
(document.querySelector('.birthday-form') as HTMLFormElement).onsubmit = ((event: SubmitEvent) => {
  event.preventDefault()
  try {
    const inputs = getInputs()
    validateInputs(inputs)
    calculate(new Date(inputs['year'], inputs['month'] - 1, inputs['day']))
    const columns = document.querySelectorAll('span.form-column') as NodeListOf<HTMLSpanElement>
    columns.forEach(column => {
      column.classList.remove('invalid')
    });
  } catch(error: any) {
    switch (error.name) {
      case 'NaNError': {
        const column = document.querySelector(`#${error.origin}-input-column`) as HTMLSpanElement
        column.classList.add('invalid');
        (column.lastElementChild as HTMLParagraphElement).innerHTML = 'You must enter a number.'
        break
      }
      case 'DayOutOfMonthLimitsError': {
        const column = document.querySelector('#day-input-column') as HTMLSpanElement
        column.classList.add('invalid');
        (column.lastElementChild as HTMLParagraphElement).innerHTML = 'Input .'
        break
      }
      case 'InvalidMonthError': {
        const column = document.querySelector('#month-input-column') as HTMLSpanElement
        column.classList.add('invalid');
        (column.lastElementChild as HTMLParagraphElement).innerHTML = 'Month is not valid.'
        break
      }
      case 'InvalidYearError': {
        const column = document.querySelector('#year-input-column') as HTMLSpanElement
        column.classList.add('invalid');
        (column.lastElementChild as HTMLParagraphElement).innerHTML = 'Year is not valid.'
        break
      }
    }
  }
})
