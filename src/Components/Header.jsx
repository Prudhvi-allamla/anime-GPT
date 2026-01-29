import React from 'react'
import { Outlet } from 'react-router'

const Header = () => {
    return (
        <div>
            <div className='absolute z-10'>
                <img className="w-40 p-4 " src="https://res.cloudinary.com/dfrlwuzeo/image/upload/v1769506816/pngtree-straw-hat-cartoon-illustration-png-image_8954284_nay3aj.png" />

            </div>
            <Outlet />
        </div>
    )
}

export default Header
