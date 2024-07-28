import '@/app/ui/globals.css'
import Navbar from '@/app/ui/navbar/navbar'
import SideBar from '@/app/ui/sidebar/sidebar'
import styles from '@/app/ui/layout.module.css'
import Provider from '@/utils/providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <SideBar />
      </div>
      <div className={styles.content}>
        <Navbar />
        <Provider>{children}</Provider>
      </div>
    </div>
  )
}
