import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router'
import { OPTIONS, TMDB_CDN_URL } from '../constants/tmdbConstants'
import { useSelector } from 'react-redux'

const MovieDetails = () => {

    const [trailer,setTrailer]=useState(null)
    const [movieDetails,setMovieDetails]=useState(null)
    const {id}=useParams()
    useEffect( ()=>{
        const fetchMovieDetails= async()=>{
            const data= await fetch("https://api.themoviedb.org/3/movie/"+id+"?language=en-US",OPTIONS);
        const json_data=await data.json()
        setMovieDetails(json_data)

        }

        const  fetchVideos=async()=>{
            const data= await fetch("https://api.themoviedb.org/3/movie/"+id+"/videos?language=en-US",OPTIONS);
        const json_data=await data.json()
        const trailerDetails=json_data.results.find(m=>m.type==="Trailer" && m.site === "YouTube")
        setTrailer(trailerDetails)
        

        }
        fetchMovieDetails()
        fetchVideos()        
    },[]

    )

    const navigate=useNavigate()
    const movie = useSelector(store => store.tmdb.moviedetails)
    console.log(movie)

    if(movieDetails==null) return("")

        return (
        <div className='relative w-screen h-screen'>
            <div className='flex absolute  justify-center w-screen  '>
                <img className="w-screen fixed blur-md h-screen overflow-hidden opacity-45 rounded-4xl " src={TMDB_CDN_URL + movieDetails?.backdrop_path} />
            </div>

            <div className='relative'>



                <div className='flex justify-end'>
                    <button className='bg-red-600 px-4 py-2 mx-4 mt-2 rounded-lg' onClick={()=>{navigate("/browse")}}> home</button>
                    <button className='bg-yellow-600 px-4 py-2 mx-4 mt-2 rounded-lg' onClick={()=>{navigate("/gptsearch")}} >gptsearch</button>
                </div>
                <div className='block mt-10 md:mt-0 '>
                <div className='flex justify-center'>
                    <div>
                    <img className=" w-50 md:w-70 rounded-4xl shadow-2xl  " src={TMDB_CDN_URL + movieDetails.poster_path} />
                    </div>
                    
                </div>

                <div className='flex  w-screen justify-center text-white'>
                    <div  className=' w-80 md:w-150 p-4  bg-black/40 rounded-3xl mt-4 md:border-2'>
                        <div className='flex'>
                            <h1 className='font-bold'>Title :</h1> <p className='px-4'>{movieDetails.title}</p>

                        </div>
                        <div className='flex'>
                            <h1 className='font-bold'>overview:</h1> <p className='px-4'> {movieDetails.overview}</p>
                        </div>
                         <div className='flex'>
                            <h1 className='font-bold'>rating:</h1> <p className='px-4'> {movieDetails.vote_average/2}</p>
                        </div>
                         <div className='flex'>
                            <h1 className='font-bold'>Family_Friendly:</h1> <p className='px-4'> {!movieDetails.adult? "yes":"no"}</p>
                        </div>


                    </div>



                </div>
                </div>
                {trailer ?<div className='px-4 m-5 flex justify-center '>
                        <iframe className='md:h-70 aspect-video rounded-2xl' src={`https://www.youtube.com/embed/${trailer.key}?si=5mqAK1Q92MVm3Mvc`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  allowFullScreen></iframe>


                    </div> :"" }
                

            </div>

        </div>
    )
}

export default MovieDetails
