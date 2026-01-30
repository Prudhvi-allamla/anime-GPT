import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addnowplaying, addpopular } from '../utils/tmdbslice';
import Moviecard from './Moviecard';
import { NOWPLAYING_URL, OPTIONS, POPULAR_URL } from '../constants/tmdbConstants';

const Movielist = ({ title, movies }) => {
    const dispatch = useDispatch()


    useEffect(() => {
        
        fetch(NOWPLAYING_URL, OPTIONS)
            .then(res => res.json())
           
            .then(json => dispatch(addnowplaying(json.results)))

            .catch(err => console.error(err));
    }, [])

    useEffect(() => {
      
        fetch(POPULAR_URL, OPTIONS)
            .then(res => res.json())
            
            .then(json => dispatch(addpopular(json.results)))

            .catch(err => console.error(err));
    }, [])
    // const playingnowMovies = useSelector(store => store.tmdb.playingNow)
    // const popularMovies = useSelector(store => store.tmdb.popular)






    return (
        <div>
            <div className='text-3xl font-bold  relative   text-white'>{title} </div>
            <div className='flex overflow-x-scroll no-scrollbar' >
                <div className="flex  ">
                    {movies.map(movie => <Moviecard key={movie.id} movie={movie} />)}
                </div>

            </div>
        </div>
    )
}

export default Movielist
