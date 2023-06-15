import './scss/style.scss'

const fields: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="number"]')
fields.forEach((field: HTMLInputElement) => {
  const today = new Date()
  if (field.id == 'year-field')
    field.oninput = (event: Event) => {
      const target = event.target as HTMLInputElement
      const value = target.value
      const year = today.getFullYear()
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
const birthday_form = document.querySelector('.birthday-form') as HTMLFormElement
birthday_form.onsubmit = ((event: SubmitEvent) => {
  event.preventDefault()
  const today = new Date()
  const [day_field, month_field, year_field] = fields
  let year = today.getFullYear() - parseInt(year_field.value)
  const month = (today.getMonth() + 1) - parseInt(month_field.value)
  const day = today.getDate() - parseInt(day_field.value)
  const [span_years, span_months, span_days] = document.querySelectorAll('span.number') as NodeListOf<HTMLSpanElement>
  span_days.innerHTML = `${day < 0? 0 : day}`
  span_months.innerHTML = `${month < 0? 0 : month}`
  span_years.innerHTML = `${year}`
})
