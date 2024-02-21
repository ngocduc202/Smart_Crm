import React from 'react'
import Layout from './Layout'
import UserManager from '../Components/User/UserManager'

const UserManagerPage = () => {
  return (
    <Layout
      children={<UserManager />}
      style=''
    />
  )
}

export default UserManagerPage