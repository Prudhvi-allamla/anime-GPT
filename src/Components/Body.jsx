import React, { useEffect } from 'react'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Login from './Login';
import Header from './Header';
import Browse from './Browse';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase';
import { adduser, removeuser } from '../utils/userslice';
import Gptsearch from './Gptsearch';
import MovieDetails from './MovieDetails';





const Body = () => {
  const dispatch = useDispatch()
  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
       
        const { uid, email, displayName } = user;
        dispatch(adduser({ uid: uid, email: email, displayName: displayName }))
        
        // ...
      } else {

        dispatch(removeuser())
      }
    });

  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      children: [{
        index: true,
        element: <Login />
      }]

    }, {
      path: "/browse",
      element: <Browse />
    },
    {
      path: "/gptsearch",
      element: <Gptsearch />
    },
    {
      path: "/movieDetails/:id",
      element: <MovieDetails />
    },

  ]);


  return (
    <RouterProvider router={router} />
  )
}

export default Body
