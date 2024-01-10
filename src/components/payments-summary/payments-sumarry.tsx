import { GoChecklist, GoCreditCard, GoPeople } from 'react-icons/go'

type membersWithoutPaymentProps = {
  id: string
  fullName: string
}

export type paymentsSummaryProps = {
  membersWithoutPayment: membersWithoutPaymentProps[]
  totalMembers: number
  totalMissingPayments: number
  totalPaymentsAmount: number
}

interface PaymentsSummaryProps {
  summary: paymentsSummaryProps
}

const PaymentsSummary = ({ summary }: PaymentsSummaryProps) => {
  return (
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
      <div className="flex items-center justify-between p-5 bg-quaternary-color rounded shadow-sm">
        <div>
          <div className="text-sm text-gray-400 ">Total de Pagamentos</div>
          <div className="flex items-center pt-1">
            <div className="text-xl font-medium text-primary-color ">
              {summary.totalMembers - summary.totalMissingPayments}/
              {summary.totalMembers}
            </div>
          </div>
        </div>
        <div className="text-gray-300 text-3xl">
          <GoCreditCard />
        </div>
      </div>

      <div className="flex items-center justify-between p-5 bg-quaternary-color rounded shadow-sm">
        <div>
          <div className="text-sm text-gray-400 ">Total Recebido</div>
          <div className="flex items-center pt-1">
            <div className="text-xl font-medium text-primary-color ">
              € {summary.totalPaymentsAmount}
            </div>
          </div>
        </div>
        <div className="text-gray-300 text-3xl">
          <GoChecklist />
        </div>
      </div>

      <div className="flex items-center justify-between p-5 bg-quaternary-color rounded shadow-sm">
        <div>
          <div className="text-sm text-gray-400 ">Pagamentos em Falta</div>
          <div className="flex items-center pt-1">
            <div className="text-xl font-medium text-primary-color ">
              {summary.totalMissingPayments}
            </div>
          </div>
        </div>
        <div className="text-gray-300 text-3xl">
          <GoPeople />
        </div>
      </div>
    </div>
  )
}

export default PaymentsSummary
