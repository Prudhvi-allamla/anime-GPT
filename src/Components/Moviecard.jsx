import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TMDB_CDN_URL } from '../constants/tmdbConstants'
import { useNavigate } from 'react-router'
import { addmoviedetails } from '../utils/tmdbslice'


const Moviecard = ({movie}) => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  
  const handleMovieDetails=()=>{

    
    dispatch(addmoviedetails(movie))


    
    navigate("/movieDetails/"+movie.id);
    
    

  }
    

  

  return (
    <div className='text-white'>
      
       <div className='w-40 m-4  ' onClick={handleMovieDetails}>
        <img  className='border-2 rounded-md' src={TMDB_CDN_URL+movie.poster_path}/>
         <div>
        <p className='flex justify-center'>{movie.title}</p>
       </div>
       </div>
      
    </div>
  )
}

export default Moviecard
