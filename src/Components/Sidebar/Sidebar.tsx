import React from 'react'
import Logo from '../../img/rangdong.png'
import { Link } from 'react-router-dom';
import {
  BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill
}
  from 'react-icons/bs'
interface Props {
  openSidebarToggle: boolean;
}

const Sidebar = ({ openSidebarToggle }: Props) => {
  return (
    <aside id="sidebar" className={openSidebarToggle ? 'inline absolute z-20' : ''}>
      <div className="flex justify-between items-center p-5 md:p-8">
        <div className='text-lg font-bold'>
          <img src={Logo} alt="" className='object-contain' />
        </div>
        {/* <span className='inline-block align-middle leading-3 text-[20px] text-red-500 ml-8 mt-4 cursor-pointer'>X</span> */}
      </div>

      <ul className='p-0 list-none'>
        <li className='p-5 text-base hover:bg-[#006e8c] cursor-pointer'>
          <a href="" className='no-underline text-gray-100 '>
            <BsGrid1X2Fill className='inline-block align-middle leading-3 text-[20px]' /> Dashboard
          </a>
        </li>
        <li className='p-5 text-base hover:bg-[#006e8c] cursor-pointer'>
          <a href="" className='no-underline text-gray-100 ' >
            <BsFillArchiveFill className='inline-block align-middle leading-3 text-[20px]' /> Products
          </a>
        </li>
        <li className='p-5 text-base hover:bg-[#006e8c] cursor-pointer'>
          <a href="" className='no-underline text-gray-100 '>
            <BsFillGrid3X3GapFill className='inline-block align-middle leading-3 text-[20px]' /> Categories
          </a>
        </li>
        <li className='p-5 text-base hover:bg-[#006e8c] cursor-pointer'>
          <Link to="/detailuser" className='no-underline text-gray-100 '>
            <BsPeopleFill className='inline-block align-middle leading-3 text-[20px]' /> Customers
          </Link>
        </li>
        <li className='p-5 text-base hover:bg-[#006e8c] cursor-pointer'>
          <a href="" className='no-underline text-gray-100 '>
            <BsListCheck className='inline-block align-middle leading-3 text-[20px]' /> Inventory
          </a>
        </li>
        <li className='p-5 text-base hover:bg-[#006e8c] cursor-pointer'>
          <a href="" className='no-underline text-gray-100 '>
            <BsMenuButtonWideFill className='inline-block align-middle leading-3 text-[20px]' /> Reports
          </a>
        </li>
        <li className='p-5 text-base hover:bg-[#006e8c] cursor-pointer'>
          <a href="" className='no-underline text-gray-100 '>
            <BsFillGearFill className='inline-block align-middle leading-3 text-[20px]' /> Setting
          </a>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar