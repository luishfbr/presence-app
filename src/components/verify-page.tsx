import React from 'react'
import { Card } from './ui/card'
import { Loader2 } from 'lucide-react'

export default function VerfifyPage() {
  return (
    <div className="h-screen flex justify-center items-center mx-auto bg-card">
      <Card className="h-[80%] w-[80%]" >
        <Loader2 className='animate-spin h-20 w-20'/>
      </Card>
    </div>
  )
}
