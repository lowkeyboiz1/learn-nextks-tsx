import Link from 'next/link'
import SwitchMode from '../SwitchMode/SwitchMode'
import { HambergerMenu, User } from 'iconsax-react'
import { useState } from 'react'
import Driver from '../Driver'
import { Avatar, Button } from '@mui/material'

function Header() {
  const [showMenu, setShowMenu] = useState(false)
  const [login, setLogin] = useState(false)
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
          {login ? (
            <Avatar
              alt='Remy Sharp'
              src='/static/images/avatar/1.jpg'
              sx={{ cursor: 'pointer' }}
            />
          ) : (
            <Button
              variant='outlined'
              startIcon={<User size='24' variant='Outline' />}
              sx={{ borderRadius: 20 }}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
