"use client"

import React from 'react'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './ui/input-otp'

interface CpfInputProps {
  onRegistryChange: (value: number) => void
}

export default function CpfInput({ onRegistryChange }: CpfInputProps) {
  const [registryValue, setRegistryValue] = React.useState<string>("")

  const handleRegistryChange = (value: string) => {
    setRegistryValue(value)
    onRegistryChange(Number(value))
  }

  return (
    <InputOTP maxLength={11} value={registryValue} onChange={(registryValue) => handleRegistryChange(registryValue)}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <span className="text-4xl">.</span>
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
      <span className="text-4xl">.</span>
      <InputOTPGroup>
        <InputOTPSlot index={6} />
        <InputOTPSlot index={7} />
        <InputOTPSlot index={8} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={9} />
        <InputOTPSlot index={10} />
      </InputOTPGroup>
    </InputOTP>
  )
}
