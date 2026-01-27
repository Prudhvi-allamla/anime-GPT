import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import { TMDB_CDN_URL } from '../constants/tmdbConstants'
import { useSelector } from 'react-redux'

const MovieDetails = () => {
    const navigate=useNavigate()
    const movie = useSelector(store => store.tmdb.moviedetails)
    console.log(movie)





    return (
        <div className='relative w-screen h-screen'>
            <div className='flex absolute justify-center w-screen  '>
                <img className="w-screen blur-md h-screen overflow-hidden opacity-45 rounded-4xl " src={TMDB_CDN_URL + movie.backdrop_path} />
            </div>

            <div className='  relative'>



                <div className='flex justify-end'>
                    <button className='bg-red-600 px-4 py-2 mx-4 mt-2 rounded-lg' onClick={()=>{navigate("/browse")}}> home</button>
                    <button className='bg-yellow-600 px-4 py-2 mx-4 mt-2 rounded-lg' onClick={()=>{navigate("/gptsearch")}} >gptsearch</button>
                </div>
                <div className='flex justify-center'>
                    <img className="w-70 rounded-4xl shadow-2xl  " src={TMDB_CDN_URL + movie.poster_path} />
                </div>

                <div className='flex  w-screen justify-center text-white'>
                    <div  className='  w-150 p-4  bg-black/40 rounded-3xl mt-4 border-2'>
                        <div className='flex'>
                            <h1 className='font-bold'>Title :</h1> <p className='px-4'>{movie.title}</p>

                        </div>
                        <div className='flex'>
                            <h1 className='font-bold'>overview:</h1> <p className='px-4'> {movie.overview}</p>
                        </div>
                         <div className='flex'>
                            <h1 className='font-bold'>rating:</h1> <p className='px-4'> {movie.vote_average/2}</p>
                        </div>
                         <div className='flex'>
                            <h1 className='font-bold'>Family_Friendly:</h1> <p className='px-4'> {!movie.adult? "yes":"no"}</p>
                        </div>


                    </div>



                </div>
            </div>

        </div>
    )
}

export default MovieDetails
