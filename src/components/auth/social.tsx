/* eslint-disable @typescript-eslint/no-empty-function */
'use cliet'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '@/components/ui/button'

export function Social() {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size="lg" className="w-full" onClick={() => {}} variant="outline">
        <FcGoogle className="w-5 h-5" />
      </Button>

      <Button size="lg" className="w-full" onClick={() => {}} variant="outline">
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  )
}
