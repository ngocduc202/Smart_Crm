import { useEffect, useState } from "react"
import axios from "axios"
import { jwtDecode } from 'jwt-decode';
import CrmDetail from "./CrmDetail";
import CrmCreate from "./CrmCreate";
import CrmDelete from "./CrmDelete";
import CrmEdit from "./CrmEdit";


const Crm = () => {

    const [crms, setCrms] = useState([])
    const [listData, setListData] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)
    let apiurl = 'http://localhost:8082/api/crms?'


    const [isOpen, setIsOpen] = useState(false)
    const [isOpenCreated, setIsOpenCreated] = useState(false)
    const [isOpenDeleted, setIsOpenDeleted] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [idCrm, setIdCrm] = useState(0)
    const [isLoading, setisLoading] = useState(true)

    // các giá trị khi tìm kiếm
    const [idValue, setIdValue] = useState<string>('');
    const [startDatevalue, setStartDatevalue] = useState<string>('');
    const [endDatevalue, setEndDatevalue] = useState<string>('');

    const token: any = localStorage.getItem('token');
    const rolesString = localStorage.getItem('roles');
    const roles: string[] = rolesString ? JSON.parse(rolesString) : [];

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (roles.includes('ROLE_ADMIN')) {
                    setIsAdmin(true)
                } else {
                    setIsAdmin(false)
                }

                // Khởi tạo mảng params để lưu các tham số truy vấn
                let params: string[] = [];

                // Kiểm tra và thêm idValue vào params
                if (idValue.trim() !== '') {
                    params.push(`userId=${idValue}`);
                }

                // Kiểm tra và thêm startDatevalue vào params
                if (startDatevalue.trim() !== '') {
                    params.push(`startDate=${startDatevalue}`);
                }

                // Kiểm tra và thêm endDatevalue vào params
                if (endDatevalue.trim() !== '') {
                    params.push(`endDate=${endDatevalue}`);
                }

                // Nếu có params, thêm vào apiurl
                if (params.length > 0) {
                    apiurl += params.join('&');
                    console.log(apiurl);
                }


                if (token) {
                    setisLoading(true)
                    const response = await axios.get(apiurl, {
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
    }, [idValue, startDatevalue, endDatevalue])


    const handleOpen = (id: number, action: string) => {
        if (action === 'detail') {
            setIsOpen(true)
            setIdCrm(id)
        } else if (action === 'create') {
            setIsOpenCreated(true)
        } else if (action === 'delete') {
            setIsOpenDeleted(true)
            setIdCrm(id)
        } else if (action === 'edit') {
            setIsOpenEdit(true)
            setIdCrm(id)
        }
    }

    const handleClose = (action: string) => {
        if (action === 'detail') {
            setIsOpen(false)
        } else if (action === 'create') {
            setIsOpenCreated(false)
        } else if (action === 'delete') {
            setIsOpenDeleted(false)
        } else if (action === 'edit') {
            setIsOpenEdit(false)
        }
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setIdValue(event.target.value);
    };

    useEffect(() => {
        if (crms && crms.length > 0 && listData.length === 0) {
            setListData(crms);
        }
    }, [crms, listData])

    const handleChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDatevalue(e.target.value)
    };

    const handleChangeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDatevalue(e.target.value)
    };


    return (
        <div className="main-container">
            <div className='w-full px-4 h-[500px]'>
                <div className='flex items-center justify-center m-5'>
                    <h2 className='text-2xl font-bold text-gray-800'>CRM</h2>
                </div>
                <div className='flex justify-between m-5'>
                    <button onClick={() => handleOpen(0, 'create')} className="w-[100px] bg-blue-500 text-white font-bold py-1 px-4 rounded">Tạo Crm</button>
                </div>

                {listData ?
                    <div className='flex text-gray-600 mb-5 gap-5'>
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="crmFile">
                                UserId
                            </label>
                            <div className='flex items-center justify-between w-full'>
                                <select className="p-[9px] rounded border" id="mySelect" value={idValue} onChange={handleSelectChange}>
                                    <option value="">All</option>
                                    {listData.map((data: any) => (
                                        <option key={data['id']} value={data['id']}>
                                            {data['id']}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="crmFile">
                                Ngày bắt đầu
                            </label>
                            <div className='flex items-center justify-between w-full'>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    onChange={handleChangeStartDate}
                                    className="w-full px-3 py-2 border border-gray-300 text-black rounded"
                                    multiple />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="crmFile">
                                Ngày kết thúc
                            </label>
                            <div className='flex items-center justify-between w-full'>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    onChange={handleChangeEndDate}
                                    className="w-full px-3 py-2 border border-gray-300 text-black rounded"
                                    multiple />
                            </div>
                        </div>
                    </div>
                    : <div>loading...</div>}


                <div>
                    <table className='min-w-[1000px] w-full shadow-lg mb-3 text-[#212529] border-collapse text-center border-t-2 border-[#eceffa] '>
                        <thead>
                            <tr className='bg-white border-b-2 border-[#eceffa]'>
                                <th className='border-none p-[30px] text-sm font-medium text-gray-600 '>UserId</th>
                                <th className='border-none p-[30px] text-sm font-medium text-gray-600 '>Tên khách hàng</th>
                                <th className='border-none p-[30px] text-sm font-medium text-gray-600'>Tiêu đề</th>
                                <th className='border-none p-[30px] text-sm font-medium text-gray-600'>Ngày bắt đầu</th>
                                <th className='border-none p-[30px] text-sm font-medium text-gray-600'>Ngày kết thúc</th>
                                {isAdmin ? <th className='border-none p-[30px] text-sm font-medium text-gray-600'>Status</th> : null}
                                <th className='border-none p-[30px] text-sm font-medium text-gray-600'>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {crms && !isLoading ? crms.map(crm => (
                                <tr key={crm['id']} className='bg-white border-b-2 border-[#eceffa]'>
                                    <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>{crm['userId']}</td>
                                    <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>{crm['customerName']}</td>
                                    <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>{crm['title']}</td>
                                    <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>{crm['startDate']}</td>
                                    <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>{crm['endDate']}</td>
                                    {isAdmin ? <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>
                                        {crm['status'] === 1 ? <span className='relative rounded-[30px] py-1 pl-[15px] pr-[3px] bg-[#cff6dd] text-[#1fa750] flex items-center justify-center
                after:absolute after:top-[9px] after:left-[7px] after:w-[12px] after:h-[12px] after:content-[""] after:rounded-[50%] after:bg-[#23bd5a]'>
                                            Active
                                        </span>
                                            :
                                            <span className='relative rounded-[30px] py-1 pl-[15px] pr-[3px] bg-[#f1b3b3] text-[#fe4d4d] flex items-center justify-center
                  after:absolute after:top-[9px] after:left-[7px] after:w-[12px] after:h-[12px] after:content-[""] after:rounded-[50%] after:bg-[#fe4d4d]'>
                                                Block
                                            </span>
                                        }
                                    </td> : ' '}
                                    <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>
                                        <div className="flex justify-center items-center h-auto space-x-4">
                                            <button onClick={() => { handleOpen(crm['id'], 'detail') }} className="w-[80px] bg-blue-500 text-white font-bold py-1 px-4 rounded">
                                                Chi tiết
                                            </button>
                                            <button onClick={() => { handleOpen(crm['id'], 'edit') }} className="bg-yellow-500 text-white font-bold py-1 px-4 rounded">
                                                Sửa
                                            </button>
                                            {isAdmin ? <button onClick={() => handleOpen(crm['id'], 'delete')} className="bg-red-500 text-white font-bold py-1 px-4 rounded">
                                                Xóa
                                            </button> : ' '}
                                        </div>
                                    </td>
                                </tr>
                            )) : <tr><td>loading...</td></tr>}
                        </tbody>
                    </table>
                    <CrmCreate isOpenCreated={isOpenCreated} onClose={() => handleClose('create')} />
                    <CrmDetail isOpen={isOpen} onClose={() => handleClose('detail')} idCrm={idCrm} />
                    <CrmDelete isOpenDeleted={isOpenDeleted} onClose={() => handleClose('delete')} idCrm={idCrm} />
                    <CrmEdit isOpenEdit={isOpenEdit} onClose={() => handleClose('edit')} idCrm={idCrm} />
                </div>
            </div>
        </div>

    )
}

export default Crm