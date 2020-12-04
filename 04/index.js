const fs = require('fs')
const data = fs.readFileSync('data.txt', 'utf8').split('\n\n').filter(String)

const passports = data.map((lines) => 
  lines
    .split('\n')
    .join(' ')
    .split(/\s+/)
    .map((value) => value.split(':'))
    .reduce((accum, [ key, value ]) => ({ ...accum, [key]: value }), {})
)

const validateRequiredFields = (fields) => (v) => {
  const keys = Object.keys(v)

  return fields.every((field) => keys.includes(field))
}

const validateYearField = (field, min, max) => (v) => {
  const value = parseInt(v[field])

  return v[field].length === 4 && value >= min && value <= max
}

const validateMeasurementField = (field, min, max) => (v) => {
  const [ _, rawValue, unit ] = /^(\d+)(\w+)$/.exec(v[field])
  const value = parseInt(rawValue)

  return value >= min[unit] && value <= max[unit]
}

const validateHexColorField = (field) => (v) => /^#[0-9a-f]{6}$/.test(v[field])

const validateAllowedListField = (field, allowedList) => (v) => allowedList.includes(v[field])

const validateNumericStringField = (field, length) => (v) => new RegExp(`^[0-9]{${length}}$`).test(v[field])

const combineValidators= (...validators) => (v) => validators.reduce((accum, next) => accum && next(v), true)

const validPassports = passports.filter(combineValidators(
  validateRequiredFields([ 'byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid' ]),
  validateYearField('byr', 1920, 2002),
  validateYearField('iyr', 2010, 2020),
  validateYearField('eyr', 2020, 2030),
  validateMeasurementField('hgt', { cm: 150, in: 59 }, { cm: 193, in: 76 }),
  validateHexColorField('hcl'),
  validateAllowedListField('ecl', [ 'amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth' ]),
  validateNumericStringField('pid', 9)
))

console.log(validPassports.length)
