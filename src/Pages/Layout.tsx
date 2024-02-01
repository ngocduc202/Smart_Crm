import React, { useState } from 'react'
import Header from '../Components/Header/Header'
import Sidebar from '../Components/Sidebar/Sidebar'
import clsx from 'clsx'
interface LayoutProps {
  children: React.ReactNode;
  style: string
}

const Layout: React.FC<LayoutProps> = ({ children, style }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className={clsx('grid-container', style)}>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} />
      {children}
    </div>
  )
}

export default Layout