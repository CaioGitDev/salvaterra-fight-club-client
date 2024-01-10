'use client'
import '@/theme/dx.material.salvaterra-fight-club-theme.css'
import styles from './payments-datagrid.module.css'
import { confirm } from 'devextreme/ui/dialog'
import DataGrid, {
  FilterRow,
  HeaderFilter,
  Scrolling,
  Item as ItemDataGrid,
  Toolbar,
  Summary,
  TotalItem,
  Column,
  Lookup,
  Button as ButtonDataGrid,
} from 'devextreme-react/data-grid'
import Button from 'devextreme-react/button'
import { useCallback, useEffect, useRef, useState } from 'react'
import config from 'devextreme/core/config'
import SelectBox from 'devextreme-react/select-box'
import Popup, { ToolbarItem } from 'devextreme-react/popup'
import ScrollView from 'devextreme-react/scroll-view'
import Form, { Item } from 'devextreme-react/form'
import { datepickOptions } from '../members-datagrid/members-datagrid'
import DataSource from 'devextreme/data/data_source'
import notify from 'devextreme/ui/notify'
import BuildPaymentReceiptPDF from '@/utils/payment-receipt/build-payment-receipt-PDF'
import { Payment, PaymentToDb, ReceiptToDb } from '@/utils/types/payments'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosInterceptorInstance } from '@/services/axios-interceptor-instance'
import dxForm from 'devextreme/ui/form'
import query from 'devextreme/data/query'
import PaymentsSummary, {
  paymentsSummaryProps,
} from '../payments-summary/payments-sumarry'

config({
  editorStylingMode: 'underlined',
})

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
  return new Date().getMonth()
}

const getCurrentYear = () => {
  return new Date().getFullYear()
}

const PaymentsDatagrid = () => {
  const queryClient = useQueryClient()
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth())
  const [currentYear, setCurrentYear] = useState(getCurrentYear())
  const [popupVisible, setPopupVisible] = useState(false)
  const [membersNamesAutocomplete, setMembersNamesAutocomplete] =
    useState<DataSource<MembersAutocomplete, string>>()

  const [gridDataSource, setGridDataSource] = useState<Payment[]>()
  const [summary, setSummaries] = useState<paymentsSummaryProps>()
  const [isGenerateReceiptButtonVisible, setIsGenerateReceiptButtonVisible] =
    useState(true)

  const gridRef = useRef<DataGrid>(null)
  const formRef = useRef<Form>(null)

  const { data, refetch } = useQuery({
    queryKey: ['membersPayments'],
    queryFn: async () => {
      const { data } = await AxiosInterceptorInstance.get(
        `/members/payments/${currentMonth + 1}/${currentYear}`,
      )
      const { payments, summary } = data
      return { payments, summary }
    },
  })

  const { data: namesAutocomplete } = useQuery({
    queryKey: ['membersNamesAutocomplete'],
    queryFn: async () => {
      const { data } = await AxiosInterceptorInstance.post('/members/columns', {
        columns: ['id', 'fullName'],
      })
      const { members } = data
      members.sort((a: { fullName: string }, b: { fullName: string }) =>
        a.fullName.localeCompare(b.fullName),
      )
      return members
    },
  })

  const paymentMutation = useMutation({
    mutationFn: async (payment: PaymentToDb) => {
      const { data } = await AxiosInterceptorInstance.post(
        '/member/payment',
        payment,
      )
      const { payment: newPayment } = data
      return newPayment
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['membersPayments'] })
    },
  })

  useEffect(() => {
    setGridDataSource(data?.payments)
    setSummaries(data?.summary)
  }, [data?.payments, data?.summary])

  useEffect(() => {
    setMembersNamesAutocomplete(namesAutocomplete)
  }, [namesAutocomplete])

  const handleAddPaymentClick = useCallback(() => {
    setPopupVisible(true)
  }, [])

  const handlePopupHiding = useCallback(() => {
    setPopupVisible(false)
  }, [])

  const handleOnMonthValueChangedFilter = useCallback((e: any) => {
    const monthIndex = monthlyFilter.indexOf(e.value)
    setCurrentMonth(monthIndex)
  }, [])

  const handleOnYearValueChangedFilter = useCallback((e: any) => {
    setCurrentYear(e.value)
  }, [])

  const handleRefreshClick = useCallback(async () => {
    refetch()
    gridRef.current?.instance.refresh()
  }, [refetch])

  const generateReceiptMutation = useMutation({
    mutationFn: async (receiptToDb: ReceiptToDb) => {
      const { data } = await AxiosInterceptorInstance.post(
        '/payment/receipts',
        receiptToDb,
      )
      const { receipt: newReceipt } = data
      return newReceipt
    },
  })

  const formatReceiptNumber = (receiptNumber: number, receiptYear: number) => {
    return `${receiptNumber.toString().padStart(4, '0')}/${receiptYear}`
  }

  const handleGenerateReceiptClick = useCallback(
    (e: any) => {
      const payment: Payment = e.row.data

      confirm(
        'Tem a certeza que pretende gerar o recibo?',
        'Gerar Recibo',
      ).then(async (result) => {
        if (result) {
          const data = await generateReceiptMutation.mutateAsync({
            paymentId: payment.id,
            receiptTaxDescription: 'Insento Artigo 9.º do CIVA (Ou similar)',
            receiptTaxPercentage: 0,
          })

          const formatedReceiptNumber = formatReceiptNumber(
            data.receiptNumber,
            data.receiptYear,
          )

          const pdfBuilder = new BuildPaymentReceiptPDF(payment, {
            receiptNumber: formatedReceiptNumber,
            receiptDate: new Date(data.createdAt),
            receiptEmail: ' geral@salvaterrafghtclub.pt',
            receiptTaxNumber: ' 517719282',
          })

          const document = pdfBuilder.CreatePDFDocument()

          const fileName = `${payment.member.fullName
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9]/g, '-')
            .toLowerCase()}-${formatedReceiptNumber.replace('/', '-')}.pdf`
          document.download(fileName)
        }
      })
    },
    [generateReceiptMutation],
  )

  function validateFormInstance(form: dxForm) {
    const { isValid } = form.validate()
    if (!isValid) {
      notify(
        {
          message: 'Preencha os campos obrigatórios',
        },
        'error',
        3000,
      )
    }
    return isValid
  }

  const createPaymentAsync = useCallback(() => {
    const formInstance = formRef.current?.instance
    const formData = formInstance?.option('formData')

    if (formInstance && formData && !validateFormInstance(formInstance)) {
      return
    }

    const payment = formData as PaymentToDb
    paymentMutation.mutate(payment)

    if (paymentMutation.isError && paymentMutation.error) {
      notify(paymentMutation.error.message, 'error', 3000)
      return
    }

    setPopupVisible(false)
    formInstance?.option('formData', null)
    gridRef.current?.instance.refresh()
  }, [paymentMutation])

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
      {summary && <PaymentsSummary summary={summary} />}

      <div className={styles.right_side}></div>
      <DataGrid
        dataSource={gridDataSource}
        showBorders={false}
        height={700}
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
              onValueChanged={handleOnMonthValueChangedFilter}
            />
          </ItemDataGrid>
          <ItemDataGrid
            location="after"
            locateInMenu="auto"
            showText="inMenu"
            widget="dxSelectBox"
          >
            <SelectBox
              items={[currentYear - 1, currentYear, currentYear + 1]}
              inputAttr={monthlyFilterLabel}
              value={currentYear}
              onValueChanged={handleOnYearValueChangedFilter}
            />
          </ItemDataGrid>
        </Toolbar>
        <Column dataField="id" visible={false} />
        <Column
          dataField="member.membershipNumber"
          caption="Nº Socio"
          visible={false}
        />
        <Column dataField="member.fullName" caption="Nome Completo" />
        <Column dataField="paymentType" caption="Tipo de Pagamento">
          <Lookup dataSource={paymentType} displayExpr="text" valueExpr="id" />
        </Column>
        <Column dataField="paymentMethod" caption="Método de Pagamento">
          <Lookup
            dataSource={paymentMethod}
            displayExpr="text"
            valueExpr="id"
          />
        </Column>
        <Column
          dataField="paymentAmount"
          caption="Valor Pago"
          format="€ #,##0.##"
        />
        <Column
          dataField="paymentDate"
          caption="Data de Pagamento"
          dataType="date"
          format="dd-MM-yyyy"
        />
        <Column type="buttons" width={110}>
          <ButtonDataGrid
            text="Gerar Recibo"
            icon="check"
            hint="Gerar Recibo"
            onClick={handleGenerateReceiptClick}
            visible={isGenerateReceiptButtonVisible}
          />
        </Column>
        <Summary>
          <TotalItem column="member.fullName" summaryType="count" />
          <TotalItem
            column="paymentAmount"
            summaryType="sum"
            valueFormat="€ #,##0.##"
          />
        </Summary>
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
        ></ToolbarItem>
        <ScrollView width="100%" height="100%">
          <Form ref={formRef} showValidationSummary={true} colCount={2}>
            <Item
              colSpan={2}
              isRequired={true}
              dataField="memberId"
              editorType="dxSelectBox"
              editorOptions={{
                dataSource: membersNamesAutocomplete,
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
