import React from 'react'
import Logo from '../../img/User.jpg'
import img2 from '../../img/IMG_1213.jpg'
import img3 from '../../img/IMG_0783.jpg'
import img4 from '../../img/IMG_1088.jpg'

const UserManager = () => {
  return (
    <div className='w-full px-4 h-[500px]'>
      <div className='flex items-center justify-center m-5'>
        <h2 className='text-2xl font-bold'>UserManager</h2>
      </div>
      <div>
        <table className='min-w-[1000px] w-full shadow-lg mb-3 text-[#212529] border-collapse text-center border-t-2 border-[#eceffa] '>
          <thead>
            <tr className='bg-white border-b-2 border-[#eceffa]'>
              <th className='border-none p-[30px] text-sm font-medium text-gray-600 '>STT</th>
              <th className='border-none p-[30px] text-sm font-medium text-gray-600 '>Email</th>
              <th className='border-none p-[30px] text-sm font-medium text-gray-600 '>UserName</th>
              <th className='border-none p-[30px] text-sm font-medium text-gray-600'>Name</th>
              <th className='border-none p-[30px] text-sm font-medium text-gray-600'>Phone</th>
              <th className='border-none p-[30px] text-sm font-medium text-gray-600'>Status</th>
              <th className='border-none p-[30px] text-sm font-medium text-gray-600'>Roles</th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-white border-b-2 border-[#eceffa]'>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>1</td>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle flex items-center gap-5'>
                <div className='w-[60px] h-[60px]'><img src={Logo} alt="" className='bg-cover bg-repeat w-full h-full bg-center rounded-full' /></div>
                <div className='flex flex-col gap-3'>
                  <span>ngocduc154200@gmail.com</span>
                  <span className='text-xs text-opacity-30 text-start '>Added : 15/04/2024</span>
                </div>
              </td>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>ducadmin</td>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>ngocduc154200</td>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>099851232</td>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>
                <span className='relative rounded-[30px] py-1 pl-[15px] pr-[3px] bg-[#cff6dd] text-[#1fa750] flex items-center justify-center
                after:absolute after:top-[9px] after:left-[7px] after:w-[12px] after:h-[12px] after:content-[""] after:rounded-[50%] after:bg-[#23bd5a]
                '>
                  Active
                </span>
              </td>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>
                Admin
              </td>
            </tr>

            <tr className='bg-white border-b-2 border-[#eceffa]'>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>1</td>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle flex items-center gap-5'>
                <div className='w-[60px] h-[60px]'><img src={img2} alt="" className='bg-cover bg-repeat w-full h-full bg-center rounded-full' /></div>
                <div className='flex flex-col gap-3'>
                  <span>ngocduc154200@gmail.com</span>
                  <span className='text-xs text-opacity-30 text-start '>Added : 15/04/2024</span>
                </div>
              </td>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>ducadmin</td>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>ngocduc154200</td>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>099851232</td>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>
                <span className='relative rounded-[30px] py-1 pl-[15px] pr-[3px] bg-[#cff6dd] text-[#1fa750] flex items-center justify-center
                after:absolute after:top-[9px] after:left-[7px] after:w-[12px] after:h-[12px] after:content-[""] after:rounded-[50%] after:bg-[#23bd5a]
                '>
                  Active
                </span>
              </td>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>
                Admin
              </td>
            </tr>

            <tr className='bg-white border-b-2 border-[#eceffa]'>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>1</td>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle flex items-center gap-5'>
                <div className='w-[60px] h-[60px]'><img src={img3} alt="" className='bg-cover bg-repeat w-full h-full bg-center rounded-full' /></div>
                <div className='flex flex-col gap-3'>
                  <span>ngocduc154200@gmail.com</span>
                  <span className='text-xs text-opacity-30 text-start '>Added : 15/04/2024</span>
                </div>
              </td>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>ducadmin</td>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>ngocduc154200</td>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>099851232</td>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>
                <span className='relative rounded-[30px] py-1 pl-[15px] pr-[3px] bg-[#cff6dd] text-[#1fa750] flex items-center justify-center
                after:absolute after:top-[9px] after:left-[7px] after:w-[12px] after:h-[12px] after:content-[""] after:rounded-[50%] after:bg-[#23bd5a]
                '>
                  Active
                </span>
              </td>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>
                Admin
              </td>
            </tr>

            <tr className='bg-white border-b-2 border-[#eceffa]'>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>1</td>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle flex items-center gap-5'>
                <div className='w-[60px] h-[60px]'><img src={img4} alt="" className='bg-cover bg-repeat w-full h-full bg-center rounded-full' /></div>
                <div className='flex flex-col gap-3'>
                  <span>ngocduc154200@gmail.com</span>
                  <span className='text-xs text-opacity-30 text-start '>Added : 15/04/2024</span>
                </div>
              </td>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>ducadmin</td>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>ngocduc154200</td>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>099851232</td>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>
                <span className='relative rounded-[30px] py-1 pl-[15px] pr-[3px] bg-[#f1b3b3] text-[#fe4d4d] flex items-center justify-center
                after:absolute after:top-[9px] after:left-[7px] after:w-[12px] after:h-[12px] after:content-[""] after:rounded-[50%] after:bg-[#fe4d4d]
                '>
                  Block
                </span>
              </td>
              <td className='border-none p-[30px] text-sm font-medium text-gray-600 align-middle'>
                Admin
              </td>
            </tr>



          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserManager