import React from 'react'
import Layout from './Layout'
import NotificationsManager from '../Components/Notifications/NotificationsManager'

const NotificationsManagerPage = () => {
  return (
    <Layout
      children={<NotificationsManager />}
      style=''
    />
  )
}

export default NotificationsManagerPage