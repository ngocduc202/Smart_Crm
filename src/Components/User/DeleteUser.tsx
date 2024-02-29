import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect } from 'react'
import Swal from 'sweetalert2';


interface Props {
  isOpen: boolean;
  onClose: () => void;
  idUser: number;
}
const DeleteUser = ({ isOpen, onClose, idUser }: Props) => {

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  if (isOpen) {
    Swal.fire({
      title: "Bạn có muốn xóa tài khoản này không?",
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: "Có",
      denyButtonText: `Không`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleSaveChanges()
      } else if (result.isDenied) {
        onClose()
      }
    });
  }


  const handleSaveChanges = async () => {
    try {
      const token: any = localStorage.getItem('token');
      const userIDString = localStorage.getItem("userid");
      const userID = userIDString ? parseInt(userIDString) : null;

      if (idUser === userID) {
        Swal.fire("Warning", "Không thể xóa bởi vì tài khoản này đang được sử dụng", "warning").then(() => {
          onClose()
        })
      } else {
        const response = await axios.delete(`http://localhost:8082/api/auth/admin/users/delete/${idUser}`, {
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
  if (!isOpen) return null;
  return (
    <div onClick={onClose} className="fixed z-50 transition-all">
      <div className='fixed inset-0 bg-gray-500 bg-opacity-50'>
        <div onClick={handleModalClick} className='w-[30%] bg-transparent h-[30%] '>
        </div>
      </div>
    </div>
  )
}

export default DeleteUser