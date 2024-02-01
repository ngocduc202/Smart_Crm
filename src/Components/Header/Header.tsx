import React from 'react'
import {
  BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsJustify, BsSearch, BsFillBellFill, BsFillEnvelopeAtFill, BsFillEnvelopeFill, BsPersonCircle
}
  from 'react-icons/bs'
interface Props {
  OpenSidebar: () => void;
}
const Header = ({ OpenSidebar }: Props) => {
  return (
    <header className='grid-area h-[70px] bg-gradient-to-r from-[#006e8cf9] to-[#07bd89] flex w-full items-center justify-center py-0 px-[30x] shadow-md'>
      <div className='hidden'>
        <BsJustify className='inline-block align-middle leading-3 text-[20px]' onClick={OpenSidebar} />
      </div>
      <div className='flex justify-between w-[95%]'>
        <div className='flex gap-4 items-center justify-center w-[350px] p-3 relative'>
          <input type="search" name="" id="" placeholder='Search ....' className='border-1 border-white box-border w-full text-sm h-[40px]  ml-neg-15vw outline-solid outline-0 p-2 w-30vw z-1 rounded-xl placeholder:italic ' />
          <BsSearch className='inline-block align-middle leading-3 text-[25px] h-2em cursor-pointer bg-white absolute right-6' color='black' />
        </div>
        <div className='flex gap-5 items-center justify-center'>
          <BsFillBellFill className='inline-block align-middle leading-3 text-[20px] cursor-pointer' color='white' />
          <BsFillEnvelopeFill className='inline-block align-middle leading-3 text-[20px] cursor-pointer' color='white' />
          <BsPersonCircle className='inline-block align-middle leading-3 text-[20px] cursor-pointer' color='white' />
        </div>
      </div>
    </header>
  )
}

export default Header