import React, { useEffect, useState } from 'react'
import UserImg from '../../img/IMG_0783.jpg'
import axios from 'axios'
import token from '../../Util/TokenStorage'
import Swal from 'sweetalert2';
import ReactLoading from 'react-loading';


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
  const avatar = localStorage.getItem('avatar');
  const userId = localStorage.getItem('userid')
  const [isChecked, setIsChecked] = useState<CheckedState>({ USER: false, ADMIN: false, MODERATOR: false });
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(true)
  const [imagesURL, setImagesUrl] = useState('')
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
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const apiAdminUrl = `http://localhost:8082/api/auth/admin/users/edit/${userId}`;
  const rolesString = localStorage.getItem('roles');
  const roles: string[] = rolesString ? JSON.parse(rolesString) : [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (roles.includes('ROLE_ADMIN')) {
          setIsAdmin(true)
        }
        setIsLoading(true);
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
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching USER detail:', error);
        setIsLoading(false);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files)
    }
  }

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

  const handleFileUpload = async () => {
    try {
      // Kiểm tra xem đã chọn file hay chưa
      if (selectedFiles && selectedFiles.length > 0) {
        const formImage = new FormData();
        const selectedFile = selectedFiles[0]; // Truy cập vào tệp tin đầu tiên
        formImage.append('image', selectedFile);
        setIsLoadingImage(true)
        const response = await axios.post('http://localhost:8082/api/upload/', formImage, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        });

        if (response.status === 200) {
          const imageURL = response?.data?.imageURL[0]; // Lấy URL của file đầu tiên
          setFormUserData({ ...formUserData, avatar: imageURL });
          Swal.fire('success', 'Tải lên thành công', 'success');
          setImagesUrl(imageURL)
          console.log(imagesURL)
        } else {
          Swal.fire('error', 'Tải lên không thành công', 'error');
          setIsLoadingImage(false); // Ẩn ReactLoading nếu có lỗi xảy ra
        }
      } else {
        Swal.fire('error', 'Chưa chọn file', 'error');
      }

    } catch (error: any) {
      Swal.fire('error', error.response.data.message, 'error');
    } finally {
      setIsLoadingImage(false)
    }
  };

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
      {!isLoading && formUserData ?
        <div className='w-full flex flex-wrap'>
          <div className='flex-shrink-0 w-[33%] max-w-full p-2'>
            <div className='relative flex flex-col bg-white bg-clip-border border border-gray-100 rounded-md shadow-md'>
              <div className='text-sm font-semibold p-4 bg-gray-500 border border-gray-300 border-b-2'>Ảnh Đại Diện</div>
              <label htmlFor='file' className='flex flex-col gap-3 items-center justify-center p-4 cursor-pointer'>
                <input type="file" name='file' id='file' hidden onChange={handleFileChange} />
                {!isLoadingImage && imagesURL ? (
                  <div className='w-[160px] h-[160px] rounded-full'>
                    <ReactLoading type={'spinningBubbles'} color={'#07bd89'} height={'100%'} width={'50%'} className='m-auto flex items-center justify-center' />
                  </div>
                ) : (
                  <img src={formUserData?.avatar} alt="" className='w-[160px] h-[160px] object-cover rounded-full' />
                )}
                <span className='text-sm text-gray-500 mb-3'>Kích thước ảnh không vượt quá 3MB</span>
                <div className='flex items-center justify-center gap-3 w-full'>
                  <button type='button' onClick={handleFileUpload} className='w-[35%] inline-block font-semibold text-center select-none border p-2 rounded-md text-white bg-[#0d6efd] border-blue-600 hover:bg-[#3764a8]'>Tải ảnh lên</button>
                  <button type='button' onClick={handleSaveChanges} className='w-[35%] inline-block font-semibold text-center select-none border p-2 rounded-md text-white bg-[#0d6efd] border-blue-600 hover:bg-[#3764a8]'>Lưu ảnh</button>
                </div>
              </label>
            </div>
            <div className='relative flex flex-col bg-white bg-clip-border border border-gray-100 rounded-md shadow-md mt-3'>
              <div className='text-sm font-semibold p-4 bg-gray-500 border border-gray-300 border-b-2'>Thay Đổi Mật Khẩu</div>
              <form action="">
                <div className=' p-3'>
                  <label htmlFor="" className='text-sm text-gray-500 mb-2 '>Nhập Mật Khẩu Cũ</label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={formPassword.oldPassword}
                    onChange={handleChangePassword}
                    className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
                </div>
                <div className=' p-3'>
                  <label htmlFor="" className='text-sm text-gray-500 mb-2 '>Nhập Mật Khẩu Mới</label>
                  <input
                    type="password"
                    name="password"
                    value={formPassword.password}
                    onChange={handleChangePassword}
                    className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
                </div>
                <div className=' p-3'>
                  <label htmlFor="" className='text-sm text-gray-500 mb-2 '>Nhập Lại Mật Khẩu</label>
                  <input
                    type='password'
                    name="confirmPassword"
                    value={formPassword.confirmPassword}
                    onChange={handleChangePassword}
                    className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
                </div>
                <button onClick={handleSubmitPassword} type='button' className='inline-block font-semibold text-center mt-4 ml-3 mb-4 select-none border p-2 rounded-md text-white bg-[#0d6efd] border-blue-600 hover:bg-[#3764a8]'>Lưu thay đổi</button>
              </form>
            </div>
          </div>
          <div className='flex-shrink-0 w-[66%] p-2'>
            <div className='flex flex-col relative bg-white bg-clip-border border border-gray-200 rounded-md mb-4 '>
              <div className='text-sm font-semibold p-4 bg-gray-500 border border-gray-300 border-b-2'>Thông Tin Tài Khoản</div>
              <div className='flex-1 p-1 shadow-md'>
                <form action="">
                  <div className=' p-3'>
                    <label htmlFor="" className='text-sm text-gray-500 mb-2 '>Tên Tài Khoản</label>
                    <input
                      type="text"
                      value={formUserData?.userName}
                      name='userName'
                      onChange={handleChange}
                      className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
                  </div>
                  <div className=' p-3'>
                    <label htmlFor="" className='text-sm text-gray-500 mb-2 '>Họ Và Tên</label>
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
                      <label htmlFor="" className='text-sm text-gray-500 mb-2'>Số Điện Thoại</label>
                      <input
                        type="text"
                        value={formUserData?.phone}
                        name="phone"
                        onChange={handleChange}
                        className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
                    </div>
                  </div>

                  {isAdmin ? <div className='p-2'>
                    <label htmlFor="" className='p-2 text-sm text-gray-500 mb-2 w-full inline-block text-start'>VAI TRÒ</label>
                    <div className='w-full flex gap-3 items-center text-gray-500 px-3'>
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

                  <button onClick={handleSaveChanges} type='button' className='inline-block font-semibold text-center mt-4 ml-3 mb-4 select-none border p-2 rounded-md text-white bg-[#0d6efd] border-blue-600 hover:bg-[#3764a8]'>Lưu thay đổi</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        :
        <div className='fixed inset-0 bg-gray-500 bg-opacity-50'>
          <ReactLoading type={'spokes'} color={'#07bd89'} height={'100%'} width={'5%'} className='flex items-center justify-center m-auto' />
        </div>
      }
    </div>
  )
}

export default DetailUser