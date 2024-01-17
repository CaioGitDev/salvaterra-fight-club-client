import { randomUUID } from 'crypto'
import styles from './sidebar.module.css'

import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdGroups,
  MdOutlineCreditCard,
  MdOutlineCalendarMonth,
  MdLogout,
  MdOutlineInventory,
  MdChecklist,
} from 'react-icons/md'
import MenuLink from '@/components/menu-link/menu-link'
import Image from 'next/image'

import LogoImage from '../../../../public/images/logo.svg'

const menuItems = [
  {
    id: randomUUID(),
    title: 'MENU',
    list: [
      {
        id: randomUUID(),
        title: 'Dashboard',
        path: '/dashboard',
        icon: <MdDashboard />,
      },
      {
        id: randomUUID(),
        title: 'Presenças',
        path: '/attendance',
        icon: <MdChecklist />,
      },
      {
        id: randomUUID(),
        title: 'Membros',
        path: '/members',
        icon: <MdSupervisedUserCircle />,
      },
      {
        id: randomUUID(),
        title: 'Equipas',
        path: '/teams',
        icon: <MdGroups />,
      },
      {
        id: randomUUID(),
        title: 'Pagamentos',
        path: '/payments',
        icon: <MdOutlineCreditCard />,
      },
      {
        id: randomUUID(),
        title: 'Inventório',
        path: '/inventory',
        icon: <MdOutlineInventory />,
      },
      {
        id: randomUUID(),
        title: 'Gestão de Reuniões',
        path: '/meetingManagement',
        icon: <MdOutlineCalendarMonth />,
      },
    ],
  },
  {
    id: randomUUID(),
    title: 'EQUIPAS',
    list: [],
  },
]

const SideBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image
          className={styles.logo_image}
          src={LogoImage}
          alt=""
          width={50}
          height={50}
        />
        <div className={styles.logo_detail}>
          <span className={styles.logo_name}>Salvaterra Fight Club</span>
          <span className={styles.logo_description}>
            Artes Marciais e Desportos de Combate
          </span>
        </div>
      </div>
      <ul>
        {menuItems.map((category) => (
          <li key={category.id}>
            <span className={styles.category}>{category.title}</span>
            {category.list.map((item) => (
              <MenuLink item={item} key={item.id} />
            ))}
          </li>
        ))}
      </ul>

      <button className={styles.logout}>
        <MdLogout />
        Logout
      </button>
    </div>
  )
}

export default SideBar
