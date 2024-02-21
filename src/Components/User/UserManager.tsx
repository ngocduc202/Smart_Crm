import React, { useEffect, useState } from 'react'
import axios from "axios"
import moment from 'moment'
import userimage from '../../img/user_image.png'

const UserManager = () => {

  const [user, setUser] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token: any = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:8082/api/auth/admin/users', {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào tiêu đề Authorization
            },
          });
          setUser(response.data)
        } else {
          console.log('Token not found');
        }


      } catch (error) {
        console.error('Error fetching CRM data:', error);
      }
    };
    fetchData()
  }, [])


  return (
    <main className='main-container'>
      <div className='flex items-center justify-center mb-6 mt-2'>
        <h2 className='text-2xl font-bold text-[#212529]'>UserManager</h2>
      </div>
      <div>
        <table className='min-w-[1000px] w-full shadow-lg mb-3 text-[#212529] border-collapse text-center border-t-2 border-[#eceffa] '>
          <thead>
            <tr className='bg-white border-b-2 border-[#eceffa]'>
              <th className='border-none p-[30px] text-sm font-medium text-gray-600 '>STT</th>
              <th className='border-none p-[30px] text-sm font-medium text-gray-600 '>Email</th>
              <th className='border-none p-[30px] text-sm font-medium text-gray-600 '>UserName</th>
              <th className='border-none p-[30px] text-sm font-medium text-gray-600'>Name</th>
              <th className='border-none p-[30px] text-sm font-medium text-gray-600'>Phone</th>
              <th className='border-none p-[30px] text-sm font-medium text-gray-600'>Status</th>
              <th className='border-none p-[30px] text-sm font-medium text-gray-600'>Roles</th>
            </tr>
          </thead>
          <tbody>
            {user && user.map(user => (
              <tr className='bg-white border-b-2 border-[#eceffa]' key={user['id']}>
                <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>{user['id']}</td>
                <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle flex items-center gap-5'>
                  <div className='w-[60px] h-[60px]'>{user['avatar'] ? <img src={user['avatar']} alt="" className='bg-cover bg-repeat w-full h-full bg-center rounded-full' /> : <img src={userimage} alt="" className='bg-cover bg-repeat w-full h-full bg-center rounded-full' />}</div>
                  <div className='flex flex-col gap-3'>
                    <span>{user['email']}</span>
                    <span className='text-xs text-opacity-30 text-start '>Added : {moment(user['createdAt']).format('DD/MM/YYYY')}</span>
                  </div>
                </td>
                <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>{user['userName']}</td>
                <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>{user['name']}</td>
                <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>{user['phone']}</td>
                <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>
                  {user['status'] === 1 ? <span className='relative rounded-[30px] py-1 pl-[15px] pr-[3px] bg-[#cff6dd] text-[#1fa750] flex items-center justify-center
                after:absolute after:top-[9px] after:left-[7px] after:w-[12px] after:h-[12px] after:content-[""] after:rounded-[50%] after:bg-[#23bd5a]
                '>
                    Active
                  </span>
                    :
                    <span className='relative rounded-[30px] py-1 pl-[15px] pr-[3px] bg-[#f1b3b3] text-[#fe4d4d] flex items-center justify-center
                  after:absolute after:top-[9px] after:left-[7px] after:w-[12px] after:h-[12px] after:content-[""] after:rounded-[50%] after:bg-[#fe4d4d]
                  '>
                      Block
                    </span>
                  }
                </td>
                <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>
                  <div className='flex flex-col gap-1'>
                    {user.listRoles.map((role: { roleName: string }) => (
                      <span>{role.roleName}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default UserManager