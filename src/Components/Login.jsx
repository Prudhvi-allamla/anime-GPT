import React, { useEffect, useRef, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase"
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { adduser } from '../utils/userslice';
import { addgptsearchmovies, addnowplaying, addpopular } from '../utils/tmdbslice';


const Login = () => {
    const dispatch = useDispatch()

    useEffect( ()=>{
          dispatch(addnowplaying([]))
          dispatch(addpopular([]))
          dispatch(addgptsearchmovies([]))

    },[])

  

    const navigate = useNavigate()
    const user = useSelector(store => store.user)

    useEffect(() => {
        if (user != null) {
            navigate("/browse")
        }
    }, [user, navigate])


    const name = useRef(null)
    const email = useRef(null);
    const password = useRef(null);
    const [errorMessagedisplay, seterrorMessagedisplay] = useState(null)





    const [isreg, setIsreg] = useState(false)




    const handledatasubmit = () => {



        if (isreg) {



            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    dispatch(adduser({
                        uid: user.uid,
                        email: user.email,
                        displayName: name.current.value
                    }))

                    navigate("/browse")



                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    if (errorMessage == "Firebase: Error (auth/email-already-in-use).") {
                        seterrorMessagedisplay("email already existed")

                    }


                    // ..
                });

        }
        else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    dispatch(adduser({
                        uid: user.uid,
                        email: user.email,
                        displayName: name.current.value
                    }))

                    navigate("/browse")
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    if(errorMessage){
                        seterrorMessagedisplay("invalid creditials.")
                    } 


                }); 

        }

    }

    function handletoggel() {
        seterrorMessagedisplay("")


        
        setIsreg(!isreg)
    }

    return (
        <div>

            <div className=' h-screen w-screen absolute bg-gray-950 opacity-90'></div>
            <div className='absolute'>
                <div className='flex w-screen h-screen justify-center items-center '>

                    <form onSubmit={(e) => (e.preventDefault())} className='bg-gray-500 
                     md:w-3/12 h-auto p-4 rounded-2xl  justify-center' >
                        <h2 className='text-2xl font-bold font-mono'> {isreg ? "register" : "login"}</h2>
                        {isreg && <input className="bg-amber-50 w-full my-3 rounded-lg py-2" placeholder="Enter fullname" type='text' ref={name} />}

                        <input className="bg-amber-50 w-full my-3 rounded-lg py-2"
                            ref={email} placeholder="Enter your email" type='email' />


                        <input className="bg-amber-50 w-full my-3 rounded-lg py-2" ref={password} placeholder="Enter your password" type='password' />
                        {errorMessagedisplay && <p>{errorMessagedisplay}</p>}
                        <div className='flex justify-center w-full'>
                            <button className='w-9/12 py-3 bg-red-700  mt-10 rounded-md ' onClick={handledatasubmit}> {isreg ? "signup" : "login"}</button>
                        </div>
                        

                        <p className='py-5 cursor-pointer' onClick={handletoggel}>{isreg ? "already have a account . click here to login" : "dont have a account. register here...."}.</p>

                    </form>
                </div>

            </div>
            <img className="h-screen w-screen" src="https://images2.alphacoders.com/774/thumb-1920-774545.jpg" /> 



        </div>
    )
}

export default Login
