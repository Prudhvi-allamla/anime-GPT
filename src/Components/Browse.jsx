import React from 'react'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux'
import { removeuser } from '../utils/userslice';
import { useNavigate } from 'react-router';
import Movielist from './Movielist';

const Browse = () => {
 
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignout = () => {
    dispatch(removeuser())
    navigate("/")
  }
  const navigateToGptPage=()=>{
    navigate("/gptsearch")

  }


  const playingnowMovies = useSelector(store => store.tmdb.playingNow)
      const popularMovies = useSelector(store => store.tmdb.popular)
  return (
    <div className=' w-screen '>
      <div className='flex justify-between relative z-10'>
        <Header />

       <div>
        <button  className='bg-gray-700 text-lg m-4 text-white  p-4 py-2 rounded-lg' onClick={()=>{
          navigateToGptPage()
        }}> GPT Search </button>
         <button className='bg-red-700 text-lg m-4 text-white  p-4 py-2 rounded-lg' onClick={() => {
          handleSignout()
        }} > sign out</button>
       </div>

      </div>
      <div className="  -my-20 h-screen overflow-hidden">
        <div className='absolute h-screen w-screen  bg-gradient-to-t from-black via-black/60 to-transparent'>     </div>
       <video className='w-screen'
      src="https://res.cloudinary.com/dfrlwuzeo/video/upload/v1769062635/Demon_Slayer_Kimetsu_no_Yaiba_Infinity_Castle_MAIN_TRAILER_720P_wdgpjw.mp4"
      loop
      
      autoPlay
      
      muted
      playsInline
    />
      </div >
      <div className='-my-50 relative z-50' >
         <Movielist title="Now Playing" movies={playingnowMovies}/>
      <Movielist title="Popular" movies={popularMovies}/>
      </div>
     
      

    </div>
  )
}

export default Browse
