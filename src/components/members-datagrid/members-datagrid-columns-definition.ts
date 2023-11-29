import { ServiceDataType } from '@/data/members-seed/members-datagrid-seed'

export default function getColumnsDefinition(serviceData: ServiceDataType) {
  return [
    {
      dataField: 'member.id',
      visible: false,
    },
    {
      dataField: 'member.membershipNumber',
      caption: 'Nº Socio',
    },
    {
      dataField: 'member.fullName',
      caption: 'Nome Completo',
    },
    {
      dataField: 'member.gender_id',
      caption: 'genero',
      lookup: {
        dataSource: serviceData.getGengerList(),
        valueExpr: 'id',
        displayExpr: 'text',
      },
    },
    {
      dataField: 'member.dateOfBirth',
      caption: 'Data Nascimento',
      visible: false,
    },
    {
      dataField: 'member.nationality_id',
      caption: 'Nacionalidade',
      lookup: {
        dataSource: serviceData.getNacionalitiesList(),
        valueExpr: 'id',
        displayExpr: 'text',
      },
    },
    {
      dataField: 'member.placeOfBirth',
      visible: false,
    },
    {
      dataField: 'member.contact',
      visible: false,
    },
    {
      dataField: 'member.email',
      visible: false,
    },
    {
      dataField: 'memberAddress.address',
      visible: false,
    },
    {
      dataField: 'memberAddress.city',
      visible: false,
    },
    {
      dataField: 'memberAddress.county',
      visible: false,
    },
    {
      dataField: 'memberAddress.parish',
      visible: false,
    },
    {
      dataField: 'memberAddress.postalCode',
      visible: false,
    },
    {
      dataField: 'memberIdentificationDocument.identificationDocument_id',
      caption: 'Doc. Identificação',
      lookup: {
        dataSource: serviceData.getIdentificationDocumentList(),
        valueExpr: 'id',
        displayExpr: 'text',
      },
    },
    {
      dataField: 'memberIdentificationDocument.identificationNumber',
      visible: false,
    },
    {
      dataField: 'memberIdentificationDocument.expireDate',
      visible: false,
    },
    {
      dataField: 'memberIdentificationDocument.taxIdentificationNumber',
      visible: false,
    },

    {
      dataField: 'memberGuardian.fullName',
      visible: false,
    },
    {
      dataField: 'memberGuardian.contact',
      visible: false,
    },
    {
      dataField: 'memberGuardian.relationshipDegree_id',
      visible: false,
      lookup: {
        dataSource: serviceData.getRelationshipDegreeListList(),
        valueExpr: 'id',
        displayExpr: 'text',
      },
    },
    {
      dataField: 'memberGuardian.address',
      visible: false,
    },
    {
      dataField: 'memberGuardian.city',
      visible: false,
    },
    {
      dataField: 'memberGuardian.county',
      visible: false,
    },
    {
      dataField: 'memberGuardian.parish',
      visible: false,
    },
    {
      dataField: 'memberGuardian.postalCode',
      visible: false,
    },
    {
      dataField: 'member.modality_id',
      visible: true,
      caption: 'Modalidade',
      lookup: {
        dataSource: serviceData.getModalitiesList(),
        valueExpr: 'id',
        displayExpr: 'text',
      },
    },
    {
      dataField: 'member.frequency_id',
      visible: true,
      caption: 'Frequência',
      lookup: {
        dataSource: serviceData.getFrequenciesList(),
        valueExpr: 'id',
        displayExpr: 'text',
      },
    },
    {
      dataField: 'member.memberType_id',
      visible: false,
      caption: 'Tipo de inscrição',
      lookup: {
        dataSource: serviceData.getMemeberTypesList(),
        valueExpr: 'id',
        displayExpr: 'text',
      },
    },
    {
      dataField: 'member.paymentFrequency_id',
      visible: true,
      caption: 'Periodicidade de pagamentos',
      lookup: {
        dataSource: serviceData.getPaymentFrequencyList(),
        valueExpr: 'id',
        displayExpr: 'text',
      },
    },
    {
      dataField: 'member.termsAndConditions',
      visible: false,
    },
    {
      dataField: 'member.healthDeclaration',
      visible: false,
    },
  ]
}
