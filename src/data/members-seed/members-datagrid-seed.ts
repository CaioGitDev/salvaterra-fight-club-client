import { MemberDataInterface, OptionLists } from '@/lib/types/member'

const gengerList: OptionLists[] = [
  {
    id: 1,
    text: 'Masculino',
  },
  {
    id: 2,
    text: 'Feminino',
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
    text: 'Ucraniano',
  },
  {
    id: 4,
    text: 'Espanhol',
  },
  {
    id: 5,
    text: 'Francês',
  },
  {
    id: 6,
    text: 'Inglês',
  },
  {
    id: 7,
    text: 'Alemão',
  },
  {
    id: 8,
    text: 'Italiano',
  },
  {
    id: 9,
    text: 'Russo',
  },
  {
    id: 10,
    text: 'Chinês',
  },
  {
    id: 11,
    text: 'Japonês',
  },
  {
    id: 12,
    text: 'Marroquino',
  },
  {
    id: 13,
    text: 'Paquistanês',
  },
  {
    id: 14,
    text: 'Indiano',
  },
  {
    id: 15,
    text: 'Nepal',
  },
]

const identificationDocumentList: OptionLists[] = [
  {
    id: 1,
    text: 'Cartão de Cidadão',
  },
  {
    id: 2,
    text: 'Autorização de Residência',
  },
  {
    id: 3,
    text: 'Bilhete de Identidade',
  },
  {
    id: 4,
    text: 'Passaporte',
  },
]

const relationshipDegreeList: OptionLists[] = [
  {
    id: 1,
    text: 'Pai',
  },
  {
    id: 2,
    text: 'Mãe',
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
  {
    id: 7,
    text: 'Tio',
  },
  {
    id: 8,
    text: 'Tia',
  },
]

const modalitiesList: OptionLists[] = [
  {
    id: 1,
    text: 'Muay Thai',
  },
  {
    id: 2,
    text: 'Jiu Jitsu',
  },
  {
    id: 3,
    text: 'Muay Thai + Jiu-Jitsu',
  },
  {
    id: 4,
    text: 'Jiu-Jitsu Kids',
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
    text: 'Família',
  },
  {
    id: 3,
    text: 'Estudante',
  },
  {
    id: 4,
    text: 'Administração',
  },
  {
    id: 5,
    text: 'Professor',
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
    text: 'Semestral',
  },
  {
    id: 4,
    text: 'Anual',
  },
]

export type ServiceDataType = {
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
