import React, { useEffect, useRef } from 'react'
import { GoogleGenAI } from '@google/genai';
import { OPENAI_KEY } from '../constants/openAiConstants';
import { OPTIONS } from '../constants/tmdbConstants';
import { useDispatch, useSelector } from 'react-redux';
import { addgptsearchmovies, } from '../utils/tmdbslice';
import Moviecard from './Moviecard';







const Gptsearch = () => {


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
        main();
        const ai = new GoogleGenAI({ apiKey: 'GEMINI_API_KEY' });

    }
   

    return (
        <>
            <div className='flex w-screen justify-center mt-30  '>
                <input type='text' className='bg-white p-2 w-100 rounded-2xl' placeholder=' Ask me what do you wanna watch.........' ref={searchtext} />
                <button className='bg-red-700 p-2 px-6 mx-4 rounded-2xl' onClick={() => {
                    handleGptSearch()
                }}> search </button>
                

            </div >
            {movies.length ? <div className='flex overflow-x-scroll no-scrollbar justify-center p-20' >
                <div className="flex ">
                    {movies.map(movie => <Moviecard key={movie.id} movie={movie} />)}
                </div>

            </div>:<div className='text-2xl text-white'> loading...</div> }
            
        </>
    )
}

export default Gptsearch
