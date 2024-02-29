import React, { useState } from 'react'
import {
  BsGrid1X2Fill,
  BsJustify, BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsFillGearFill
}
  from 'react-icons/bs'
import { RiUserLine } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { removeCookie } from '../../Util/GetAccessToken';
interface Props {
  OpenSidebar: () => void;
}
const Header = ({ OpenSidebar }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const navigate = useNavigate()
  const username = localStorage.getItem("username");
  const avatar = localStorage.getItem("avatar");
  const rolesString = localStorage.getItem('roles');
  const roles: string[] = rolesString ? JSON.parse(rolesString) : []
  const handleLogout = () => {
    removeCookie('access_token')
    navigate('/login')
  }
  return (
    <header className='grid-area h-[70px] bg-gradient-to-r from-[#006e8cf9] to-[#07bd89] flex w-full items-center justify-center py-0 px-[30x] shadow-md fixed top-0 z-30'>
      <div className='hidden'>
        <BsJustify className='inline-block align-middle leading-3 text-[20px]' onClick={OpenSidebar} />
      </div>
      <div className='flex justify-between w-[95%] relative'>
        <div className='flex gap-4 items-center justify-center w-[350px] p-3 relative'>
          {/* <input type="search" name="" id="" placeholder='Search ....' className='border-1 border-white box-border w-full text-sm h-[40px]  ml-neg-15vw outline-solid outline-0 p-2 w-30vw z-1 rounded-xl placeholder:italic ' />
          <BsSearch className='inline-block align-middle leading-3 text-[25px] h-2em cursor-pointer bg-white absolute right-6' color='black' /> */}
        </div>
        <div className='flex gap-5 items-center justify-center'>
          <BsFillBellFill className='inline-block align-middle leading-3 text-[20px] cursor-pointer' color='white' />
          <BsFillEnvelopeFill className='inline-block align-middle leading-3 text-[20px] cursor-pointer' color='white' />
          <div onClick={toggleDropdown} className='w-[40px] h-[40px] cursor-pointer relative after:absolute after:bottom-0 after:right-1 after:w-[10px] after:h-[10px] after:content-[""] after:rounded-[50%] after:bg-[#77e0a5]'><img src={avatar?.replace(/"/g, '') || ''} alt=""
            className='bg-cover bg-repeat w-full h-full bg-center rounded-full'
          /></div>
        </div>
        <div className={`w-[15%] absolute bg-white border-gray-100 rounded-md shadow-md right-1 top-12 z-50  ${isDropdownOpen ? 'block' : 'hidden'}`}>
          <div className='w-full flex items-center gap-4 mt-3 border-b-1 border-[#eceffa]'>
            <div className='w-[50px] h-[50px] ml-2'><img src={avatar?.replace(/"/g, '') || ''} alt="" className='bg-cover bg-repeat w-full h-full bg-center rounded-full' /></div>
            <div className='flex flex-col justify-center '>
              <span className='text-[15px] font-medium'>{username?.replace(/"/g, '')}</span>
              <span className='text-sm font-light'>{roles ? roles[0].replace("ROLE_", "") : ''}</span>
            </div>
          </div>
          <ul className='p-0 list-none mt-3 border-t border-gray-200'>
            <li className='p-2 text-base hover:bg-gray-100 transition duration-100 cursor-pointer mt-2 '>
              <Link to='/detailuser' className='no-underline w-full h-full text-gray-600 flex items-center gap-2 ml-3 '>
                <RiUserLine className='inline-block align-middle leading-3 text-[20px] text-gray-600' /> Trang Cá Nhân
              </Link>
            </li>
            <li className='p-2 text-base hover:bg-gray-100 transition duration-100 cursor-pointer mt-2 '>
              <Link to='/dasboard' className='no-underline w-full h-full text-gray-600 flex items-center gap-2 ml-3 '>
                <IoSettingsOutline className='inline-block align-middle leading-3 text-[20px] text-gray-600' /> Cài Đặt
              </Link>
            </li>
            <li onClick={handleLogout} className='p-2 text-base hover:bg-gray-100 transition duration-100 cursor-pointer mt-5 mb-1 border-t border-gray-200 '>
              <span className='no-underline w-full h-full text-gray-600 flex items-center gap-2 ml-3 '>
                <TbLogout2 className='inline-block align-middle leading-3 text-[20px] text-gray-600' /> Đăng Xuất
              </span>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header