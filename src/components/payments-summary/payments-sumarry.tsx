import { GoChecklist, GoCreditCard, GoPeople } from 'react-icons/go'
import PaymentsSummaryCard from '../payments-summary-card/payments-summary-card'

export type membersWithoutPaymentProps = {
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
  const handleCardClick = (membersData: membersWithoutPaymentProps) => {
    // Handle click logic here
    console.log('Card clicked with data:', membersData)
  }

  return (
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
      <PaymentsSummaryCard
        title="Total de Pagamentos"
        description={`${summary.totalMembers - summary.totalMissingPayments}/${
          summary.totalMembers
        }`}
        icon={<GoCreditCard />}
      />

      <PaymentsSummaryCard
        title="Total Recebido"
        description={`€ ${summary.totalPaymentsAmount}`}
        icon={<GoChecklist />}
      />

      <PaymentsSummaryCard
        title="Pagamentos em Falta"
        description={`${summary.totalMissingPayments}`}
        icon={<GoChecklist />}
        onClick={handleCardClick}
      />
    </div>
  )
}

export default PaymentsSummary
