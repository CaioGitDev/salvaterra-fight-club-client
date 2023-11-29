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
} from 'devextreme-react/data-grid'
import {
  EmailRule,
  Item,
  RequiredRule,
  StringLengthRule,
} from 'devextreme-react/form'
import config from 'devextreme/core/config'
import Button from 'devextreme-react/button'

config({
  editorStylingMode: 'underlined',
})

const exportFormats = ['xlsx', 'pdf']

const datepickOptions = {
  displayFormat: 'yyyy-MM-dd',
  openOnFieldClick: true,
  pickerType: 'calendar',
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
        key: 'member.id',
        load: () => serviceData.getMembers(),
        insert: (data: MemberDataInterface) => {
          return Promise.resolve(data)
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
      >
        <SearchPanel visible width={200} placeholder="Pesquisa de Membro" />
        <Export enabled allowExportSelectedData formats={exportFormats} />
        <FilterRow visible={true} />
        <HeaderFilter visible={true} />
        <GroupPanel visible={true} />
        <Scrolling mode="virtual" />
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
                dataField="member.fullName"
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
                dataField="member.gender_id"
                label={{ text: 'Genero', location: 'top' }}
                editorType="dxSelectBox"
                editorOptions={{ dataSource: serviceData.getGengerList() }}
              />
              <Item
                isRequired={true}
                dataField="member.dateOfBirth"
                editorType="dxDateBox"
                editorOptions={{ ...datepickOptions, max: new Date() }}
                label={{ text: 'Data Nascimento', location: 'top' }}
              />
              <Item
                isRequired={true}
                dataField="member.nationality_id"
                label={{ text: 'Nacionalidade', location: 'top' }}
                editorType="dxSelectBox"
                editorOptions={{
                  dataSource: serviceData.getNacionalitiesList(),
                }}
              />
              <Item
                isRequired={true}
                dataField="member.placeOfBirth"
                label={{ text: 'Naturalidade', location: 'top' }}
              ></Item>
              <Item
                dataField="member.email"
                label={{ text: 'Email', location: 'top' }}
              >
                <RequiredRule message="Email is required" />
                <EmailRule message="Email is invalid" />
              </Item>
              <Item
                isRequired={true}
                dataField="member.contact"
                label={{ text: 'Nº Telemóvel', location: 'top' }}
                editorOptions={phoneNumberOptions}
              ></Item>
            </Item>
            {/* dados morada */}
            <Item itemType="group" caption="Morada" colCount={2} colSpan={2}>
              <Item
                isRequired={true}
                dataField="memberAddress.address"
                label={{ text: 'Morada', location: 'top' }}
              />
              <Item
                isRequired={true}
                dataField="memberAddress.city"
                label={{ text: 'Cidade', location: 'top' }}
              />
              <Item
                isRequired={true}
                dataField="memberAddress.county"
                label={{ text: 'Concelho', location: 'top' }}
              />
              <Item
                isRequired={true}
                dataField="memberAddress.parish"
                label={{ text: 'Freguesia', location: 'top' }}
              />
              <Item
                isRequired={true}
                dataField="memberAddress.postalCode"
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
                dataField="memberIdentificationDocument.identificationDocument_id"
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
                dataField="memberIdentificationDocument.identificationNumber"
                label={{ text: 'Nº Identificação', location: 'top' }}
              />
              <Item
                isRequired={true}
                dataField="memberIdentificationDocument.expireDate"
                label={{ text: 'Data de Validade', location: 'top' }}
                editorType="dxDateBox"
                editorOptions={{ ...datepickOptions, min: new Date() }}
              />
              <Item
                isRequired={true}
                dataField="memberIdentificationDocument.taxIdentificationNumber"
                label={{ text: 'Nº Identificação Fiscal', location: 'top' }}
                editorType="dxNumberBox"
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
                dataField="memberGuardian.fullName"
                label={{ text: 'Nome Responsável', location: 'top' }}
              />
              <Item
                dataField="memberGuardian.contact"
                label={{ text: 'Nº Telemóvel', location: 'top' }}
                editorOptions={phoneNumberOptions}
              />
              <Item
                dataField="memberGuardian.relationshipDegree_id"
                label={{ text: 'Grau de Parentesco', location: 'top' }}
                editorType="dxSelectBox"
                editorOptions={{
                  dataSource: serviceData.getRelationshipDegreeListList(),
                }}
              />
              <Item
                dataField="memberGuardian.address"
                label={{ text: 'Morada', location: 'top' }}
              />
              <Item
                dataField="memberGuardian.city"
                label={{ text: 'Cidade', location: 'top' }}
              />
              <Item
                dataField="memberGuardian.county"
                label={{ text: 'Concelho', location: 'top' }}
              />
              <Item
                dataField="memberGuardian.parish"
                label={{ text: 'Freguesia', location: 'top' }}
              />
              <Item
                dataField="memberGuardian.postalCode"
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
                dataField="member.modality_id"
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
                dataField="member.frequency_id"
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
                dataField="member.memberType_id"
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
                dataField="member.paymentFrequency_id"
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
                dataField="member.termsAndConditions"
                label={{
                  text: 'Eu li e concorco com os Termos e Condições assim como o Regulamento interno',
                  location: 'left',
                }}
                editorType="dxCheckBox"
                editorOptions={{ value: false }}
                colCount={2}
                colSpan={2}
              />
              <Item
                isRequired={true}
                dataField="member.healthDeclaration"
                label={{
                  text: 'Declaro dispor da robustez física e que não tenho nenhum problema de saúde que impeça a pratica de atividade física',
                  location: 'left',
                }}
                editorType="dxCheckBox"
                editorOptions={{ value: false }}
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
