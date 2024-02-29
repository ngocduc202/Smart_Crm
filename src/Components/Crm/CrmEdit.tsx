import handleModalClick from '../../Util/HandleModalClick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import token from '../../Util/TokenStorage';
import Swal from 'sweetalert2';

interface Props {
    idCrm: number;
    isOpenEdit: boolean;
    onClose: () => void;
}

const CrmEdit = ({ idCrm, isOpenEdit, onClose }: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [formData, setFormData] = useState({
        customerName: ' ',
        phoneNumber: ' ',
        title: ' ',
        description: ' ',
        crmFile: [],
        startDate: ' ',
        endDate: ' ',
    })

    useEffect(() => {
        const fetchCrmDetail = async () => {
            try {
                const token: any = localStorage.getItem('token');
                setIsLoading(true);
                const response = await axios.get(`http://localhost:8082/api/crms/${idCrm}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFormData(response.data[0]);
                setIsLoading(false);

            } catch (error) {
                console.log('Error fetching CRM detail:', error);
                setIsLoading(false);
            }
        };

        if (idCrm !== 0) {
            fetchCrmDetail();
        }
    }, [idCrm]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8082/api/crms/update/${idCrm}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            Swal.fire('error', response.data.message, 'success').then(() => {
                window.location.reload()
            });
            // console.log(formData)
        } catch (error: any) {
            Swal.fire('error', error.response.data.message, 'error');
        }
    };


    if (!isOpenEdit) return null;
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
                            <h1 className="text-2xl text-center text-white">Sửa Crm</h1>
                            {formData && !isLoading ? <div className="container mx-auto mt-2">
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
                                    {/* <div className="mb-4">
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
                                            <button onClick={handleFileUpload} className='text-center w-[30%] gap-2 ml-5 flex items-center text-gray-100 ' type='button' >
                                                Tải ảnh lên
                                            </button>
                                        </div>
                                    </div> */}
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
                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none"
                                        >
                                            Sửa
                                        </button>
                                    </div>

                                </form>
                            </div> : <>loading...</>}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CrmEdit