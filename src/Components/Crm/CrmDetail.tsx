import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CrmModel } from './CrmModel';


interface Props {
    isOpen: boolean;
    onClose: () => void;
    idCrm: number;
}

const CrmDetail = ({ isOpen, onClose, idCrm }: Props) => {

    const [crmsDetail, setCrmsDetail] = useState<CrmModel[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

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
                setCrmsDetail(response.data);
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

    // useEffect(() => {
    //     if (crmsDetail[0]) {
    //         console.log(crmsDetail[0].customerName)
    //     }
    // }, [crmsDetail])

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    console.log(crmsDetail[0])

    if (!isOpen) return null;
    return (
        <div onClick={onClose} className="fixed inset-0 flex items-center justify-center z-50">
            {/* Overlay */}
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                <div onClick={handleModalClick} className='bg-gradient-to-r from-[#07bd89] to-[#006e8c] border overflow-auto rounded-md outline-none p-[30px] w-[80%] h-[80%]'>
                    <div className="relative">
                        <div className="absolute top-0 right-0 mt-2 mr-2">
                            <FontAwesomeIcon onClick={onClose} className="p-2 text-3xl text-white cursor-pointer" icon={faXmark} size="lg" />
                        </div>
                        <h1 className="text-2xl text-center text-white">Crm của {crmsDetail[0] ? crmsDetail[0].customerName : <>loading...</>}</h1>
                        <table className="min-w-full mt-[15px]">
                            <thead>
                                <tr>
                                    <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider '>ID</th>
                                    <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Tiêu đề</th>
                                    <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Mô tả</th>
                                    <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Ảnh</th>
                                    <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Ngày bắt đầu</th>
                                    <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Ngày kết thúc</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-200'>
                                {crmsDetail[0] && !isLoading ?
                                    <tr>
                                        <td className='px-6 py-4 whitespace-nowrap'>{crmsDetail[0].id}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{crmsDetail[0].title}</td>
                                        <td className='px-6 py-4 whitespace-normal max-w-[200px]'>{crmsDetail[0].description}</td>
                                        <td className='px-6 py-4 whitespace-normal max-w-[200px]'>
                                            <div className='flex flex-col gap-1'>
                                                {crmsDetail[0].crmFile.map((file) => (
                                                    <span>{file.filename}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{crmsDetail[0].startDate}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{crmsDetail[0].endDate}</td>
                                    </tr>
                                    : <td colSpan={6}>loading...</td>
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default CrmDetail