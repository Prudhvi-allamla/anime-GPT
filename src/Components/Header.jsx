import React from 'react'
import { Outlet } from 'react-router'

const Header = () => {
    return (
        <div>
            <div className='absolute z-10'>
                <img className="w-40 p-4 " src="https://www.pikpng.com/pngl/b/469-4694291_one-piece-hat-png-clipart.png" />

            </div>
            <Outlet />
        </div>
    )
}

export default Header
