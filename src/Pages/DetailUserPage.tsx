import React from 'react'
import Layout from './Layout'
import DetailUser from '../Components/User/DetailUser'

const DetailUserPage = () => {
  return (
    <Layout
      children={<DetailUser />}
      style='grid-config'
    />
  )
}

export default DetailUserPage