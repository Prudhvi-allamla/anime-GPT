import { Spinner } from '@/components/ui/spinner'
import React from 'react'




const Loading = () => {
  return (
  <div className=' flex justify-center items-center mt-20 '>

      
      <Spinner className="size-16 text-white "/>
      <div className='text-white text-2xl'> Preparing your watchlist…</div>

  </div>
    
    
    
  )
}

export default Loading
