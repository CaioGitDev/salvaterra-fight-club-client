import PaymentsDatagrid from '@/components/payments-datagrid/payments-datagrid'
import NoSSRWrapper from '@/utils/no-ssr-wrapper'
import styles from './payments.module.css'

const Payments = () => {
  return (
    <div suppressHydrationWarning className={styles.payments}>
      <NoSSRWrapper>
        <PaymentsDatagrid />
      </NoSSRWrapper>
    </div>
  )
}

export default Payments
