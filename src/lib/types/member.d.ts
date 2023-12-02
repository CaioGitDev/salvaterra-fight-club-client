export type OptionLists = {
  id: number
  text: string
}

export type Member = {
  id: string
  membershipNumber?: number
  photoUrl: string
  fullName: string
  gender_id: number
  dateOfBirth: Date
  nationality_id: number
  placeOfBirth: string
  contact: string
  email: string
  modality_id: number
  frequency_id: number
  memberType_id: number
  paymentFrequency_id: number
  termsAndConditions: boolean
  healthDeclaration: boolean
  createdAt: Date
  updatedAt?: Date
  updatedBy?: string
  active: boolean
}
export type MemberIdentificationDocument = {
  id: string
  memberId: string
  identityDocumentTypeId: number
  identificationNumber: string
  expireDate: Date
  taxIdentificationNumber: string
  createdAt: Date
  updatedAt?: Date
  updatedBy?: string
}

export type MemberAddress = {
  id: string
  memberId: string
  address: string
  city: string
  county: string
  parish: string
  postalCode: string
}

export type MemberGuardian = {
  id: string
  memberId: string
  fullName: string
  contact: string
  relationshipDegreeId: number
  address: string
  city: string
  county: string
  parish: string
  postalCode: string
}

export type MemberModality = {
  id: string
  member_id: string
  modality_id: string
  modality_name: string
}

export type MemberDataInterface = {
  id: string
  membershipNumber?: number
  photoUrl: string
  fullName: string
  genderId: number
  dateOfBirth: Date
  nationalityId: number
  placeOfBirth: string
  contact: string
  email: string
  modalityId: number
  frequencyId: number
  memberTypeId: number
  paymentFrequencyId: number
  termsAndConditions: boolean
  healthDeclaration: boolean
  createdAt: Date
  updatedAt?: Date
  updatedBy?: string
  active: boolean
  IdentityDocument: MemberIdentificationDocument
  Address: MemberAddress
  Guardian?: MemberGuardian
}
