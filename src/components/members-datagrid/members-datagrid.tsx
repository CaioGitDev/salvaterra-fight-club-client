'use client'
import '@/theme/dx.material.salvaterra-fight-club-theme.css'
import { serviceData } from '@/data/members-seed/members-datagrid-seed'
import { MemberDataInterface } from '@/lib/types/member'
import { DataGrid } from 'devextreme-react'
import CustomStore from 'devextreme/data/custom_store'
import { useCallback, useEffect, useRef, useState } from 'react'
import getColumnsDefinition from './members-datagrid-columns-definition'
import {
  Editing,
  FilterRow,
  GroupPanel,
  HeaderFilter,
  Scrolling,
  Popup,
  Form,
  PatternRule,
  Item as ItemDataGrid,
  Toolbar,
  SearchPanel,
  Export,
  StateStoring,
} from 'devextreme-react/data-grid'
import {
  EmailRule,
  Item,
  RequiredRule,
  StringLengthRule,
} from 'devextreme-react/form'
import config from 'devextreme/core/config'
import Button from 'devextreme-react/button'
import { createStore } from 'devextreme-aspnet-data-nojquery'

config({
  editorStylingMode: 'underlined',
})

const exportFormats = ['xlsx', 'pdf']

const datepickOptions = {
  displayFormat: 'dd-MM-yyyy',
  openOnFieldClick: true,
  type: 'date',
}

const phoneNumberOptions = {
  mask: '+351 000000000',
  maskRules: {
    X: /^\+3519[1236]\d{7}$/,
  },
  maskInvalidMessage: 'Número de telemovel deve ter o formato correto',
}

const postalCodeOptions = {
  mask: '0000-000',
  maskRules: {
    X: /^\d{4}-\d{3}$/,
  },
  maskInvalidMessage: 'Código postal deve ter o formato correto',
}
const apiUrl = 'http://localhost:3333'

const MembersDataGrid = () => {
  const [gridDataSource, setGridDataSource] =
    useState<CustomStore<MemberDataInterface, string>>()

  const gridRef = useRef<DataGrid>(null)

  const handleRefreshClick = useCallback(() => {
    gridRef.current?.instance.refresh()
  }, [])

  useEffect(() => {
    setGridDataSource(
      new CustomStore({
        key: 'id',
        load: async () => {
          const response = await fetch(`${apiUrl}/members`, {
            headers: {
              Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMTA3YTgzNS1kYzNmLTQ5OGItYWJlZS1kOTM1NDJmYTg1YjYiLCJpYXQiOjE3MDE0NDQyODR9.jcIWRbC3lWJR2wyJ8SKUzn3hsG5Ti8ZwhQXSWuP1bFLefiOoUGRQDPfrcTthRDg-6PWg5xiuHI6CBNvC460R3wO7ou30_ejfqZAVocI09S7id8eq8kaoqJTpvEHHmRk5_iCA8E-Vu7g6L1HO7DQxwrYjS_y8qjOEFtb2-xd-IRQ-ncRJLvKZC1fQzrE2Ckskc125jJtag-GaCi_M3d-yCKkStZrQePvm37KnaSgeuPJqmH_dYFtflyaSc2umBiShhHJ7Nve7G_srjXRT6-UC2KVlRuBuojjPetz_wCOH0hWigJ6QWy7r90moXMETrQPV46uXAN8eewXUBXyxNgd3Ng`,
            },
          })

          const { members } = await response.json()
          // transfor members to MemberDataInterface
          const membersDataInterface = members.map((member: any) => {
            return {
              id: member.id,
              membershipNumber: member.membershipNumber,
              photoUrl: member.photoUrl,
              fullName: member.fullName,
              genderId: member.genderId,
              dateOfBirth: member.dateOfBirth,
              nationalityId: member.nationalityId,
              placeOfBirth: member.placeOfBirth,
              contact: member.contact,
              email: member.email,
              Address: {
                address: member.Address[0].address,
                city: member.Address[0].city,
                county: member.Address[0].county,
                parish: member.Address[0].parish,
                postalCode: member.Address[0].postalCode,
              },
              IdentityDocument: {
                identityDocumentTypeId:
                  member.IdentityDocument[0].identityDocumentTypeId,
                identificationNumber:
                  member.IdentityDocument[0].identificationNumber,
                expireDate: member.IdentityDocument[0].expireDate,
                taxIdentificationNumber:
                  member.IdentityDocument[0].taxIdentificationNumber,
              },
              Guardian: {
                fullName: member.Guardian[0]?.fullName,
                contact: member.Guardian[0]?.contact,
                relationshipDegreeId: member.Guardian[0]?.relationshipDegreeId,
                address: member.Guardian[0]?.address,
                city: member.Guardian[0]?.city,
                county: member.Guardian[0]?.county,
                parish: member.Guardian[0]?.parish,
                postalCode: member.Guardian[0]?.postalCode,
              },
              active: member.active,
              createdAt: member.createdAt,
              updatedAt: member.updatedAt,
              frequencyId: member.frequencyId,
              healthDeclaration: member.healthDeclaration,
              memberTypeId: member.memberTypeId,
              modalityId: member.modalityId,
              paymentFrequencyId: member.paymentFrequencyId,
              termsAndConditions: member.termsAndConditions,
              updatedBy: member.updatedBy,
            }
          })
          return membersDataInterface
        },
        insert: async (values) => {
          const response = await fetch(`${apiUrl}/members`, {
            headers: {
              'content-type': 'application/json',
              Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMTA3YTgzNS1kYzNmLTQ5OGItYWJlZS1kOTM1NDJmYTg1YjYiLCJpYXQiOjE3MDE0NDQyODR9.jcIWRbC3lWJR2wyJ8SKUzn3hsG5Ti8ZwhQXSWuP1bFLefiOoUGRQDPfrcTthRDg-6PWg5xiuHI6CBNvC460R3wO7ou30_ejfqZAVocI09S7id8eq8kaoqJTpvEHHmRk5_iCA8E-Vu7g6L1HO7DQxwrYjS_y8qjOEFtb2-xd-IRQ-ncRJLvKZC1fQzrE2Ckskc125jJtag-GaCi_M3d-yCKkStZrQePvm37KnaSgeuPJqmH_dYFtflyaSc2umBiShhHJ7Nve7G_srjXRT6-UC2KVlRuBuojjPetz_wCOH0hWigJ6QWy7r90moXMETrQPV46uXAN8eewXUBXyxNgd3Ng`,
            },
            method: 'POST',
            body: JSON.stringify(values),
          })
          const data = await response.json()

          gridRef.current?.instance.getDataSource().reload()

          return data
        },
      }),
    )
  }, [])

  return (
    <div suppressHydrationWarning className="dx-viewport p-5">
      <DataGrid
        dataSource={gridDataSource}
        showBorders={false}
        height={700}
        defaultColumns={getColumnsDefinition(serviceData)}
        ref={gridRef}
        columnAutoWidth={true}
      >
        <SearchPanel visible width={200} placeholder="Pesquisa de Membro" />
        <Export enabled allowExportSelectedData formats={exportFormats} />
        <FilterRow visible={true} />
        <HeaderFilter visible={true} />
        <GroupPanel visible={true} />
        <Scrolling mode="virtual" />
        <StateStoring
          enabled={true}
          type="localStorage"
          storageKey="datagrid_members"
        />
        <Toolbar>
          <ItemDataGrid location="before">
            <div className="grid-header">Lista de Membros</div>
          </ItemDataGrid>
          <ItemDataGrid
            name="addRowButton"
            location="after"
            locateInMenu="auto"
            showText="always"
            options={{
              icon: 'plus',
              text: 'Novo Membro',
              type: 'default',
              stylingMode: 'contained',
            }}
          />
          <ItemDataGrid
            location="after"
            locateInMenu="auto"
            showText="inMenu"
            widget="dxButton"
          >
            <Button
              icon="refresh"
              text="Refresh"
              stylingMode="text"
              onClick={handleRefreshClick}
            />
          </ItemDataGrid>
          <ItemDataGrid location="after" locateInMenu="auto">
            <div className="separator" />
          </ItemDataGrid>
          <ItemDataGrid name="exportButton" />
          <ItemDataGrid location="after" locateInMenu="auto">
            <div className="separator" />
          </ItemDataGrid>
          <ItemDataGrid name="searchPanel" locateInMenu="auto" />
        </Toolbar>
        <Editing
          mode="popup"
          useIcons={true}
          allowAdding={true}
          allowUpdating={true}
          allowDeleting={true}
        >
          <Popup title="Membro" showTitle={true} width="90vw" height="80vh" />
          <Form showValidationSummary={true}>
            {/* identificação */}
            <Item
              itemType="group"
              caption="Identificação"
              colCount={2}
              colSpan={2}
            >
              <Item
                isRequired={true}
                dataField="fullName"
                label={{ text: 'Nome Completo', location: 'top' }}
              >
                <RequiredRule message="Nome is required" />
                <PatternRule
                  message="Do not use digits in the Name"
                  pattern={/^[^0-9]+$/}
                />
              </Item>
              <Item
                isRequired={true}
                dataField="genderId"
                label={{ text: 'Genero', location: 'top' }}
                editorType="dxSelectBox"
                editorOptions={{ dataSource: serviceData.getGengerList() }}
              />
              <Item
                isRequired={true}
                dataField="dateOfBirth"
                editorType="dxDateBox"
                editorOptions={{ ...datepickOptions, max: new Date() }}
                label={{ text: 'Data Nascimento', location: 'top' }}
              />
              <Item
                isRequired={true}
                dataField="nationalityId"
                label={{ text: 'Nacionalidade', location: 'top' }}
                editorType="dxSelectBox"
                editorOptions={{
                  dataSource: serviceData.getNacionalitiesList(),
                }}
              />
              <Item
                isRequired={true}
                dataField="placeOfBirth"
                label={{ text: 'Naturalidade', location: 'top' }}
              ></Item>
              <Item
                dataField="email"
                label={{ text: 'Email', location: 'top' }}
              >
                <RequiredRule message="Email is required" />
                <EmailRule message="Email is invalid" />
              </Item>
              <Item
                isRequired={true}
                dataField="contact"
                label={{ text: 'Nº Telemóvel', location: 'top' }}
                editorOptions={phoneNumberOptions}
              ></Item>
            </Item>
            {/* dados morada */}
            <Item itemType="group" caption="Morada" colCount={2} colSpan={2}>
              <Item
                isRequired={true}
                dataField="Address.address"
                label={{ text: 'Morada', location: 'top' }}
              />
              <Item
                isRequired={true}
                dataField="Address.city"
                label={{ text: 'Cidade', location: 'top' }}
              />
              <Item
                isRequired={true}
                dataField="Address.county"
                label={{ text: 'Concelho', location: 'top' }}
              />
              <Item
                isRequired={true}
                dataField="Address.parish"
                label={{ text: 'Freguesia', location: 'top' }}
              />
              <Item
                isRequired={true}
                dataField="Address.postalCode"
                label={{ text: 'Cod. Postal', location: 'top' }}
                editorOptions={postalCodeOptions}
              ></Item>
            </Item>
            {/* identificação fiscal */}
            <Item
              itemType="group"
              caption="Documento de Identificação"
              colCount={2}
              colSpan={2}
            >
              <Item
                isRequired={true}
                dataField="IdentityDocument.identityDocumentTypeId"
                label={{
                  text: 'Documento de identificação',
                  location: 'top',
                }}
                editorType="dxSelectBox"
                editorOptions={{
                  dataSource: serviceData.getIdentificationDocumentList(),
                }}
              />
              <Item
                isRequired={true}
                dataField="IdentityDocument.identificationNumber"
                label={{ text: 'Nº Identificação', location: 'top' }}
              />
              <Item
                isRequired={true}
                dataField="IdentityDocument.expireDate"
                label={{ text: 'Data de Validade', location: 'top' }}
                editorType="dxDateBox"
                editorOptions={{ ...datepickOptions, min: new Date() }}
              />
              <Item
                isRequired={true}
                dataField="IdentityDocument.taxIdentificationNumber"
                label={{ text: 'Nº Identificação Fiscal', location: 'top' }}
                editorType="dxTextBox"
                editorOptions={{
                  value: null,
                }}
              >
                <StringLengthRule
                  message="NIF deve conter 9 digitos"
                  min={9}
                  max={9}
                />
              </Item>
            </Item>
            {/* responsavel */}
            <Item
              itemType="group"
              caption="Responsável"
              colCount={2}
              colSpan={2}
            >
              <Item
                dataField="Guardian.fullName"
                label={{ text: 'Nome Responsável', location: 'top' }}
              />
              <Item
                dataField="Guardian.contact"
                label={{ text: 'Nº Telemóvel', location: 'top' }}
                editorOptions={phoneNumberOptions}
              />
              <Item
                dataField="Guardian.relationshipDegreeId"
                label={{ text: 'Grau de Parentesco', location: 'top' }}
                editorType="dxSelectBox"
                editorOptions={{
                  dataSource: serviceData.getRelationshipDegreeListList(),
                }}
              />
              <Item
                dataField="Guardian.address"
                label={{ text: 'Morada', location: 'top' }}
              />
              <Item
                dataField="Guardian.city"
                label={{ text: 'Cidade', location: 'top' }}
              />
              <Item
                dataField="Guardian.county"
                label={{ text: 'Concelho', location: 'top' }}
              />
              <Item
                dataField="Guardian.parish"
                label={{ text: 'Freguesia', location: 'top' }}
              />
              <Item
                dataField="Guardian.postalCode"
                label={{ text: 'Cod. Postal', location: 'top' }}
                editorOptions={postalCodeOptions}
              />
            </Item>
            {/* Modalidade & Frequência */}
            <Item
              itemType="group"
              caption="Modalidade, Frequência e Pagamentos"
              colCount={2}
              colSpan={2}
            >
              <Item
                isRequired={true}
                dataField="modalityId"
                label={{
                  text: 'Modalidades',
                  location: 'top',
                }}
                editorType="dxSelectBox"
                editorOptions={{
                  dataSource: serviceData.getModalitiesList(),
                }}
              />
              <Item
                isRequired={true}
                dataField="frequencyId"
                label={{
                  text: 'Frequência',
                  location: 'top',
                }}
                editorType="dxSelectBox"
                editorOptions={{
                  dataSource: serviceData.getFrequenciesList(),
                }}
              />
              <Item
                isRequired={true}
                dataField="memberTypeId"
                label={{
                  text: 'Tipo de inscrição',
                  location: 'top',
                }}
                editorType="dxSelectBox"
                editorOptions={{
                  dataSource: serviceData.getMemeberTypesList(),
                }}
              />
              <Item
                isRequired={true}
                dataField="paymentFrequencyId"
                label={{
                  text: 'Periodicidade de pagamentos',
                  location: 'top',
                }}
                editorType="dxSelectBox"
                editorOptions={{
                  dataSource: serviceData.getPaymentFrequencyList(),
                }}
              />
            </Item>
            {/* Termos e condições */}
            <Item
              itemType="group"
              caption="Termos e Condições"
              colCount={2}
              colSpan={2}
            >
              <Item
                isRequired={true}
                dataField="termsAndConditions"
                label={{
                  text: 'Eu li e concorco com os Termos e Condições assim como o Regulamento interno',
                  location: 'left',
                }}
                editorType="dxCheckBox"
                colCount={2}
                colSpan={2}
              />
              <Item
                isRequired={true}
                dataField="healthDeclaration"
                label={{
                  text: 'Declaro dispor da robustez física e que não tenho nenhum problema de saúde que impeça a pratica de atividade física',
                  location: 'left',
                }}
                editorType="dxCheckBox"
                colCount={2}
                colSpan={2}
              />
            </Item>
          </Form>
        </Editing>
      </DataGrid>
    </div>
  )
}

export default MembersDataGrid
