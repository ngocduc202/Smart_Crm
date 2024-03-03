import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import userimage from '../../img/user_image.png'
import Swal from 'sweetalert2';
import token from '../../Util/TokenStorage';
import ReactLoading from 'react-loading';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  idUser: number;
}
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

const EditUser = ({ isOpen, onClose, idUser }: Props) => {

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isChecked, setIsChecked] = useState<CheckedState>({ USER: false, ADMIN: false, MODERATOR: false });
  const [formData, setFormData] = useState<FormData>({
    userName: '',
    name: '',
    avatar: '',
    email: '',
    phone: '',
    listRoles: []
  })
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  // const token: any = localStorage.getItem('token');

  const fetchUseretail = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:8082/api/auth/admin/users/${idUser}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        if (response.data.length > 0) {
          const UserData = response.data[0]; // Lấy dữ liệu từ phần tử đầu tiên của mảng
          setFormData({
            userName: UserData.userName,
            name: UserData.name,
            avatar: UserData.avatar,
            email: UserData.email,
            phone: UserData.phone,
            listRoles: UserData.listRoles
          });
        }
      }
      setIsLoading(false);

    } catch (error) {
      console.log('Error fetching USER detail:', error);
      setIsLoading(false);
    }
  };



  useEffect(() => {
    if (idUser !== 0) {
      fetchUseretail()
    }
  }, [idUser])


  useEffect(() => {
    const hasUserRole = formData?.listRoles?.some(role => role.roleName === "ROLE_USER");
    const hasAdminRole = formData?.listRoles?.some(role => role.roleName === "ROLE_ADMIN");
    const hasModeratorRole = formData?.listRoles?.some(role => role.roleName === "ROLE_MODERATOR");

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
  }, [formData])


  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  if (!isOpen) return null;

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setIsChecked(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const handleFileUpload = async () => {
    try {
      // Kiểm tra xem đã chọn file hay chưa
      if (selectedFiles && selectedFiles.length > 0) {
        const formImage = new FormData();
        const selectedFile = selectedFiles[0]; // Truy cập vào tệp tin đầu tiên
        formImage.append('image', selectedFile);
        const response = await axios.post('http://localhost:8082/api/upload/', formImage, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        });

        if (response.status === 200) {
          const imageURL = response?.data?.imageURL[0]; // Lấy URL của file đầu tiên
          setFormData({ ...formData, avatar: imageURL });
          Swal.fire('success', 'Tải lên thành công', 'success');
        } else {
          Swal.fire('error', 'Tải lên không thành công', 'error');
        }
      } else {
        Swal.fire('error', 'Chưa chọn file', 'error');
      }

    } catch (error: any) {
      Swal.fire('error', error.response.data.message, 'error');
    }
  };

  const handleSaveChanges = async () => {
    try {
      const token: any = localStorage.getItem('token');
      const rolesArray = createRolesArray();
      const finalFormData = { ...formData, listRoles: rolesArray };
      if (selectedFiles && formData.avatar.length === 0) {
        Swal.fire('error', 'Chưa tải ảnh lên', 'error');
      }
      else {
        const response = await axios.put(`http://localhost:8082/api/auth/admin/users/edit/${idUser}`, finalFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          Swal.fire("Succes", response.data.message, "success").then(() => {
            window.location.reload()
          })
        }
      }

      // Thực hiện các hành động cần thiết sau khi lưu thành công, ví dụ như hiển thị thông báo thành công, đóng modal, vv.
    } catch (error: any) {
      console.log('Error updating user:', error);
    }
  };

  return (
    <div onClick={onClose} className="fixed z-50 transition-all">
      <div className='fixed inset-0 bg-gray-500 bg-opacity-50'>
        {!isLoading && formData ?
          <div onClick={handleModalClick} className='flex flex-col w-[50%] border m-auto bg-white h-[97%] mt-3 border-gray-100 rounded-md shadow-md'>
            <div className='w-full border-b-2 border-[#eceffa] relative'>
              <div className='text-xl font-semibold text-gray-600 p-2 w-full text-start ml-3'>THÔNG TIN TÀI KHOẢN : {formData ? formData.userName : <>loading...</>} </div>
              <div className="absolute top-0 right-0 mt-2 mr-2">
                <FontAwesomeIcon onClick={onClose} className="p-1 text-2xl text-gray-600 cursor-pointer" icon={faXmark} />
              </div>
              <div className='w-full flex items-center gap-4'>
                <div className=' p-5 w-[170px] h-[170px]'>
                  {formData?.avatar ? <img src={formData?.avatar} alt="" className='w-full h-full object-cover rounded-xl' /> : <img src={userimage} alt="" className='w-full h-full object-cover rounded-xl' />}
                </div>
                <div className='flex flex-col justify-center gap-5'>
                  <div className='flex items-center justify-center gap-2'>
                    <label htmlFor="file" className='bg-blue-600 text-white border font-semibold text-sm py-3 px-5 w-[150px] cursor-pointer rounded-lg hover:opacity-80 transition duration-200 text-center'>CHỌN ẢNH MỚI</label>
                    <input type="file" name='file' id='file' hidden onChange={handleFileChange} />
                    <button onClick={handleFileUpload} className='bg-blue-600 text-white border font-semibold text-sm py-3 px-5 w-[150px] rounded-lg hover:opacity-80 transition duration-200 text-center'>TẢI ẢNH LÊN</button>
                  </div>
                  <p className='text-sm text-gray-700 '>Allowed JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>
            </div>
            <div className='w-full'>
              <form action="" className='p-3'>
                <div className=' p-2'>
                  <label htmlFor="" className='text-sm text-gray-500 mb-2 w-full inline-block text-start'>TÊN TÀI KHOẢN</label>
                  <input
                    type="text"
                    readOnly
                    value={formData?.userName}
                    name='userName'
                    className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
                </div>
                <div className=' p-2'>
                  <label htmlFor="" className='text-sm text-gray-500 mb-2 w-full inline-block text-start '>TÊN NGƯỜI DÙNG</label>
                  <input type="text"
                    value={formData?.name}
                    name='name'
                    onChange={handleChange}
                    className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
                </div>
                <div className='p-2'>
                  <label htmlFor="" className='text-sm text-gray-500 mb-2 w-full inline-block text-start'>EMAIL</label>
                  <input type="text"
                    value={formData?.email}
                    name='email'
                    onChange={handleChange}
                    className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
                </div>
                <div className='p-2'>
                  <label htmlFor="" className='text-sm text-gray-500 mb-2 w-full inline-block text-start'>SỐ ĐIỆN THOẠI</label>
                  <input type="text"
                    value={formData?.phone}
                    name='phone'
                    onChange={handleChange}
                    className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
                </div>
                <div className='p-2'>
                  <label htmlFor="" className='text-sm text-gray-500 mb-2 w-full inline-block text-start'>VAI TRÒ</label>
                  <div className='w-full flex gap-3 items-center'>
                    <label htmlFor=""><input type="checkbox" checked={isChecked.USER} name='USER' onChange={handleCheckboxChange} className='w-[15px] h-[15px]' />  USER</label>
                    <label htmlFor=""><input type="checkbox" checked={isChecked.ADMIN} name='ADMIN' onChange={handleCheckboxChange} value='php' className='w-[15px] h-[15px]' />  ADMIN</label>
                    <label htmlFor=""><input type="checkbox" checked={isChecked.MODERATOR} name='MODERATOR' onChange={handleCheckboxChange} value='php' className='w-[15px] h-[15px]' />  MODERATOR</label>
                  </div>
                </div>


                <button onClick={handleSaveChanges} type='button' className='inline-block font-semibold text-center mt-4 ml-3 mb-4 select-none border p-2 rounded-md text-white bg-[#0d6efd] border-blue-600 hover:bg-[#3764a8]'>LƯU THAY ĐỔI</button>
              </form>
            </div>
          </div>
          :
          <ReactLoading type={'spokes'} color={'#07bd89'} height={'4%'} width={'4%'} className='w-full min-h-screen flex items-center justify-center m-auto' />
        }
      </div>
    </div>
  )
}

export default EditUser