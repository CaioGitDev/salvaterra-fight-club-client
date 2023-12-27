'use client'
import '@/theme/dx.material.salvaterra-fight-club-theme.css'
import styles from './payments-datagrid.module.css'
import DataGrid, {
  FilterRow,
  HeaderFilter,
  Scrolling,
  Item as ItemDataGrid,
  Toolbar,
} from 'devextreme-react/data-grid'
import Button from 'devextreme-react/button'
import { useCallback, useEffect, useRef, useState } from 'react'
import config from 'devextreme/core/config'
import SelectBox from 'devextreme-react/select-box'
import { ValueChangedEvent } from 'devextreme/ui/select_box'
import Popup, { ToolbarItem } from 'devextreme-react/popup'
import ScrollView from 'devextreme-react/scroll-view'
import Form, { Item } from 'devextreme-react/form'
import { datepickOptions } from '../members-datagrid/members-datagrid'
import FetchMembersColumns from '@/data/payments-datagrid/fetch-members-columns'
import DataSource from 'devextreme/data/data_source'
import notify from 'devextreme/ui/notify'
import PostMemberPaymentAsync, {
  Payment,
} from '@/data/payments-form/post-member-payment'
import CustomStore from 'devextreme/data/custom_store'
import FetchMembersPaymentsAsync from '@/data/payments-datagrid/fetch-members-payments'

config({
  editorStylingMode: 'underlined',
})

const apiUrl = 'http://localhost:3333'
const accessToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMTA3YTgzNS1kYzNmLTQ5OGItYWJlZS1kOTM1NDJmYTg1YjYiLCJpYXQiOjE3MDM2MzIyNjZ9.igk_An_aVDEMav-Tg_aHorFLqJsBD44AzGmJVG4xuKSkYP_tEZ6K62ZmGJWQwRU8qiUKTU5hdk2yUtVBqopwDMZf1Rhtv_Yj4updOg6Y66HhRCzWaFQzVaYnXzetxINcaT-GPfI4IT75Aaal_NtN03yOuT813SgurTRVzxb2mxnExVAzFLfVFKG4t5XN9sttwAJ5wU1cJUuSAv-ii_3ldgF9_lAb30a1sepsmCyVE7D0_WGbPD8uVlaa8Ol6rvKBsMYg1LZDRh8EsuUQEelaloM63-WKma2bF_WbWqKOkQiiKAhVO-ZBlq-fbSTCkdpGigfUVjh3CKSYih7Vq1pH-A'
const paymentMethod = [
  { id: 'MBWAY', text: 'MBWAY' },
  { id: 'MULTIBANCO', text: 'Multibanco' },
  { id: 'TRANSFERENCIA_BANCARIA', text: 'Transferência bancária' },
  { id: 'DINHEIRO', text: 'Dinheiro' },
]

const paymentType = [
  { id: 'COTA_MENSAL', text: 'Cota mensal' },
  { id: 'COTA_ANUAL', text: 'Cota anual' },
  { id: 'SEGURO', text: 'Seguro' },
]

type MembersAutocomplete = {
  id: string
  fullName: string
}

const paymentsColumnsDefinition = [
  {
    dataField: 'id',
    visible: false,
  },
  {
    dataField: 'member.membershipNumber',
    caption: 'Nº Socio',
    visible: false,
  },
  {
    dataField: 'member.fullName',
    caption: 'Nome Completo',
  },
  {
    dataField: 'paymentType',
    caption: 'Tipo de Pagamento',
  },
  {
    dataField: 'paymentMethod',
    caption: 'Método de Pagamento',
  },
  {
    dataField: 'paymentAmount',
    caption: 'Valor Pago',
    format: '€ #,##0.##',
  },
  {
    dataField: 'createdAt',
    caption: 'Data de Pagamento',
    dataType: 'datetime',
    format: 'dd-MM-yyyy',
  },
]

const monthlyFilterLabel = { 'aria-label': 'Filtro por mês' }
const monthlyFilter = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

// create method to get current month and return it as index
const getCurrentMonth = () => {
  const date = new Date()
  const month = date.getMonth()
  return month
}

const membersColumnsToGetAutocomplete = ['id', 'fullName']

const PaymentsDatagrid = () => {
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth())
  const [popupVisible, setPopupVisible] = useState(false)
  const [membersColumns, setMembersColumns] =
    useState<DataSource<MembersAutocomplete, string>>()

  // Assuming your initial state is undefined, you can set it to an empty array if you prefer
  const [gridDataSource, setGridDataSource] =
    useState<CustomStore<Payment[], string>>()

  const gridRef = useRef<DataGrid>(null)
  const formRef = useRef<Form>(null)

  useEffect(() => {
    setGridDataSource(
      new CustomStore<Payment[]>({
        key: 'id',
        load: async () => {
          const payments = await FetchMembersPaymentsAsync({
            apiUrl,
            accessToken,
          })

          return payments
        },
      }),
    )
  }, [])

  useEffect(() => {
    setMembersColumns(
      new DataSource({
        key: 'id',
        loadMode: 'raw',
        load: () =>
          FetchMembersColumns({
            apiUrl,
            accessToken,
            columns: membersColumnsToGetAutocomplete,
          }),
        sort: [{ selector: 'fullName', desc: false }],
      }),
    )
  }, [])

  const handleAddPaymentClick = useCallback(() => {
    setPopupVisible(true)
  }, [])

  const handlePopupHiding = useCallback(() => {
    setPopupVisible(false)
  }, [])

  const handleOnValueChangedFilter = useCallback(
    ({ value }: ValueChangedEvent) => {
      const dataGrid = gridRef.current?.instance
      if (dataGrid) {
        // dataGrid.filter(['Task_Status', '=', value])
      }
    },
    [gridRef],
  )

  const handleRefreshClick = useCallback(() => {
    gridRef.current?.instance.refresh()
  }, [])

  const createPaymentAsync = useCallback(() => {
    const formInstance = formRef.current?.instance

    if (!formInstance?.validate().isValid) {
      notify(
        {
          message: 'Por favor preencha todos os campos obrigatórios',
          position: {
            my: 'center',
            at: 'center',
          },
        },
        'error',
        3000,
      )
      return
    }
    const { memberId, paymentType, paymentMethod, paymentAmount, paymentDate } =
      formInstance?.option('formData')

    // post payment data to api
    const payment = PostMemberPaymentAsync(
      {
        apiUrl,
        accessToken,
      },
      {
        memberId,
        paymentType,
        paymentMethod,
        paymentAmount,
        paymentDate,
      },
    )

    if (!payment) {
      notify(
        {
          message: 'Ocorreu um erro ao adicionar o pagamento',
          position: {
            my: 'center',
            at: 'center',
          },
        },
        'error',
        3000,
      )
    }

    setPopupVisible(false)
    formInstance?.option('formData', null)
  }, [])

  const getSaveButtonOptions = useCallback(
    () => ({
      icon: 'save',
      stylingMode: 'outlined',
      text: 'Adicionar pagamento',
      onClick: createPaymentAsync,
    }),
    [createPaymentAsync],
  )

  return (
    <div suppressHydrationWarning className="dx-viewport p-5">
      <div className={styles.right_side}></div>
      <DataGrid
        dataSource={gridDataSource}
        showBorders={false}
        height={700}
        defaultColumns={paymentsColumnsDefinition}
        ref={gridRef}
        columnAutoWidth={true}
      >
        <FilterRow visible={true} />
        <HeaderFilter visible={true} />
        <Scrolling mode="virtual" />
        <Toolbar>
          <ItemDataGrid location="before">
            <div className="grid-header">Pagamentos Mensal</div>
          </ItemDataGrid>
          <ItemDataGrid
            location="after"
            locateInMenu="auto"
            showText="always"
            widget="dxButton"
          >
            <Button
              icon="add"
              text="Adicionar Pagamento"
              stylingMode="text"
              onClick={handleAddPaymentClick}
            />
          </ItemDataGrid>
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
          <ItemDataGrid
            location="after"
            locateInMenu="auto"
            showText="inMenu"
            widget="dxSelectBox"
          >
            <SelectBox
              items={monthlyFilter}
              inputAttr={monthlyFilterLabel}
              value={monthlyFilter[currentMonth]}
              onValueChanged={handleOnValueChangedFilter}
            />
          </ItemDataGrid>
        </Toolbar>
      </DataGrid>
      <Popup
        visible={popupVisible}
        onHiding={handlePopupHiding}
        showCloseButton={true}
        showTitle={true}
        title={`Adicionar Pagamento ao mês de ${monthlyFilter[currentMonth]}`}
        width="90vw"
        height="80vh"
      >
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location="after"
          options={getSaveButtonOptions()}
        />
        <ScrollView width="100%" height="100%">
          <Form ref={formRef} showValidationSummary={true} colCount={2}>
            <Item
              colSpan={2}
              isRequired={true}
              dataField="memberId"
              editorType="dxSelectBox"
              editorOptions={{
                dataSource: membersColumns,
                displayExpr: 'fullName',
                valueExpr: 'id',
                searchEnabled: true,
                searchMode: 'contains',
                searchExpr: ['fullName'],
              }}
              label={{ text: 'Nome Completo', location: 'top' }}
            />
            <Item
              isRequired={true}
              dataField="paymentType"
              editorType="dxSelectBox"
              editorOptions={{
                items: paymentType,
                valueExpr: 'id',
                displayExpr: 'text',
              }}
              label={{ text: 'Tipo de Pagamento', location: 'top' }}
            />
            <Item
              isRequired={true}
              dataField="paymentAmount"
              editorType="dxNumberBox"
              editorOptions={{
                format: '€ #,##0.##',
                value: 0,
              }}
              label={{ text: 'Valor Pago', location: 'top' }}
            />
            <Item
              isRequired={true}
              dataField="paymentMethod"
              editorType="dxSelectBox"
              editorOptions={{
                items: paymentMethod,
                valueExpr: 'id',
                displayExpr: 'text',
              }}
              label={{ text: 'Método de Pagamento', location: 'top' }}
            />
            <Item
              isRequired={true}
              dataField="paymentDate"
              editorType="dxDateBox"
              editorOptions={datepickOptions}
              label={{ text: 'Data de Pagamento', location: 'top' }}
            />
          </Form>
        </ScrollView>
      </Popup>
    </div>
  )
}

export default PaymentsDatagrid
