import React, { useState } from 'react'
import Header from '../Components/Header/Header'
import Sidebar from '../Components/Sidebar/Sidebar'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { getAccessToken } from '../Util/GetAccessToken'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
interface LayoutProps {
  children: React.ReactNode;
  style: string
}

const Layout: React.FC<LayoutProps> = ({ children, style }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const navigate = useNavigate()
  const [check, setCheck] = useState(false)

  useEffect(() => {
    const AccessToken = getAccessToken('access_token');


    if (!AccessToken) {
      navigate('/login')
    } else {
      setCheck(true)
    }
  }, []);

  return (
    <>
      {check ? (
        <div className={clsx('grid-container', style)}>
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar openSidebarToggle={openSidebarToggle} />
          {children}
        </div>
      ) : null}
    </>
  )
}

export default Layout