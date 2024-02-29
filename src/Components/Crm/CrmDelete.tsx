import handleModalClick from '../../Util/HandleModalClick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

interface Props {
    idCrm: number;
    isOpenDeleted: boolean;
    onClose: () => void;
}

const CrmDelete = ({ idCrm, isOpenDeleted, onClose }: Props) => {

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
        <div className="main-container">
            <div onClick={onClose} className="fixed inset-0 flex items-center justify-center z-50">
                {/* Overlay */}
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div onClick={handleModalClick} className='bg-gradient-to-r from-[#07bd89] to-[#006e8c] border overflow-auto rounded-md outline-none p-[30px] w-[80%] h-[80%]'>
                        <div className="relative">
                            <div className="absolute top-0 right-0 mt-2 mr-2">
                                <FontAwesomeIcon onClick={onClose} className="p-2 text-3xl text-white cursor-pointer" icon={faXmark} size="lg" />
                            </div>
                            <h1 className="text-2xl text-center text-white">bạn có chắc chắn muốn xóa không</h1>
                            <div className="mt-[20px] flex items-center justify-center space-x-5">
                                <button className="bg-blue-500 text-white font-bold py-2 px-3 rounded" onClick={onClose}>Hủy</button>
                                <button className="bg-red-500 text-white font-bold py-2 px-3 rounded" onClick={handleDelete}>Xóa</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CrmDelete