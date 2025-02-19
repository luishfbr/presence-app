"use client"

import React from 'react'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './ui/input-otp'

interface CnpjInputProps {
  onRegistryChange: (value: number) => void
}

export default function CnpjInput({ onRegistryChange }: CnpjInputProps) {
  const [registryValue, setRegistryValue] = React.useState<string>("")

  const handleRegistryChange = (value: string) => {
    setRegistryValue(value)
    onRegistryChange(Number(value))
  }

  return (
    <InputOTP maxLength={14} value={registryValue} onChange={(registryValue) => handleRegistryChange(registryValue)}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTPGroup>
      <span className="text-4xl">.</span>
      <InputOTPGroup>
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
      </InputOTPGroup>
      <span className="text-4xl">.</span>
      <InputOTPGroup>
        <InputOTPSlot index={5} />
        <InputOTPSlot index={6} />
        <InputOTPSlot index={7} />
      </InputOTPGroup>
      <span className="text-4xl">/</span>
      <InputOTPGroup>
        <InputOTPSlot index={8} />
        <InputOTPSlot index={9} />
        <InputOTPSlot index={10} />
        <InputOTPSlot index={11} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={12} />
        <InputOTPSlot index={13} />
      </InputOTPGroup>
    </InputOTP>
  )
}
