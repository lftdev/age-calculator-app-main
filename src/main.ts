import './scss/style.scss'
const TODAY = new Date()
const fields: HTMLInputElement[] = Array.from(document.querySelectorAll('input[type="number"]'))
fields.forEach((field: HTMLInputElement) => {
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
function getBirthdayFromInputs() {
  const [bday, bmth, byr] = fields.map((field: HTMLInputElement) => parseInt(field.value))
  return new Date(byr, bmth - 1, bday)
}
const birthday_form = document.querySelector('.birthday-form') as HTMLFormElement
birthday_form.onsubmit = ((event: SubmitEvent) => {
  event.preventDefault()
  const birthday = getBirthdayFromInputs()
  const difference = new Date(Date.UTC(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()) - birthday.getTime())
  const years = Math.floor(((((difference.getTime() / 1000) / 60) / 60) / 24) / 365)
  const [span_years, span_months, span_days] = (document.querySelectorAll('span.number') as NodeListOf<HTMLSpanElement>)
  span_days.innerHTML = `${difference.getDate()}`
  span_months.innerHTML = `${difference.getMonth()}`
  span_years.innerHTML = `${years}`
})
