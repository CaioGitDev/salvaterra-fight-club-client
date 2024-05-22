import { GoChecklist, GoCreditCard } from 'react-icons/go'
import PaymentsSummaryCard from '../payments-summary-card/payments-summary-card'

export type membersWithoutPaymentProps = {
  id: string
  fullName: string
  modality: {
    name: string
  }
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
      <PaymentsSummaryCard
        title="Total de Pagamentos"
        description={`${summary.totalMembers - summary.totalMissingPayments}/${
          summary.totalMembers
        }`}
        icon={<GoCreditCard />}
        blurDescription={false}
      />

      <PaymentsSummaryCard
        title="Total Recebido"
        description={`€ ${summary.totalPaymentsAmount}`}
        icon={<GoChecklist />}
        blurDescription={true}
      />

      <PaymentsSummaryCard
        title="Pagamentos em Falta"
        description={`${summary.totalMissingPayments}`}
        icon={<GoChecklist />}
        membersWithoutPayments={summary.membersWithoutPayment}
        blurDescription={false}
      />
    </div>
  )
}

export default PaymentsSummary
