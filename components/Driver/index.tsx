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
  const router = useRouter()

  const menus = [
    { id: 'home', title: 'Home' },
    { id: 'about', title: 'About' },
    {
      id: 'users',
      title: 'users',
      children: [
        {
          id: 'users',
          title: 'Users',
        },
        {
          id: 'user2',
          title: 'User2',
        },
        {
          id: 'user3',
          title: 'User3',
        },
      ],
    },
    {
      id: 'admin',
      title: 'Admins',
      children: [
        {
          id: 'admin',
          title: 'Admin',
        },
      ],
    },
  ]

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
          {menus.map((menu, index) => (
            <RenderMenuItem menu={menu} key={index} state={state} setState={setState} />
          ))}
        </List>
      </Drawer>
    </>
  )
}

const RenderChildrenMenu = ({
  menu,
  setState,
  state,
}: {
  menu: any
  setState: any
  state: any
}) => {
  const router = useRouter()

  return (
    <ListItemButton
      sx={{ pl: 4 }}
      onClick={() => {
        setState({ ...state, left: false })
        router.push(`/${menu?.title}`)
      }}
    >
      <ListItemIcon>
        <StarBorder />
      </ListItemIcon>
      <ListItemText primary={menu?.title} />
    </ListItemButton>
  )
}

const RenderMenuItem = ({
  menu,
  setState,
  state,
}: {
  menu: any
  setState: any
  state: any
}) => {
  const [showChildrenItem, setShowChildrenItem] = useState(false)
  const router = useRouter()

  return (
    <>
      <ListItemButton
        onClick={() => {
          if (!menu?.children?.length) {
            router.push(`/${menu.title !== 'Home' ? menu?.title : ''}`)
            setState({ ...state, left: false })
          } else {
            setShowChildrenItem(!showChildrenItem)
          }
        }}
      >
        <ListItemIcon>
          <StarBorder />
        </ListItemIcon>
        <ListItemText primary={menu.title} />
        {menu.children && (showChildrenItem ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {menu.children && (
        <Collapse in={showChildrenItem} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {menu?.children.map((item: any, index: any) => (
              <RenderChildrenMenu
                key={index}
                menu={item}
                setState={setState}
                state={state}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  )
}

export default Driver
