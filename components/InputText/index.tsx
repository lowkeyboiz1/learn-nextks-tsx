import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  makeStyles,
} from '@mui/material'

function InputText({
  title,
  start = true,
  errorMessage,
  className,
  setData,
  data,
  setRule,
  rule = false,
  placeholder,
}: {
  title: string
  start?: boolean
  errorMessage: string
  className?: any
  setData: Function
  data: string
  setRule: Function
  rule: any
  placeholder?: string
}) {
  const handleChange = (e: any) => {
    const value = e.target.value
    if (!value.startsWith(' ')) {
      setRule(false)
      setData(value)
    }
  }

  const classes = {
    formControl: {
      width: '100%',
      '& .MuiInput-underline:before': {
        borderBottomColor: 'white', // Change the border color here
      },
      '& .MuiInputBase-root': {
        color: 'white', // Change the text color here
      },
    },
    menuItem: {
      color: 'white', // Change the text color for menu items
    },
  }

  return (
    <>
      <div className='input-group py-2 w-full'>
        <TextField
          placeholder={placeholder}
          autoComplete='off'
          className={`!w-[100%] ${className}`}
          id='outlined-basic'
          value={data}
          onBlur={() => {
            data.length <= 0 && setRule(true)
          }}
          onChange={(e) => handleChange(e)}
          label={
            <div className='text-[16px]'>
              <span>{title}</span> {start && <span className='text-[red]'>*</span>}
            </div>
          }
          variant='outlined'
          sx={{
            '& input': {
              color: 'white',
            },
            '& label': {
              color: 'white',
            },
            '& label.Mui-focused': {
              color: 'white',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
          }}
        />
        <div className='h-[20px] w-full'>
          {rule && data.length === 0 && (
            <div className='text-red-500 py-1'>{errorMessage}</div>
          )}
        </div>
      </div>
    </>
  )
}

export default InputText
