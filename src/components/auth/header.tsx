import Image from 'next/image'

import userImage from '../../../public/images/sfc-logo-black.png'

interface HeaderProps {
  label: string
}

export function Header({ label }: HeaderProps) {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <Image
        src={userImage}
        alt="Salvaterra Fight Club Logo"
        width={100}
        height={100}
      />
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  )
}
