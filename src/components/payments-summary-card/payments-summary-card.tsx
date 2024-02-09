import { ReactNode } from 'react'

type membersWithoutPaymentProps = {
  id: string
  fullName: string
}

type PaymentsSummaryCardProps = {
  title: string
  description: string
  icon: ReactNode
  onClick?: (members: membersWithoutPaymentProps) => void
}

const PaymentsSummaryCard = ({
  title,
  description,
  icon,
  onClick,
}: PaymentsSummaryCardProps) => {
  const handleClick = () => {
    // Assuming you have membersWithoutPaymentProps data
    const membersData: membersWithoutPaymentProps = {
      id: '123', // Example data
      fullName: 'John Doe', // Example data
    }

    // Call the onClick function if provided
    if (onClick) {
      onClick(membersData)
    }
  }

  return (
    <div
      className="flex items-center justify-between p-5 bg-quaternary-color rounded shadow-sm
      cursor-pointer hover:shadow-lg transition duration-300 ease-in-out transform 
      hover:-translate-y-1 hover:scale-105"
      onClick={handleClick}
    >
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
