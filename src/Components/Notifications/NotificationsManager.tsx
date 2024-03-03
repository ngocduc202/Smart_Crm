import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'

interface Notification {
  id: number,
  title: string,
  content: string,
  createdAt: string,
  status: number
}

const NotificationsManager = () => {


  const [notification, setNotification] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const token: any = localStorage.getItem('token');
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
      console.log(notification)
      setIsLoading(false);

    } catch (error) {
      console.log('Error fetching notification :', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications()
  }, [])

  console.log(notification)

  return (
    <main className='main-container bg-gray-100'>
      <div className='flex items-center justify-center mb-6 mt-2'>
        <h2 className='text-2xl font-bold text-[#212529]'>Notifications Manager</h2>
      </div>
      <div>
        <table className='min-w-[1000px] w-full shadow-lg mb-3 text-[#212529] border-collapse text-center border-t-2 border-[#eceffa] '>
          <thead>
            <tr className='bg-white border-b-2 border-[#eceffa]'>
              <th className='border-none p-[30px] text-sm font-medium text-gray-600 '>STT</th>
              <th className='border-none p-[30px] text-sm font-medium text-gray-600 '>Tiêu đề</th>
              <th className='border-none p-[30px] text-sm font-medium text-gray-600 '>Nội dung</th>
              <th className='border-none p-[30px] text-sm font-medium text-gray-600'>Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            {
              notification && notification.map((items, index) => (
                <tr className='bg-white border-b-2 border-[#eceffa]' key={index}>
                  <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>{items.id}</td>
                  <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>{items.title}</td>
                  <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle line-clamp-2'>{items.content}</td>
                  <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>{moment(items.createdAt).format('DD/MM/YYYY')}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default NotificationsManager