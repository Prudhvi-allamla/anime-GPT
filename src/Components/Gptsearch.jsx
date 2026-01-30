import React, { useEffect, useRef } from 'react'
import { GoogleGenAI } from '@google/genai';
import { OPENAI_KEY } from '../constants/openAiConstants';
import { OPTIONS } from '../constants/tmdbConstants';
import { useDispatch, useSelector } from 'react-redux';
import { addgptsearchmovies, toggleLoading, } from '../utils/tmdbslice';
import Moviecard from './Moviecard';
import Loading from './Loading';
import { useNavigate } from 'react-router';







const Gptsearch = () => {
    const navigate=useNavigate()
    const empty=[]

    const loading=useSelector(store=>store.tmdb.loading)


    const movies = useSelector(store => store.tmdb.gtpsearchmovies)
    const finallist = []

    const dispatch = useDispatch()


    const GEMINI_API_KEY = OPENAI_KEY;

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    const searchtext = useRef(null)








    async function main() {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: "Return only original official movie titles exactly as listed on TMDB, correctly spelled, no years, no explanations, comma-separated only, for this query: "+searchtext.current.value

        });
        const moviees = response.text.split(",")
        console.log(moviees)


        await Promise.all(



            
            moviees.map(async (moviee) => {
                const res = await fetch(
                    'https://api.themoviedb.org/3/search/movie?query=' + moviee.trim()+ '&include_adult=false&language=en-US&page=1',
                    OPTIONS
                );
                const json = await res.json();
                if (json.results && json.results.length > 0) {
  finallist.push(json.results[0]);
}

                // const exact = json.results.find(
                //     m => m.title.toLowerCase().trim() === moviee.toLowerCase()
                // );

                // if (exact) finallist.push(exact);
            })
        );

        dispatch(addgptsearchmovies(finallist));
         dispatch(toggleLoading(false))

        console.log("end")

        console.log(finallist);


  

    //     moviees.map((moviee) => {


    //         fetch('https://api.themoviedb.org/3/search/movie?query=' + moviee + '&include_adult=false&language=en-US&page=1', OPTIONS)
    //             .then(res => res.json())
    //             .then(json => finallist = json)

    //     })
    }

    const handleGptSearch = async () => {
        console.log("button clicked")
        dispatch(addgptsearchmovies(empty));


        dispatch(toggleLoading(true))
        await main();
        const ai = new GoogleGenAI({ apiKey: 'GEMINI_API_KEY' });

    }
   

    return (
        <>
        <div  className='flex justify-end'> <button className='bg-gray-600 text-md text-white px-4 py-2 rounded-2xl m-8 ' onClick={()=>{
            navigate("/browse")
        }}>back
            </button></div>
            <div className=' mx-10 md:mx-0 md:flex w-screen justify-center mt-4   '>
                <input type='text' className='bg-white  p-2 w-50 md:w-100 rounded-2xl' placeholder=' Ask me what do you wanna watch.........' ref={searchtext} />
                <button className='bg-red-700 p-2 px-6 mx-4 rounded-2xl' onClick={() => {
                    handleGptSearch()
                }}> search </button>
                

            </div >
            {movies.length ? <div className='flex overflow-x-scroll no-scrollbar  p-5' >
                <div className="flex justify-center flex-wrap ">
                    {movies.map(movie => <Moviecard key={movie.id} movie={movie} />)}
                </div>

            </div>:  loading ? <Loading/>

:""  }
</>)}
export default Gptsearch
