import React, { useEffect, useState } from 'react'
import UserImg from '../../img/IMG_0783.jpg'
import axios from 'axios'
import token from '../../Util/TokenStorage'
import Swal from 'sweetalert2';


interface CheckedState {
  USER: boolean;
  ADMIN: boolean;
  MODERATOR: boolean
}
interface FormData {
  userName: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  listRoles: ListRoles[]; // Đây là một mảng chứa các đối tượng Role
}
interface ListRoles {
  roleId: number;
  roleName: string;
}


const DetailUser = () => {

  const userId = localStorage.getItem('userid')
  const [isChecked, setIsChecked] = useState<CheckedState>({ USER: false, ADMIN: false, MODERATOR: false });
  const [isAdmin, setIsAdmin] = useState(false)
  const [formUserData, setFormUserData] = useState<FormData>({
    userName: '',
    name: '',
    avatar: '',
    email: '',
    phone: '',
    listRoles: []
  })
  const [formPassword, setFormPassword] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: '',
  })

  const apiAdminUrl = `http://localhost:8082/api/auth/admin/users/edit/${userId}`;
  const rolesString = localStorage.getItem('roles');
  const roles: string[] = rolesString ? JSON.parse(rolesString) : [];

  useEffect(() => {
    const fetchData = async () => {
      //check cos phải admin hay không
      if (roles.includes('ROLE_ADMIN')) {
        setIsAdmin(true)
      }
      const response = await axios.get(`http://localhost:8082/api/auth/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const UserData = response.data[0];
        setFormUserData({
          userName: UserData.userName,
          name: UserData.name,
          avatar: UserData.avatar,
          email: UserData.email,
          phone: UserData.phone,
          listRoles: UserData.listRoles
        });
      }
    }
    fetchData()
  }, [])


  useEffect(() => {
    const hasUserRole = formUserData?.listRoles?.some(role => role.roleName === "ROLE_USER");
    const hasAdminRole = formUserData?.listRoles?.some(role => role.roleName === "ROLE_ADMIN");
    const hasModeratorRole = formUserData?.listRoles?.some(role => role.roleName === "ROLE_MODERATOR");

    if (hasUserRole) {
      setIsChecked({
        USER: true,
        ADMIN: hasAdminRole,
        MODERATOR: hasModeratorRole
      });
    }
    if (hasAdminRole) {
      setIsChecked({
        USER: hasUserRole,
        ADMIN: true,
        MODERATOR: hasModeratorRole
      });
    }
    if (hasModeratorRole) {
      setIsChecked({
        USER: hasUserRole,
        ADMIN: hasAdminRole,
        MODERATOR: true
      });
    }
  }, [formUserData])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormUserData({ ...formUserData, [e.target.name]: e.target.value });
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormPassword({ ...formPassword, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setIsChecked(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const createRolesArray = () => {
    const rolesArray: ListRoles[] = [];
    rolesArray.push({ roleId: 2, roleName: 'ROLE_USER' });
    if (isChecked.ADMIN) {
      rolesArray.push({ roleId: 1, roleName: 'ROLE_ADMIN' });
    }
    if (isChecked.MODERATOR) {
      rolesArray.push({ roleId: 3, roleName: 'ROLE_MODERATOR' });
    }

    return rolesArray;
  };


  const handleSubmitPassword = async () => {
    if (formPassword.password !== formPassword.confirmPassword) {
      Swal.fire('error', 'Mật khẩu không khớp', 'error');
    } else {
      try {
        const response = await axios.put('http://localhost:8082/api/auth/users/changepassword', formPassword, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.status === 200) {
          Swal.fire("Succes", response.data.message, "success").then(() => {
            window.location.reload()
          })
        }
      } catch (error: any) {
        Swal.fire('error', error.response.data.message, 'error');
      }
    }
  }



  const handleSaveChanges = async () => {
    try {

      const rolesArray = createRolesArray();
      const finalFormData = { ...formUserData, listRoles: rolesArray };
      const response = await axios.put(apiAdminUrl, finalFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        Swal.fire("Succes", response.data.message, "success").then(() => {
          window.location.reload()
        })
      }
      // Thực hiện các hành động cần thiết sau khi lưu thành công, ví dụ như hiển thị thông báo thành công, đóng modal, vv.
    } catch (error: any) {
      console.log('Error updating user:', error);
    }
  };

  return (
    <div className='main-container'>
      <div className='w-full flex flex-wrap'>
        <div className='flex-shrink-0 w-[33%] max-w-full p-2'>
          <div className='relative flex flex-col bg-white bg-clip-border border border-gray-100 rounded-md shadow-md'>
            <div className='text-sm font-semibold p-4 bg-gray-500 border border-gray-300 border-b-2'>Profile Picture</div>
            <div className='flex flex-col gap-3 items-center justify-center p-4'>
              <img src={UserImg} alt="" className='w-[160px] h-[160px] object-cover rounded-full' />
              <div className='text-sm text-gray-500 mb-3'>JPG or PNG no larger than 5 MB</div>
              <button type='button' className='inline-block font-semibold text-center select-none border p-2 rounded-md text-white bg-[#0d6efd] border-blue-600 hover:bg-[#3764a8]'>Upload new image</button>
            </div>
          </div>
          <div className='relative flex flex-col bg-white bg-clip-border border border-gray-100 rounded-md shadow-md mt-3'>
            <div className='text-sm font-semibold p-4 bg-gray-500 border border-gray-300 border-b-2'>Change Password</div>
            <form action="">
              <div className=' p-3'>
                <label htmlFor="" className='text-sm text-gray-500 mb-2 '>Current Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={formPassword.oldPassword}
                  onChange={handleChangePassword}
                  className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
              </div>
              <div className=' p-3'>
                <label htmlFor="" className='text-sm text-gray-500 mb-2 '>New Password</label>
                <input
                  type="password"
                  name="password"
                  value={formPassword.password}
                  onChange={handleChangePassword}
                  className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
              </div>
              <div className=' p-3'>
                <label htmlFor="" className='text-sm text-gray-500 mb-2 '>Confirm New Password</label>
                <input
                  type='password'
                  name="confirmPassword"
                  value={formPassword.confirmPassword}
                  onChange={handleChangePassword}
                  className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
              </div>
              <button onClick={handleSubmitPassword} type='button' className='inline-block font-semibold text-center mt-4 ml-3 mb-4 select-none border p-2 rounded-md text-white bg-[#0d6efd] border-blue-600 hover:bg-[#3764a8]'>Save changes</button>
            </form>
          </div>
        </div>
        <div className='flex-shrink-0 w-[66%] p-2'>
          <div className='flex flex-col relative bg-white bg-clip-border border border-gray-200 rounded-md mb-4 '>
            <div className='text-sm font-semibold p-4 bg-gray-500 border border-gray-300 border-b-2'>Account Details</div>
            <div className='flex-1 p-1 shadow-md'>
              <form action="">
                <div className=' p-3'>
                  <label htmlFor="" className='text-sm text-gray-500 mb-2 '>UserName</label>
                  <input
                    type="text"
                    value={formUserData?.userName}
                    name='userName'
                    onChange={handleChange}
                    className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
                </div>
                <div className=' p-3'>
                  <label htmlFor="" className='text-sm text-gray-500 mb-2 '>Name</label>
                  <input
                    type="text"
                    value={formUserData?.name}
                    name='name'
                    onChange={handleChange}
                    className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
                </div>
                <div className='flex flex-wrap p-1'>
                  <div className='w-[50%] p-2'>
                    <label htmlFor="" className='text-sm text-gray-500 mb-2 '>Email</label>
                    <input
                      type="text"
                      readOnly
                      value={formUserData?.email}
                      name='email'
                      className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
                  </div>
                  <div className='w-[50%] p-2'>
                    <label htmlFor="" className='text-sm text-gray-500 mb-2'>Phone</label>
                    <input
                      type="text"
                      value={formUserData?.phone}
                      name="phone"
                      onChange={handleChange}
                      className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
                  </div>
                </div>

                {isAdmin ? <div className='p-2'>
                  <label htmlFor="" className='text-sm text-gray-500 mb-2 w-full inline-block text-start'>VAI TRÒ</label>
                  <div className='w-full flex gap-3 items-center text-gray-500'>
                    <label htmlFor=""><input type="checkbox" checked={isChecked.USER} name='USER' onChange={handleCheckboxChange} className='w-[15px] h-[15px]' />  USER</label>
                    <label htmlFor=""><input type="checkbox" checked={isChecked.ADMIN} name='ADMIN' onChange={handleCheckboxChange} className='w-[15px] h-[15px]' />  ADMIN</label>
                    <label htmlFor=""><input type="checkbox" checked={isChecked.MODERATOR} name='MODERATOR' onChange={handleCheckboxChange} className='w-[15px] h-[15px]' />  MODERATOR</label>
                  </div>
                </div> : null}

                {/* <div className='p-3'>
                  <label htmlFor="" className='text-sm text-gray-500 mb-2 '>Email</label>
                  <input type="text" className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
                </div>
                <div className='flex flex-wrap p-1'>
                  <div className='w-[50%] p-2'>
                    <label htmlFor="" className='text-sm text-gray-500 mb-2 '>Phone</label>
                    <input type="text" className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
                  </div>
                  <div className='w-[50%] p-2'>
                    <label htmlFor="" className='text-sm text-gray-500 mb-2 '>Birthday</label>
                    <input type="text" className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
                  </div>
                </div> */}

                <button onClick={handleSaveChanges} type='button' className='inline-block font-semibold text-center mt-4 ml-3 mb-4 select-none border p-2 rounded-md text-white bg-[#0d6efd] border-blue-600 hover:bg-[#3764a8]'>Save changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailUser