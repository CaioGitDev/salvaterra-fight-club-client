import { List } from 'devextreme-react'
import { Popup, Position, ToolbarItem } from 'devextreme-react/popup'
import { ReactNode, useCallback, useState } from 'react'

type MembersWithoutPaymentProps = {
  id: string
  fullName: string
  modality: {
    name: string
  }
}

type PaymentsSummaryCardProps = {
  title: string
  description: string
  blurDescription: boolean
  icon: ReactNode
  membersWithoutPayments?: MembersWithoutPaymentProps[]
}

const PaymentsSummaryCard = ({
  title,
  description,
  blurDescription = false,
  icon,
  membersWithoutPayments,
}: PaymentsSummaryCardProps) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false)

  const handleClick = () => {
    if (membersWithoutPayments && membersWithoutPayments.length > 0) {
      setIsPopupVisible(true)
    }
  }

  const hideInfo = useCallback(() => {
    setIsPopupVisible(false)
  }, [])

  const getCloseButtonOptions = useCallback(
    () => ({
      text: 'Close',
      stylingMode: 'outlined',
      type: 'normal',
      onClick: hideInfo,
    }),
    [hideInfo],
  )

  const getModalityBadgeColor = (modalityName: string) => {
    switch (modalityName) {
      case 'Jiu-Jitsu':
        return 'bg-red-500'
      case 'Muay Thai':
        return 'bg-primary-color'
      case 'Boxe':
        return 'bg-yellow-500'
      case 'Funcional':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }
  return (
    <div>
      <div
        className={`group flex items-center justify-between p-5 bg-quaternary-color rounded shadow-sm
        cursor-pointer hover:shadow-lg transition duration-300 ease-in-out transform 
        hover:-translate-y-1 hover:scale-105`}
        onClick={handleClick}
      >
        <div>
          <div className="text-sm text-gray-400 ">{title}</div>
          <div className="flex items-center pt-1">
            <div
              className={`w-full w-max text-xl font-medium text-primary-color transition duration-300 ${
                blurDescription ? 'filter blur-sm hover:blur-none' : ''
              }`}
            >
              {description}
            </div>
          </div>
        </div>
        <div className="text-gray-300 text-3xl">{icon}</div>
      </div>

      {isPopupVisible && (
        <Popup
          visible={isPopupVisible}
          onHiding={hideInfo}
          dragEnabled={false}
          hideOnOutsideClick={true}
          showCloseButton={false}
          showTitle={true}
          title="Membros Sem Pagamento"
          container=".dx-viewport"
          width={'80vw'}
          height={'80vh'}
        >
          {/* set position to cover all window */}
          <Position my="center" at="center" />

          <ToolbarItem
            widget="dxButton"
            toolbar="bottom"
            location="after"
            options={getCloseButtonOptions()}
          />
          <List
            dataSource={membersWithoutPayments}
            height="100%"
            scrollingEnabled={true}
            pageLoadMode="scrollBottom"
            itemRender={(member: MembersWithoutPaymentProps) => {
              return (
                <div className="flex justify-between items-center rounded">
                  <span className="text-lg">{member.fullName}</span>
                  <span
                    className={`ml-2 p-1 ${getModalityBadgeColor(
                      member.modality.name,
                    )} text-white text-xs rounded`}
                  >
                    {member.modality.name}
                  </span>
                </div>
              )
            }}
          ></List>
        </Popup>
      )}
    </div>
  )
}

export default PaymentsSummaryCard
