'use client'
import React from 'react'
import Header from '../Header'
import { useSelector } from 'react-redux'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className='px-8 py-3 bg-[#f1f2f6]'>{children}</div>
    </div>
  )
}

export default Layout
