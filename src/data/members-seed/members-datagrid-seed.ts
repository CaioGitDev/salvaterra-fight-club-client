import { MemberDataInterface, OptionLists } from '@/lib/types/member'

const membersData: MemberDataInterface[] = [
  {
    member: {
      id: '1',
      membershipNumber: 12345,
      photoUrl: 'https://example.com/photo1.jpg',
      fullName: 'John Doe',
      gender_id: 1,
      dateOfBirth: new Date('1990-01-15'),
      nationality_id: 1,
      placeOfBirth: 'Lisbon',
      contact: '123456789',
      email: 'john.doe@example.com',
      modality_id: 3,
      frequency_id: 1,
      paymentFrequency_id: 2,
      memberType_id: 1,
      termsAndConditions: true,
      healthDeclaration: true,
      createdAt: new Date('2022-01-01'),
      updatedAt: new Date('2022-02-15'),
      updatedBy: 'admin',
      active: true,
    },
    memberIdentificationDocument: {
      id: '1',
      member_id: '1',
      identificationDocument_id: 2,
      identificationNumber: 'AB123456',
      expireDate: new Date('2025-01-15'),
      taxIdentificationNumber: 67890,
      createdAt: new Date('2022-01-02'),
      updatedAt: new Date('2022-02-10'),
      updatedBy: 'admin',
    },
    memberAddress: {
      id: '1',
      member_id: '1',
      address: '123 Main St',
      city: 'Lisbon',
      county: 'Lisbon',
      parish: 'Parish A',
      postalCode: '12345-678',
    },
    memberGuardian: {
      id: '1',
      member_id: '1',
      fullName: 'Jane Doe',
      contact: '987654321',
      relationshipDegree_id: 2,
      address: '456 Broad St',
      city: 'Lisbon',
      county: 'Lisbon',
      parish: 'Parish B',
      postalCode: '5421-876',
    },
  },
  {
    member: {
      id: '2',
      membershipNumber: 54321,
      photoUrl: 'https://example.com/photo2.jpg',
      fullName: 'Alice Smith',
      gender_id: 2,
      dateOfBirth: new Date('1985-08-20'),
      nationality_id: 3,
      placeOfBirth: 'New York',
      contact: '987654321',
      email: 'alice.smith@example.com',
      modality_id: 2,
      frequency_id: 2,
      paymentFrequency_id: 3,
      memberType_id: 2,
      termsAndConditions: true,
      healthDeclaration: true,
      createdAt: new Date('2022-01-05'),
      updatedAt: new Date('2022-02-20'),
      updatedBy: 'admin',
      active: true,
    },
    memberIdentificationDocument: {
      id: '2',
      member_id: '2',
      identificationDocument_id: 4,
      identificationNumber: 'CD987654',
      expireDate: new Date('2024-08-20'),
      taxIdentificationNumber: 54321,
      createdAt: new Date('2022-01-08'),
      updatedAt: new Date('2022-03-01'),
      updatedBy: 'admin',
    },
    memberAddress: {
      id: '2',
      member_id: '2',
      address: '789 Oak St',
      city: 'New York',
      county: 'Manhattan',
      parish: 'Parish C',
      postalCode: '6790-123',
    },
  },
]

export const memberDataDefault: MemberDataInterface = {
  member: {
    id: '',
    membershipNumber: 0,
    photoUrl: '',
    fullName: '',
    gender_id: 0,
    dateOfBirth: new Date(),
    nationality_id: 0,
    placeOfBirth: '',
    contact: '',
    email: '',
    modality_id: 0,
    frequency_id: 0,
    paymentFrequency_id: 0,
    memberType_id: 0,
    termsAndConditions: false,
    healthDeclaration: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    updatedBy: '',
    active: true,
  },
  memberIdentificationDocument: {
    id: '',
    member_id: '',
    identificationDocument_id: 0,
    identificationNumber: '',
    expireDate: new Date(),
    taxIdentificationNumber: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    updatedBy: '',
  },
  memberAddress: {
    id: '',
    member_id: '',
    address: '',
    city: '',
    county: '',
    parish: '',
    postalCode: '',
  },
  memberGuardian: {
    id: '',
    member_id: '',
    fullName: '',
    contact: '',
    relationshipDegree_id: 0,
    address: '',
    city: '',
    county: '',
    parish: '',
    postalCode: '',
  },
}

const gengerList: OptionLists[] = [
  {
    id: 1,
    text: 'Homem',
  },
  {
    id: 2,
    text: 'Mulher',
  },
  {
    id: 3,
    text: 'Outro',
  },
]

const nacionalitiesList: OptionLists[] = [
  {
    id: 1,
    text: 'Português',
  },
  {
    id: 2,
    text: 'Brasileiro',
  },
  {
    id: 3,
    text: 'Inglês',
  },
  {
    id: 4,
    text: 'Ucraniano',
  },
  {
    id: 5,
    text: 'Espanhol',
  },
  {
    id: 6,
    text: 'Alemão',
  },
  {
    id: 7,
    text: 'Marroquino',
  },
  {
    id: 8,
    text: 'Russo',
  },
]

const identificationDocumentList: OptionLists[] = [
  {
    id: 1,
    text: 'Cartão de Cidadão',
  },
  {
    id: 2,
    text: 'Bilhete de identidade',
  },
  {
    id: 3,
    text: 'Cartão de residência',
  },
  {
    id: 4,
    text: 'Passaporte',
  },
  {
    id: 5,
    text: 'Autorização',
  },
  {
    id: 6,
    text: 'Título de residência',
  },
]

const relationshipDegreeList: OptionLists[] = [
  {
    id: 1,
    text: 'Mãe',
  },
  {
    id: 2,
    text: 'Pai',
  },
  {
    id: 3,
    text: 'Irmão',
  },
  {
    id: 4,
    text: 'Irma',
  },
  {
    id: 5,
    text: 'Avó',
  },
  {
    id: 6,
    text: 'Avô',
  },
]

const modalitiesList: OptionLists[] = [
  {
    id: 1,
    text: 'Muay Thai',
  },
  {
    id: 2,
    text: 'Jiu-Jitsu',
  },
  {
    id: 3,
    text: 'Muay Thai/Jiu-Jitsu',
  },
]

const frequencyList: OptionLists[] = [
  {
    id: 1,
    text: '3x Semana',
  },
  {
    id: 2,
    text: '5x Semana',
  },
]

const memberTypeList: OptionLists[] = [
  {
    id: 1,
    text: 'Normal',
  },
  {
    id: 2,
    text: 'Estudante',
  },
  {
    id: 3,
    text: 'Família',
  },
]

const paymentFrequencyList: OptionLists[] = [
  {
    id: 1,
    text: 'Mensal',
  },
  {
    id: 2,
    text: 'Trimestral',
  },
  {
    id: 3,
    text: 'Anual',
  },
]

export type ServiceDataType = {
  getMembers(): MemberDataInterface[]
  getGengerList(): OptionLists[]
  getNacionalitiesList(): OptionLists[]
  getIdentificationDocumentList(): OptionLists[]
  getRelationshipDegreeListList(): OptionLists[]
  getModalitiesList(): OptionLists[]
  getFrequenciesList(): OptionLists[]
  getMemeberTypesList(): OptionLists[]
  getPaymentFrequencyList(): OptionLists[]
}

export const serviceData: ServiceDataType = {
  getMembers() {
    return membersData
  },
  getGengerList() {
    return gengerList
  },
  getNacionalitiesList() {
    return nacionalitiesList
  },
  getIdentificationDocumentList() {
    return identificationDocumentList
  },
  getRelationshipDegreeListList() {
    return relationshipDegreeList
  },
  getModalitiesList() {
    return modalitiesList
  },
  getFrequenciesList() {
    return frequencyList
  },
  getMemeberTypesList() {
    return memberTypeList
  },
  getPaymentFrequencyList() {
    return paymentFrequencyList
  },
}
