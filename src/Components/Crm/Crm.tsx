import { useEffect, useState } from "react"
import axios from "axios"
import { jwtDecode } from 'jwt-decode';


const Crm = () => {

    const [crms, setCrms] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)


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
                } else {
                    console.log('Token not found');
                }


            } catch (error) {
                console.error('Error fetching CRM data:', error);
            }
        };
        fetchData()
    }, [])


    return (
        <main className='main-container'>
            <div className='flex justify-between mb-8'>
                <h3 className='text-2xl text-gray-800'>Crm</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="table-auto w-full text-gray-800">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Tên khách hàng</th>
                            <th className="border px-4 py-2">Số điện thoại</th>
                            <th className="border px-4 py-2">Tiêu đề</th>
                            <th className="border px-4 py-2">Ngày bắt đầu</th>
                            <th className="border px-4 py-2">Ngày kết thúc</th>
                            <th className="border px-4 py-2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>

                        {crms.map(crm => (
                            <tr key={crm['id']}>
                                <td className="border px-4 py-2">{crm['customerName']}</td>
                                <td className="border px-4 py-2">{crm['phoneNumber']}</td>
                                <td className="border px-4 py-2">{crm['title']}</td>
                                <td className="border px-4 py-2">{crm['startDate']}</td>
                                <td className="border px-4 py-2">{crm['endDate']}</td>
                                <td className="border px-4 py-2">
                                    <div className="flex justify-center items-center h-auto space-x-4">
                                        <button className="bg-blue-500 text-white font-bold py-1 px-2 rounded">
                                            Chi tiết
                                        </button>
                                        <button className="bg-yellow-500 text-white font-bold py-1 px-2 rounded">
                                            Sửa
                                        </button>
                                        {isAdmin ? <button className="bg-red-500 text-white font-bold py-1 px-2 rounded">
                                            Xóa
                                        </button> : ' '}
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </main>
    )
}

export default Crm