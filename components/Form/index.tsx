import React from 'react'
import { useForm, Controller } from 'react-hook-form'

interface FormData {
  Native: string
  TextField: string
  Select: string
  ReactSelect: { value: string; label: string }
  Checkbox: boolean
  switch: boolean
  RadioGroup: string
  numberFormat: number
  downShift: string
  ReactDatepicker: Date
  reactMaskInput: string
}

function Form() {
  const { control } = useForm()

  return (
    <Controller
      render={({ field }) => <input {...field} />}
      name='firstName'
      control={control}
      defaultValue=''
    />
  )
}

export default Form
