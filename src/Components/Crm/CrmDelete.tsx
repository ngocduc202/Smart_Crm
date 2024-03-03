import handleModalClick from '../../Util/HandleModalClick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2';

interface Props {
    idCrm: number;
    isOpenDeleted: boolean;
    onClose: () => void;
}

const CrmDelete = ({ idCrm, isOpenDeleted, onClose }: Props) => {


    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };
    if (isOpenDeleted) {
        Swal.fire({
            title: "Bạn có muốn xóa CRM này không?",
            icon: 'question',
            showDenyButton: true,
            confirmButtonText: "Có",
            denyButtonText: `Không`,
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete()
            } else if (result.isDenied) {
                onClose()
            }
        });
    }


    const token: any = localStorage.getItem('token');
    const handleDelete = async () => {
        const response = await axios.delete(`http://localhost:8082/api/crms/delete/${idCrm}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if (response.data) {
            window.location.reload();
        } else {
            console.log('không thể xóa')
        }
    }


    if (!isOpenDeleted) return null;
    return (
        <div onClick={onClose} className="fixed z-50 transition-all">
            <div className='fixed inset-0 bg-gray-500 bg-opacity-50'>
                <div onClick={handleModalClick} className='w-[30%] bg-transparent h-[30%] '>
                </div>
            </div>
        </div>
    )
}

export default CrmDelete