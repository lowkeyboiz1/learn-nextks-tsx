import Link from 'next/link'
import SwitchMode from '../SwitchMode/SwitchMode'
import { HambergerMenu, User } from 'iconsax-react'
import { useState } from 'react'
import Driver from '../Driver'
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Modal,
  TextField,
  Typography,
} from '@mui/material'

function Header() {
  const [showMenu, setShowMenu] = useState(false)
  const [login, setLogin] = useState(false)
  const [openModalLogin, setOpenModalLogin] = useState(false)

  const toggleModalLogin = () => setOpenModalLogin(!openModalLogin)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    })
  }

  return (
    <header className='flex h-[60px] w-full justify-between items-center py-2 px-4 text-black bg-[#bdc3c7] dark:text-[#ecf0f1] dark:bg-[#34495e]'>
      {/*Start Menu Moblie */}
      <Driver>
        <HambergerMenu size='32' color='#FF8A65' />
      </Driver>

      {/* End Menu Moblie */}
      <div className='logo '>
        <Link href={'/'}>Logo here!</Link>
      </div>

      <div className='end flex gap-3 items-center'>
        <div>
          <SwitchMode />
        </div>
        <div className='' onClick={() => setLogin((prev) => !prev)}>
          {false ? (
            <Avatar
              alt='Remy Sharp'
              src='/static/images/avatar/1.jpg'
              sx={{ cursor: 'pointer' }}
            />
          ) : (
            <>
              <Link href={'/login'}>
                <Button
                  variant='outlined'
                  startIcon={<User size='24' variant='Outline' />}
                  sx={{ borderRadius: 20 }}
                  onClick={toggleModalLogin}
                >
                  Login
                </Button>
              </Link>
              <Modal
                open={openModalLogin}
                onClose={toggleModalLogin}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <Container component='main' maxWidth='xs'>
                    <Box
                      sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Typography component='h1' variant='h5' color='#000'>
                        Sign in
                      </Typography>
                      <Box
                        component='form'
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                      >
                        <TextField
                          margin='normal'
                          required
                          fullWidth
                          id='email'
                          label='Email Address'
                          name='email'
                          autoComplete='email'
                          autoFocus
                        />
                        <TextField
                          margin='normal'
                          required
                          fullWidth
                          name='password'
                          label='Password'
                          type='password'
                          id='password'
                          autoComplete='current-password'
                        />
                        <FormControlLabel
                          className='text-black'
                          control={<Checkbox value='remember' color='primary' />}
                          label='Remember me'
                        />
                        <Button
                          type='submit'
                          fullWidth
                          color='info'
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Sign In
                        </Button>
                      </Box>
                    </Box>
                  </Container>
                  khang
                </Box>
              </Modal>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
