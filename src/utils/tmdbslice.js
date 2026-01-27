import { createSlice } from '@reduxjs/toolkit'
import MovieDetails from '../Components/MovieDetails'



 const tmdbslice = createSlice({
    name:"tmdb",
  initialState:{
    playingNow:[],
    popular:[],
    gtpsearchmovies:[],
    gtpmovietitle:[],
    moviedetails:null,
    
  },
  reducers: {
   addnowplaying:(state,action)=>{
    state.playingNow= action.payload
   },
   addpopular:(state,action)=>{
    state.popular= action.payload
   },
   addgptsearchmovies:(state,action)=>{
    state.gtpsearchmovies=action.payload
   },
   addgtpmovietitle:(state,action)=>{
    state.gtpmovietitle=action.payload
   },
   addmoviedetails:(state,action)=>{
    state.moviedetails=action.payload
   },
   
   
   
   
  },
})

// Action creators are generated for each case reducer function
export const { addnowplaying,addpopular,addgptsearchmovies,addmoviedetails} = tmdbslice.actions

export default tmdbslice.reducer