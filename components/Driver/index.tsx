import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'
import { Collapse } from '@mui/material'
import { useRouter } from 'next/router'
import { usePathname, useSearchParams } from 'next/navigation'

function Driver({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)

  const router = useRouter()

  const handleToggle = (menu: 'open' | 'open2') => {
    if (menu === 'open') {
      setOpen((prevOpen) => !prevOpen)
    } else if (menu === 'open2') {
      setOpen2((prevOpen) => !prevOpen)
    }
  }

  type Anchor = 'top' | 'left' | 'bottom' | 'right'
  const [state, setState] = useState<Record<Anchor, boolean>>({
    top: false,
    left: false,
    bottom: false,
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

  return (
    <>
      <Button onClick={toggleDrawer('left', true)}>{children}</Button>
      <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
        <List
          sx={{
            width: '100%',
            maxWidth: 400,
            minWidth: 320,
            bgcolor: 'background.paper',
          }}
          component='nav'
          aria-labelledby='nested-list-subheader'
        >
          {/* Other menu items */}
          <ListItemButton onClick={() => router.push('/')}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItemButton>

          <ListItemButton onClick={() => handleToggle('open')}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Users' />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => router.push('/Users')}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary='Users' />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton onClick={() => handleToggle('open2')}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Admin' />
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open2} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary='Admin' />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Drawer>
    </>
  )
}

export default Driver
