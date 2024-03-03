import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
interface NotificationsProps {
  isOpenNotifications: boolean;
}
interface Notification {
  id: number,
  title: string,
  content: string,
  createdAt: string,
  status: number
}
const Notifications: React.FC<NotificationsProps> = ({ isOpenNotifications }) => {

  const [notification, setNotification] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const token: any = localStorage.getItem('token');
  const navigate = useNavigate()
  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:8082/api/notifications/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const sortedNotifications = response.data.sort((a: Notification, b: Notification) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setNotification(sortedNotifications);
      }
      setIsLoading(false);

    } catch (error) {
      console.log('Error fetching notification :', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // if (isOpenNotifications) {
    //   fetchNotifications()
    // }
    fetchNotifications()
  }, [isOpenNotifications])

  const handleRedirect = () => {
    navigate("/notifications")
  }

  return (
    <div id='arrow' className={`w-[30%] absolute bg-white border-gray-100 rounded-md shadow-md right-0 top-12 z-50 transition duration-300 ${isOpenNotifications ? 'block' : 'hidden'}`}>
      <div className='w-full overflow-y-auto max-h-[400px]'>
        {notification?.map((items: Notification, index) => (
          <div key={index} className='w-full flex flex-col justify-center gap-2 hover:bg-gray-50 rounded-md cursor-pointer z-60'>
            <span className='font-semibold text-xl px-3 w-full mt-2'>
              {items.title}
            </span>
            <div className='w-full font-normal text-sm line-clamp-3 px-3'>
              {items.content}
            </div>
            <span className='text-xs font-light px-3 pb-1'>Đăng vào ngày : {moment(items.createdAt).format('DD/MM/YYYY')}</span>
          </div>
        ))}
      </div>
      <button onClick={handleRedirect} className='bg-gray-100 w-full h-11 text-gray-700 border-none font-semibold text-sm py-[6px] outline-none px-5 rounded-b-md hover:bg-[#07bd89] hover:text-white transition duration-200'>Xem tất cả</button>
    </div>
  )
}

export default Notifications