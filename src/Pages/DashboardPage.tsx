import React from 'react'
import Layout from './Layout'
import Dashboard from '../Components/Dashboard/Dashboard'


const DashboardPage = () => {
  return (
    <Layout
      children={<Dashboard />}
      style=''
    />
  )
}

export default DashboardPage