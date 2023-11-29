'use client'

import Link from 'next/link'
import styles from './menu-link.module.css'
import { FC } from 'react'
import { usePathname } from 'next/navigation'

type MenuLinkType = {
  id: `${string}-${string}-${string}-${string}-${string}`
  title: string
  path: string
  icon: JSX.Element
}

interface MenuLinkProps {
  item: MenuLinkType
}

const MenuLink: FC<MenuLinkProps> = ({ item }) => {
  const pathName = usePathname()
  return (
    <Link
      href={item.path}
      className={`${styles.container} ${
        pathName === item.path && styles.active
      }`}
    >
      {item.icon}
      {item.title}
    </Link>
  )
}

export default MenuLink
