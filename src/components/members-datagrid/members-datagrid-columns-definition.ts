import { ServiceDataType } from '@/data/members-seed/members-datagrid-seed'

export default function getColumnsDefinition(serviceData: ServiceDataType) {
  return [
    {
      dataField: 'id',
      visible: false,
    },
    {
      dataField: 'membershipNumber',
      caption: 'Nº Socio',
    },
    {
      dataField: 'fullName',
      caption: 'Nome Completo',
      minWidth: 400,
    },
    {
      dataField: 'genderId',
      caption: 'genero',
      lookup: {
        dataSource: serviceData.getGengerList(),
        valueExpr: 'id',
        displayExpr: 'text',
      },
    },
    {
      dataField: 'dateOfBirth',
      caption: 'Data Nascimento',
      visible: false,
    },
    {
      dataField: 'nationalityId',
      caption: 'Nacionalidade',
      visible: false,
      lookup: {
        dataSource: serviceData.getNacionalitiesList(),
        valueExpr: 'id',
        displayExpr: 'text',
      },
    },
    {
      dataField: 'placeOfBirth',
      visible: false,
    },
    {
      dataField: 'contact',
      visible: false,
    },
    {
      dataField: 'email',
      visible: false,
    },
    {
      dataField: 'Address.address',
      visible: false,
    },
    {
      dataField: 'Address.city',
      visible: false,
    },
    {
      dataField: 'Address.county',
      visible: false,
    },
    {
      dataField: 'Address.parish',
      visible: false,
    },
    {
      dataField: 'Address.postalCode',
      visible: false,
    },
    {
      dataField: 'IdentityDocument.identityDocumentTypeId',
      caption: 'Doc. Identificação',
      visible: false,
      lookup: {
        dataSource: serviceData.getIdentificationDocumentList(),
        valueExpr: 'id',
        displayExpr: 'text',
      },
    },
    {
      dataField: 'IdentityDocument.identificationNumber',
      visible: false,
    },
    {
      dataField: 'IdentityDocument.expireDate',
      visible: false,
    },
    {
      dataField: 'IdentityDocument.taxIdentificationNumber',
      visible: false,
    },

    {
      dataField: 'Guardian.fullName',
      visible: false,
    },
    {
      dataField: 'Guardian.contact',
      visible: false,
    },
    {
      dataField: 'Guardian.relationshipDegreeId',
      visible: false,
      lookup: {
        dataSource: serviceData.getRelationshipDegreeListList(),
        valueExpr: 'id',
        displayExpr: 'text',
      },
    },
    {
      dataField: 'Guardian.address',
      visible: false,
    },
    {
      dataField: 'Guardian.city',
      visible: false,
    },
    {
      dataField: 'Guardian.county',
      visible: false,
    },
    {
      dataField: 'Guardian.parish',
      visible: false,
    },
    {
      dataField: 'Guardian.postalCode',
      visible: false,
    },
    {
      dataField: 'modalityId',
      visible: true,
      caption: 'Modalidade',
      lookup: {
        dataSource: serviceData.getModalitiesList(),
        valueExpr: 'id',
        displayExpr: 'text',
      },
    },
    {
      dataField: 'frequencyId',
      visible: true,
      caption: 'Frequência',
      lookup: {
        dataSource: serviceData.getFrequenciesList(),
        valueExpr: 'id',
        displayExpr: 'text',
      },
    },
    {
      dataField: 'memberTypeId',
      visible: false,
      caption: 'Tipo de inscrição',
      lookup: {
        dataSource: serviceData.getMemeberTypesList(),
        valueExpr: 'id',
        displayExpr: 'text',
      },
    },
    {
      dataField: 'paymentFrequencyId',
      visible: false,
      caption: 'Periodicidade de pagamentos',
      lookup: {
        dataSource: serviceData.getPaymentFrequencyList(),
        valueExpr: 'id',
        displayExpr: 'text',
      },
    },
    {
      dataField: 'termsAndConditions',
      visible: false,
    },
    {
      dataField: 'healthDeclaration',
      visible: false,
    },
  ]
}
