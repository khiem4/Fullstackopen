export interface diagnose {
  code: string,
  name: string,
  latin?: string,
}

export interface patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string
}

export type newPatient = Omit<patient, 'id'>

export type excludeSsnPatient = Omit<patient, 'ssn'>

