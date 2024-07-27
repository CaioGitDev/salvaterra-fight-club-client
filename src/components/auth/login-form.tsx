import Image from 'next/image'
import LogoImage from '../../../public/images/logo.svg'

export function LoginForm() {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="flex flex-col justify-center sm:mx-auto sm:w-full sm:max-w-sm ">
        <Image
          className="object-cover"
          src={LogoImage}
          alt=""
          width={100}
          height={100}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primary-text-light">
          Sign in to your account
        </h2>
      </div>
    </div>
  )
}
