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
import { useCallback, useRef, useState } from 'react'
import config from 'devextreme/core/config'
import SelectBox from 'devextreme-react/select-box'
import { ValueChangedEvent } from 'devextreme/ui/select_box'
import Popup from 'devextreme-react/popup'
import ScrollView from 'devextreme-react/scroll-view'
import Form, { Item } from 'devextreme-react/form'
config({
  editorStylingMode: 'underlined',
})

type Payment = {
  id: number
  membershipNumber: number
  fullName: string
  paymentType: string
  amountPaid: number
  createdAt: string
}

const paymentsColumnsDefinition = [
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
  },
  {
    dataField: 'paymentType',
    caption: 'Tipo de Pagamento',
  },
  {
    dataField: 'amountPaid',
    caption: 'Valor Pago',
  },
  {
    dataField: 'createdAt',
    caption: 'Data de Pagamento',
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

// seed data
const payments: Payment[] = [
  {
    id: 1,
    membershipNumber: 1,
    fullName: 'João Silva',
    paymentType: 'Mensalidade',
    amountPaid: 10,
    createdAt: '2023-11-01',
  },
  {
    id: 2,
    membershipNumber: 2,
    fullName: 'Maria Silva',
    paymentType: 'Mensalidade',
    amountPaid: 35,
    createdAt: '2023-12-03',
  },
  {
    id: 3,
    membershipNumber: 3,
    fullName: 'José Silva',
    paymentType: 'Mensalidade',
    amountPaid: 50.99,
    createdAt: '2023-12-05',
  },
  {
    id: 3,
    membershipNumber: 3,
    fullName: 'José Silva',
    paymentType: 'Cota Anual',
    amountPaid: 12,
    createdAt: '2023-12-05',
  },
  {
    id: 3,
    membershipNumber: 3,
    fullName: 'José Silva',
    paymentType: 'Seguro',
    amountPaid: 12,
    createdAt: '2023-12-05',
  },
]

const PaymentsDatagrid = () => {
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth())
  const [popupVisible, setPopupVisible] = useState(false)
  const gridRef = useRef<DataGrid>(null)

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

  return (
    <div suppressHydrationWarning className="dx-viewport p-5">
      <div className={styles.right_side}></div>
      <DataGrid
        dataSource={payments}
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
        <ScrollView width="100%" height="100%">
          <Form showValidationSummary={true}>
            <Item
              isRequired={true}
              dataField="fullName"
              label={{ text: 'Nome Completo', location: 'top' }}
            />
          </Form>
        </ScrollView>
      </Popup>
    </div>
  )
}

export default PaymentsDatagrid
