import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import handleModalClick from '../../Util/HandleModalClick';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import token from '../../Util/TokenStorage';


interface Props {
    isOpenCreated: boolean;
    onClose: () => void;
}

const CrmCreate = ({ isOpenCreated, onClose }: Props) => {

    // const token: any = localStorage.getItem('token');
    const [formData, setFormData] = useState({
        customerName: ' ',
        phoneNumber: ' ',
        title: ' ',
        description: ' ',
        crmFile: [],
        startDate: ' ',
        endDate: ' ', 
    })

    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            //check điều kiện nếu chọn file nhưng chưa upload
            if (selectedFiles && formData.crmFile.length === 0) {
                Swal.fire('error', 'Chưa upload ảnh', 'error');
            } else {
                const response = await axios.post('http://localhost:8082/api/crms/create', formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })
                if (response.status === 200) {
                    Swal.fire('success', response.data.message, 'success').then(() => {
                        window.location.reload();
                    });
                }
                else {
                    Swal.fire('error', 'Tạo crm không thành công', 'error')
                }
            }
        } catch (error: any) {
            Swal.fire('error', error.response.data.message, 'error');
        }

    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFiles(event.target.files)
        }
    }

    const handleClose = () => {
        onClose()
        setSelectedFiles(null)
        setFormData({
            customerName: ' ',
            phoneNumber: ' ',
            title: ' ',
            description: ' ',
            crmFile: [],
            startDate: ' ',
            endDate: ' ',
        })
    }



    const handleFileUpload = async () => {
        try {
            //check đã chọn file hay chưa
            if (selectedFiles) {
                const formImage = new FormData();
                for (let i = 0; i < selectedFiles.length; i++) {
                    const file = selectedFiles[i];
                    formImage.append('image', file);
                }

                const response = await axios.post('http://localhost:8082/api/upload/', formImage, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                });

                if (response.status === 200) {
                    const newFiles = response.data.imageURL.map((url: string) => ({ filename: url }));
                    setFormData({ ...formData, crmFile: newFiles });
                    Swal.fire('success', 'upload thành công', 'success')
                } else {
                    Swal.fire('error', 'upload không thành công', 'error');
                }

            } else {
                Swal.fire('error', 'chưa có file', 'error');
            }

        } catch (error: any) {
            Swal.fire('error', error.response.data.message, 'error');
        }

    };



    if (!isOpenCreated) return null;
    return (
        <div className="main-container">
            <div onClick={onClose} className="fixed inset-0 flex items-center justify-center z-50">
                {/* Overlay */}
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div onClick={handleModalClick} className='bg-gradient-to-r from-[#07bd89] to-[#006e8c] border overflow-auto rounded-md outline-none p-[30px] w-[80%] h-[80%]'>
                        <div className="relative">
                            <div className="absolute top-0 right-0 mt-2 mr-2">
                                <FontAwesomeIcon onClick={handleClose} className="p-2 text-3xl text-white cursor-pointer" icon={faXmark} size="lg" />
                            </div>
                            <h1 className="text-2xl text-center text-white">Tạo Crm</h1>
                            <div className="container mx-auto mt-2">
                                <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-gradient-to-r from-[#07bd89] to-[#006e8c] rounded-md">
                                    <div className="mb-4">
                                        <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="customerName">
                                            Tên khách hàng
                                        </label>
                                        <input
                                            type="text"
                                            id="customerName"
                                            name="customerName"
                                            value={formData.customerName}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 text-black rounded"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="phoneNumber">
                                            Số điện thoại
                                        </label>
                                        <input
                                            type="text"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 text-black rounded"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="title">
                                            Tiêu đề
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 text-black rounded"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="description">
                                            Mô tả
                                        </label>
                                        <input
                                            type="text"
                                            id="description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 text-black rounded"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="crmFile">
                                            Ngày bắt đầu
                                        </label>
                                        <div className='flex items-center justify-between w-full'>
                                            <input
                                                type="date"
                                                id="startDate"
                                                name="startDate"
                                                value={formData.startDate}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 text-black rounded"
                                                multiple />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="crmFile">
                                            Ngày kết thúc
                                        </label>
                                        <div className='flex items-center justify-between w-full'>
                                            <input
                                                type="date"
                                                id="endDate"
                                                name="endDate"
                                                value={formData.endDate}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 text-black rounded"
                                                multiple />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="crmFile">
                                            Chọn File
                                        </label>
                                        <div className='flex items-center justify-between w-full'>
                                            <input
                                                id="file"
                                                type="file"
                                                onChange={handleFileChange}
                                                className='w-[70%] text-gray-100'
                                                multiple />
                                            <button onClick={handleFileUpload} className='w-[80px] bg-blue-500 text-white font-bold py-1 px-4 rounded' type='button' >
                                                Tải ảnh lên
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none"
                                        >
                                            Tạo phản hồi
                                        </button>
                                    </div>

                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CrmCreate