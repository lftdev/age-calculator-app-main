import './scss/style.scss'
const TODAY = new Date();
(document.querySelectorAll('input[type="number"]') as NodeListOf<HTMLInputElement>).forEach((field: HTMLInputElement) => {
  if (field.id == 'year-field')
    field.oninput = (event: Event) => {
      const target = event.target as HTMLInputElement
      const value = target.value
      const year = TODAY.getFullYear()
      if (parseInt(value) > year)
        target.value = year.toString()
    }
  else
    field.oninput = (event: Event) => {
      const target = event.target as HTMLInputElement
      const value = target.value
      if (value.length > 2)
        target.value = value.substring(0, 2)
    }
})
class EmptyInputError extends Error {
  originField
  constructor(originField: HTMLInputElement) {
    super('Field is empty.')
    this.name = "EmptyInputError"
    this.originField = originField
  }
}
function checkIfEmpty(arr: HTMLInputElement[]) {
  arr.forEach((field: HTMLInputElement) => {
    if (field.value === '')
      throw new EmptyInputError(field)
    else {
      field.classList.remove('invalid');
      (field.previousElementSibling as HTMLLabelElement).classList.remove('invalid');
      (field.nextElementSibling as HTMLParagraphElement).innerHTML = ''
    }
  })
}
function getInputs() {
  const fields: HTMLInputElement[] = Array.from(document.querySelectorAll('input[type="number"]'))
  try {
    checkIfEmpty(fields)
  } catch (error) {
    if (error instanceof EmptyInputError) {
      const field = error.originField
      field.classList.add('invalid');
      (field.previousElementSibling as HTMLLabelElement).classList.add('invalid');
      (field.nextElementSibling as HTMLParagraphElement).innerHTML = 'This field is requiered.'
    }
    return
  }
  const [day, mth, yr] = fields.map((field: HTMLInputElement) => parseInt(field.value))
  return new Date(yr, mth - 1, day)
}
const birthday_form = document.querySelector('.birthday-form') as HTMLFormElement
birthday_form.onsubmit = ((event: SubmitEvent) => {
  event.preventDefault()
  const birthday = getInputs()
  if (birthday !== undefined) {
    const difference = new Date(Date.UTC(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()) - birthday.getTime())
    const years = Math.floor(((((difference.getTime() / 1000) / 60) / 60) / 24) / 365)
    const [span_years, span_months, span_days] = (document.querySelectorAll('span.number') as NodeListOf<HTMLSpanElement>)
    span_days.innerHTML = `${difference.getDate()}`
    span_months.innerHTML = `${difference.getMonth()}`
    span_years.innerHTML = `${years}`
  }
})
