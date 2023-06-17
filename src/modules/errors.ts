export class NaNError extends Error {
  origin
  constructor(origin: string) {
    super('The value must be enter a number.')
    this.name = 'NaNError'
    this.origin = origin
  }
}
export class DayOutOfMonthLimitsError extends Error {
  constructor() {
    super('The entered day is out of the month range.')
    this.name = 'DayOutOfMonthLimitsError'
  }
}
export class InvalidMonthError extends Error {
  constructor() {
    super('The entered month does not exist.')
    this.name = 'InvalidMonthError'
  }
}
export class InvalidYearError extends Error {
  constructor() {
    super('The entered year does not exist.')
    this.name = 'InvalidYearError'
  }
}
