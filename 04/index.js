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
  const _v = parseInt(v[field])
  return v[field].length === 4 && _v >= min && _v <= max
}

const validateMeasurementField = (field, min, max) => (v) => {
  const _v = v[field]
  const value = parseInt(_v)
  const unit = _v.substring(_v.length - 2)

  return value >= min[unit] && value <= max[unit]
}

const validateHexColorField = (field) => (v) => /^#[0-9a-f]{6}$/.test(v[field])

const validateAllowedListField = (field, allowedList) => (v) => allowedList.includes(v[field])

const validateNumericStringField = (field, length) => (v) => new RegExp(`^[0-9]{${length}}$`).test(v[field])

const validPassports = passports
  .filter(validateRequiredFields([ 'byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid' ]))
  .filter(validateYearField('byr', 1920, 2002))
  .filter(validateYearField('iyr', 2010, 2020))
  .filter(validateYearField('eyr', 2020, 2030))
  .filter(validateMeasurementField('hgt', { cm: 150, in: 59 }, { cm: 193, in: 76 }))
  .filter(validateHexColorField('hcl'))
  .filter(validateAllowedListField('ecl', [ 'amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth' ]))
  .filter(validateNumericStringField('pid', 9))

console.log(validPassports.length)
