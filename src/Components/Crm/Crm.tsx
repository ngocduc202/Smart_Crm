import { useEffect, useState } from "react"
import axios from "axios"
import { jwtDecode } from 'jwt-decode';
import CrmDetail from "./CrmDetail";


const Crm = () => {

    const [crms, setCrms] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)

    const [isOpen, setIsOpen] = useState(false)
    const [idCrm, setIdCrm] = useState(0)
    const [isLoading, setisLoading] = useState(true)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token: any = localStorage.getItem('token');
                const rolesString = localStorage.getItem('roles');
                const roles: string[] = rolesString ? JSON.parse(rolesString) : [];
                if (roles.includes('ROLE_ADMIN')) {
                    setIsAdmin(true)
                } else {
                    setIsAdmin(false)
                }

                if (token) {
                    const response = await axios.get('http://localhost:8082/api/crms', {
                        headers: {
                            Authorization: `Bearer ${token}`, // Thêm token vào tiêu đề Authorization
                        },
                    });
                    setCrms(response.data)
                    setisLoading(false)
                } else {
                    console.log('Token not found');
                    setisLoading(false)
                }


            } catch (error) {
                console.error('Error fetching CRM data:', error);
                setisLoading(false)
            }
        };
        fetchData()
    }, [])


    const handleOpen = (id: number) => {
        setIsOpen(true)
        setIdCrm(id)
    }

    // useEffect(() => {
    //     if (crmsDetail === null) {
    //         // Nếu crmsDetail vẫn là null, có thể hiển thị một thông báo loading hoặc ẩn modal
    //         console.log('Waiting for data...');
    //         return;
    //     }

    //     // Nếu crmsDetail đã có dữ liệu, thực hiện các hành động cần thiết khi dữ liệu đã sẵn sàng
    //     console.log('crmsDetail:', crmsDetail);
    // }, [crmsDetail]);

    // useEffect(() => {
    // })

    const handleClose = () => {
        setIsOpen(false)
    }




    return (
        <div className="main-container">
            <div className='w-full px-4 h-[500px]'>
                <div className='flex items-center justify-center m-5'>
                    <h2 className='text-2xl font-bold text-gray-800'>CRM</h2>
                </div>
                <div>
                    <table className='min-w-[1000px] w-full shadow-lg mb-3 text-[#212529] border-collapse text-center border-t-2 border-[#eceffa] '>
                        <thead>
                            <tr className='bg-white border-b-2 border-[#eceffa]'>
                                <th className='border-none p-[30px] text-sm font-medium text-gray-600 '>ID</th>
                                <th className='border-none p-[30px] text-sm font-medium text-gray-600 '>Tên khách hàng</th>
                                <th className='border-none p-[30px] text-sm font-medium text-gray-600'>Tiêu đề</th>
                                <th className='border-none p-[30px] text-sm font-medium text-gray-600'>Ngày bắt đầu</th>
                                <th className='border-none p-[30px] text-sm font-medium text-gray-600'>Ngày kết thúc</th>
                                <th className='border-none p-[30px] text-sm font-medium text-gray-600'>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {crms && !isLoading ? crms.map(crm => (
                                <tr key={crm['id']} className='bg-white border-b-2 border-[#eceffa]'>
                                    <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>{crm['id']}</td>
                                    <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>{crm['customerName']}</td>
                                    <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>{crm['title']}</td>
                                    <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>{crm['startDate']}</td>
                                    <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>{crm['endDate']}</td>
                                    <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>
                                        <div className="flex justify-center items-center h-auto space-x-4">
                                            <button onClick={() => { handleOpen(crm['id']) }} className="w-[80px] bg-blue-500 text-white font-bold py-1 px-4 rounded">
                                                Chi tiết
                                            </button>
                                            <button className="bg-yellow-500 text-white font-bold py-1 px-4 rounded">
                                                Sửa
                                            </button>
                                            {isAdmin ? <button className="bg-red-500 text-white font-bold py-1 px-4 rounded">
                                                Xóa
                                            </button> : ' '}
                                        </div>
                                    </td>
                                </tr>
                            )) : <td>loading...</td>}
                        </tbody>
                    </table>
                    <CrmDetail isOpen={isOpen} onClose={handleClose} idCrm={idCrm} />
                </div>
            </div>
        </div>

    )
}

export default Crm