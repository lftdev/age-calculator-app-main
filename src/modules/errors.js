export class NaNError extends Error {
  origin
  constructor (origin) {
    super('The value must be a number.')
    this.name = 'NaNError'
    this.origin = origin
  }
}
export class InvalidDayError extends Error {
  constructor () {
    super('The entered day is out of range.')
    this.name = 'InvalidDayError'
  }
}
export class InvalidMonthError extends Error {
  constructor () {
    super('The entered month does not exist.')
    this.name = 'InvalidMonthError'
  }
}
export class InvalidYearError extends Error {
  constructor () {
    super('The entered year does not exist.')
    this.name = 'InvalidYearError'
  }
}
