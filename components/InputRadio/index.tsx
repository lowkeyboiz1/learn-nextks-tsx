import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import { useState } from 'react'

function InputRadio({
  rule,
  errorMessage,
  title,
  values,
  start = true,
  setData,
  data,
}: {
  rule?: any
  errorMessage: string
  title: string
  values: any
  start?: boolean
  setData: any
  data: any
}) {
  return (
    <FormControl>
      <FormLabel id='demo-row-radio-buttons-group-label'>
        <div className='text-[16px]'>
          <span className='!text-white'>{title}</span>{' '}
          {start && <span className='text-[red]'>*</span>}
        </div>
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby='demo-row-radio-buttons-group-label'
        name='gender'
        value={data}
        onChange={(e) => setData(e.target.value)}
      >
        {values.map((value: any, index: any) => (
          <FormControlLabel
            key={index}
            value={value.value}
            control={
              <Radio
                sx={{
                  color: 'white',
                  '&.Mui-checked': {
                    color: '#3498db ',
                  },
                }}
              />
            }
            label={value.label}
            className='!text-white'
          />
        ))}
      </RadioGroup>
      <div className='h-[20px] w-full'>
        {rule && data.length === 0 && (
          <div className='text-red-500 py-1'>{errorMessage}</div>
        )}
      </div>
    </FormControl>
  )
}

export default InputRadio
