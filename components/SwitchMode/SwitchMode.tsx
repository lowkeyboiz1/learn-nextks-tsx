import { FormControlLabel } from '@mui/material'
import { useTheme } from 'next-themes'
import Switch from '@mui/material/Switch'
import { useState } from 'react'

function SwitchMode() {
  const { theme, setTheme } = useTheme()
  const [state, setState] = useState({
    gilad: true,
    jason: false,
    antoine: true,
  })
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    })
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  return (
    <FormControlLabel
      control={<Switch checked={state.gilad} onChange={handleChange} name='gilad' />}
      label={`Mode: ${theme === 'dark' ? 'dark' : 'light'}`}
    />
  )
}

export default SwitchMode
