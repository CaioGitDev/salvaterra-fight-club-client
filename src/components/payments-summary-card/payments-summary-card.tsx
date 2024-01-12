import { ReactNode } from 'react'

type PaymentsSummaryCardProps = {
  title: string
  description: string
  icon: ReactNode
}

const PaymentsSummaryCard = ({
  title,
  description,
  icon,
}: PaymentsSummaryCardProps) => {
  return (
    <div className="flex items-center justify-between p-5 bg-quaternary-color rounded shadow-sm">
      <div>
        <div className="text-sm text-gray-400 ">{title}</div>
        <div className="flex items-center pt-1">
          <div className="text-xl font-medium text-primary-color ">
            {description}
          </div>
        </div>
      </div>
      <div className="text-gray-300 text-3xl">{icon}</div>
    </div>
  )
}

export default PaymentsSummaryCard
