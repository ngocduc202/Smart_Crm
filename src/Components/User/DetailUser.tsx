import React from 'react'
import UserImg from '../../img/User.jpg'


const DetailUser = () => {
  return (
    <div className='w-full flex flex-wrap'>
      <div className='flex-shrink-0 w-[33%] max-w-full p-2'>
        <div className='relative flex flex-col bg-white bg-clip-border border border-gray-100 rounded-md shadow-md'>
          <div className='text-sm font-semibold p-4 bg-gray-200 border border-gray-300 border-b-2'>Profile Picture</div>
          <div className='flex flex-col gap-3 items-center justify-center p-4'>
            <img src={UserImg} alt="" className='w-[160px] h-[160px] object-cover rounded-full' />
            <div className='text-sm text-gray-500 mb-3'>JPG or PNG no larger than 5 MB</div>
            <button type='button' className='inline-block font-semibold text-center select-none border p-2 rounded-md text-white bg-[#0d6efd] border-blue-600 hover:bg-[#3764a8]'>Upload new image</button>
          </div>
        </div>
      </div>
      <div className='flex-shrink-0 w-[66%] p-2'>
        <div className='flex flex-col relative bg-white bg-clip-border border border-gray-200 rounded-md mb-4 '>
          <div className='text-sm font-semibold p-4 bg-gray-200 border border-gray-300 border-b-2'>Account Details</div>
          <div className='flex-1 p-1 shadow-md'>
            <form action="">
              <div className=' p-3'>
                <label htmlFor="" className='text-sm text-gray-500 mb-2 '>UserName</label>
                <input type="text" className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
              </div>
              <div className='flex flex-wrap p-1'>
                <div className='w-[50%] p-2'>
                  <label htmlFor="" className='text-sm text-gray-500 mb-2 '>First name</label>
                  <input type="text" className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
                </div>
                <div className='w-[50%] p-2'>
                  <label htmlFor="" className='text-sm text-gray-500 mb-2 '>Last name</label>
                  <input type="text" className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
                </div>
              </div>
              <div className='flex flex-wrap p-1'>
                <div className='w-[50%] p-2'>
                  <label htmlFor="" className='text-sm text-gray-500 mb-2 '>Address</label>
                  <input type="text" className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
                </div>
                <div className='w-[50%] p-2'>
                  <label htmlFor="" className='text-sm text-gray-500 mb-2'>Position</label>
                  <input type="text" readOnly className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
                </div>
              </div>
              <div className='p-3'>
                <label htmlFor="" className='text-sm text-gray-500 mb-2 '>Email</label>
                <input type="text" className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
              </div>
              <div className='flex flex-wrap p-1'>
                <div className='w-[50%] p-2'>
                  <label htmlFor="" className='text-sm text-gray-500 mb-2 '>Phone</label>
                  <input type="text" className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
                </div>
                <div className='w-[50%] p-2'>
                  <label htmlFor="" className='text-sm text-gray-500 mb-2 '>Birthday</label>
                  <input type="text" className='block w-full h-[45px] p-3 font-semibold text-sm text-gray-400 bg-white border border-gray-400 rounded-md outline-none' />
                </div>
              </div>
              <button type='button' className='inline-block font-semibold text-center mt-4 ml-3 mb-4 select-none border p-2 rounded-md text-white bg-[#0d6efd] border-blue-600 hover:bg-[#3764a8]'>Save changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailUser