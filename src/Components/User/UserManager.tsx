import React, { useEffect, useState } from 'react'
import axios from "axios"
import moment from 'moment'
import userimage from '../../img/user_image.png'
import EditUser from './EditUser'
import DeleteUser from './DeleteUser'

const UserManager = () => {

  const [user, setUser] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDelete, setisOpenDelete] = useState(false)
  const [idUser, setIdUser] = useState(0)

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
        console.error('Error fetching USER data:', error);
      }
    };
    fetchData()
  }, [])

  const handleOpen = (id: number, action: string) => {
    if (action === 'edit') {
      setIsOpen(true)
      setIdUser(id)
    } else if (action === 'delete') {
      setisOpenDelete(true)
      setIdUser(id)
    }
  }

  const handleClose = (action: string) => {
    if (action === 'edit') {
      setIsOpen(false)
    } else if (action === 'delete') {
      setisOpenDelete(false)
    }
  }

  return (
    <main className='main-container bg-gray-100'>
      <div className='flex items-center justify-center mb-6 mt-2'>
        <h2 className='text-2xl font-bold text-[#212529]'>UserManager</h2>
      </div>
      <div>
        <table className='min-w-[1000px] w-full shadow-lg mb-3 text-[#212529] border-collapse text-center border-t-2 border-[#eceffa] '>
          <thead>
            <tr className='bg-white border-b-2 border-[#eceffa]'>
              <th className='border-none p-[30px] text-sm font-medium text-gray-600 '>STT</th>
              <th className='border-none p-[30px] text-sm font-medium text-gray-600 '>Email</th>
              <th className='border-none p-[30px] text-sm font-medium text-gray-600 '>Tên người dùng</th>
              <th className='border-none p-[30px] text-sm font-medium text-gray-600'>Điện thoại</th>
              <th className='border-none p-[30px] text-sm font-medium text-gray-600'>Trạng thái</th>
              <th className='border-none p-[30px] text-sm font-medium text-gray-600'>Vai trò</th>
              <th className='border-none p-[30px] text-sm font-medium text-gray-600'>Hành Động</th>
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
                      <span>{(role.roleName).replace('ROLE_', '')}</span>
                    ))}
                  </div>
                </td>
                <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>
                  {user['status'] === 1 ?
                    <div className="flex justify-center items-center h-auto gap-2">
                      <button onClick={() => { handleOpen(user['id'], 'edit') }} className="bg-white text-gray-700 border border-yellow-500 font-semibold text-sm py-[6px] px-5 rounded hover:bg-yellow-500 hover:text-white transition duration-200">
                        Sửa
                      </button>
                      <button onClick={() => { handleOpen(user['id'], 'delete') }} className="bg-white text-gray-700 border border-red-500 font-semibold text-sm py-[6px] px-5 rounded hover:bg-red-500 hover:text-white transition duration-200">
                        Xóa
                      </button>
                    </div>
                    :
                    <div className="flex justify-center items-center h-auto gap-2">
                      <button disabled onClick={() => { handleOpen(user['id'], 'edit') }} className="bg-white text-gray-700 border border-yellow-500 font-semibold text-sm py-[6px] px-5 rounded opacity-60 cursor-not-allowed ">
                        Sửa
                      </button>
                      <button disabled onClick={() => { handleOpen(user['id'], 'delete') }} className="bg-white text-gray-700 border border-red-500 font-semibold text-sm py-[6px] px-5 rounded opacity-60 cursor-not-allowed">
                        Xóa
                      </button>
                    </div>
                  }
                </td>
              </tr>
            ))}
          </tbody>
          <EditUser isOpen={isOpen} onClose={() => handleClose('edit')} idUser={idUser} />
          <DeleteUser isOpen={isOpenDelete} onClose={() => handleClose('delete')} idUser={idUser} />
        </table>
      </div>
    </main>
  )
}

export default UserManager