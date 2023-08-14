import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import InputText from '../InputText'
import RadioGroup from '@mui/material/RadioGroup'
import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  Snackbar,
} from '@mui/material'
import InputRadio from '../InputRadio'
import { CloseCircle } from 'iconsax-react'

type Anchor = 'right'

function DrawerAdd({
  children,
  meta,
  setMeta,
}: {
  children: React.ReactNode
  meta: any
  setMeta: any
}) {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [birthday, setBirthday] = useState<string>('')
  const [homeTown, setHomeTown] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')

  const [warnFirstName, setWarnFirstName] = useState(false)
  const [warnLastName, setWarnLastName] = useState(false)
  const [warnGender, setWarnGender] = useState(false)
  const [warnBirthday, setWarnBirthday] = useState(false)
  const [warnEmail, setWarnEmail] = useState(false)
  const [warnHomeTown, setWarnHomeTown] = useState(false)
  const [warnStatus, setWarnStatus] = useState(false)
  const [warnPhoneNumber, setWarnPhoneNumber] = useState(false)

  const [openMessage, setOpenMessage] = useState(false)

  const [state, setState] = useState({
    right: false,
  })

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setState({ ...state, [anchor]: open })
    }

  const handleClear = () => {
    setFirstName('')
    setLastName('')
    setGender('')
    setBirthday('')
    setHomeTown('')
    setEmail('')
    setStatus('')
    setPhoneNumber('')
    setWarnFirstName(false)
    setWarnLastName(false)
    setWarnGender(false)
    setWarnBirthday(false)
    setWarnEmail(false)
    setWarnHomeTown(false)
    setWarnStatus(false)
    setWarnPhoneNumber(false)
  }

  const handleCheckError = () => {
    if (
      !firstName.length ||
      !lastName.length ||
      !birthday.length ||
      !homeTown.length ||
      !phoneNumber.length ||
      !email.length ||
      !gender.length ||
      !status.length
    ) {
      firstName.length == 0 && setWarnFirstName(true)
      lastName.length == 0 && setWarnLastName(true)
      birthday.length == 0 && setWarnBirthday(true)
      homeTown.length == 0 && setWarnHomeTown(true)
      phoneNumber.length == 0 && setWarnPhoneNumber(true)
      email.length == 0 && setWarnEmail(true)
      gender.length == 0 && setWarnGender(true)
      status.length == 0 && setWarnStatus(true)
    } else {
      const newUser = {
        id: Date.now(),
        first_name: firstName,
        last_name: lastName,
        birthday,
        homeTown,
        phoneNumber,
        email,
        gender,
        status,
      }
      // cho nay add data
      setMeta({
        ...meta,
        dataForm: [...meta.dataForm, newUser],
      })
      setOpenMessage(true)
      handleClear()
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    handleCheckError()
  }

  const handleCloseMessage = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenMessage(false)
  }
  const handleOpen = () => {
    toggleDrawer('right', true)
  }

  return (
    <>
      <div
        onClick={() => {
          setState({ ...state, right: true })
          handleClear()
        }}
      >
        {children}
      </div>
      <Drawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
      >
        <List
          sx={{
            width: '100%',
            height: '100vh',
            maxWidth: '90vw',
            minWidth: '80vw',
            bgcolor: '#485460',
            px: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
          component='nav'
          aria-labelledby='nested-list-subheader'
        >
          <form onSubmit={handleSubmit} className='w-full'>
            <header className='text-center text-[32px] text-white font-bold mb-[20px]'>
              Nhập thông tin thợ
            </header>
            <div className='flex gap-2'>
              <InputText
                title='Họ'
                errorMessage='Vui lòng nhập trường này'
                className=''
                setData={setFirstName}
                data={firstName}
                setRule={setWarnFirstName}
                rule={warnFirstName}
              />
              <InputText
                title='Tên'
                errorMessage='Vui lòng nhập trường này'
                className=''
                setData={setLastName}
                data={lastName}
                setRule={setWarnLastName}
                rule={warnLastName}
              />
            </div>
            <div className=''>
              <InputText
                title='Ngày sinh'
                errorMessage='Vui lòng nhập trường này'
                placeholder='31/12/1999'
                className=''
                setData={setBirthday}
                data={birthday}
                setRule={setWarnBirthday}
                rule={warnBirthday}
              />
              <InputText
                title='Quê quán'
                errorMessage='Vui lòng nhập trường này'
                className=''
                setData={setHomeTown}
                data={homeTown}
                setRule={setWarnHomeTown}
                rule={warnHomeTown}
              />
            </div>
            <div className='flex gap-3'>
              <InputText
                title='Số điện thoại'
                errorMessage='Vui lòng nhập trường này'
                className=''
                setData={setPhoneNumber}
                data={phoneNumber}
                setRule={setWarnPhoneNumber}
                rule={warnPhoneNumber}
              />
              <InputText
                title='Email'
                errorMessage='Vui lòng nhập trường này'
                className=''
                setData={setEmail}
                data={email}
                setRule={setWarnEmail}
                rule={warnEmail}
              />
            </div>
            <div className='flex gap-3 justify-around my-3'>
              <InputRadio
                data={gender}
                setData={setGender}
                title='Gender'
                values={[
                  { label: 'Female', value: 'female' },
                  { label: 'Male', value: 'male' },
                ]}
                rule={warnGender}
                errorMessage='Vui lòng nhập trường này'
              />

              <InputRadio
                data={status}
                setData={setStatus}
                title='Trạng thái'
                values={[
                  { label: 'Hoạt động', value: 'onl' },
                  { label: 'Off', value: 'off' },
                ]}
                rule={warnStatus}
                errorMessage='Vui lòng nhập trường này'
              />
            </div>

            <div className='flex justify-center'>
              <Button type='submit' variant='contained' size='large' color='info'>
                Submit
              </Button>
            </div>
          </form>
        </List>
        <div
          className='absolute top-2 right-2 cursor-pointer'
          onClick={() => {
            handleClear()
            setState({ ...state, right: false })
          }}
        >
          <CloseCircle size='32' color='#FF8A65' />
        </div>

        <Snackbar open={openMessage} autoHideDuration={1500} onClose={handleCloseMessage}>
          <Alert onClose={handleCloseMessage} severity='success' sx={{ width: '100%' }}>
            Bạn đã thêm thành công user!
          </Alert>
        </Snackbar>
      </Drawer>
    </>
  )
}

export default DrawerAdd
