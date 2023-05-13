import { Gender, newPatient } from "./types";

function isString(text: unknown): text is string {
  return typeof text === 'string'
}

function isDate(date: string): boolean {
  return Boolean(Date.parse(date));
}

function isGender(param: string): param is Gender {
  return Object.values(Gender).map(gender => gender.toString())
    .includes(param)
}

function parseGender(gender: unknown): Gender {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('incorrect or missing gender')
  }

  return gender
}

function parseDate(date: unknown): string {
  if (!isString(date) || !isDate(date)) {
    throw new Error('incorrect date: ' + date)
  }

  return date
}

function parseName(name: unknown): string {
  if (!isString(name)) {
    throw new Error('incorrect or missing name')
  }

  return name
}

function parseSsn(ssn: unknown): string {
  if (!isString(ssn)) {
    throw new Error('incorrect or missing ssn')
  }

  return ssn
}

function occupation(param: unknown): string {
  if (!isString(param)) {
    throw new Error('incorrect or missing occupation')
  }

  return param
}

function toNewPatientEntry(object: unknown): newPatient {
  if (!object || typeof object !== 'object') {
    throw new Error('incorrect or missing data')
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newPatient: newPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: occupation(object.occupation),
      entries: []
    }

    return newPatient
  }

  throw new Error('Incorrect data: a field missing');
}

export default toNewPatientEntry