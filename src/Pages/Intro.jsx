import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../utils/firebase-config"
import { UserContext } from "../UserContext"
import CheckingOrSaving from "../Components/CheckingOrSaving"

function Intro() {
  const navigate = useNavigate()
  const {userLogged, userLoggedData, logOut} = useContext(UserContext)
  
    return (

        <div>
            <div className="flex items-center justify-center h-screen">
              <div className="md:w-1/3 w-full">              
              {userLogged
                ?
                <div>
                  <div className="">
                    <img className="object-contain mx-auto w-1/6 m-16" src="src/assets/ledger-logo.svg" />
                  </div>
                  <div>
                    <h2 className="capitalize text-4xl text-center">Hello {userLoggedData.username}</h2>
                    <CheckingOrSaving selected={""} />
                  </div>
                  <div className="my-16">
                    <h2 className="underline underline-offset-4 text-center" onClick={logOut}>Log out</h2>
                  </div>
                </div>

                :
                
                <div>
                  <div className="">
                    <img className="object-contain mx-auto w-1/6 m-16" src="src/assets/ledger-logo.svg" />
                  </div>
                  <Link to="/signup">
                    <button className="my-2 w-full gradient-cta p-4 rounded-full bg-origin-border solid border-2 border-transparent" >
                      <h3 className="uppercase font-bold text-base">Sign up</h3>
                    </button>
                  </Link>
                  <Link to="/login">
                    <button className="my-2 w-full gradient-cta p-4 rounded-full bg-origin-border solid border-2 border-transparent" >
                      <h3 className="uppercase font-bold text-base">Login</h3>
                    </button>
                  </Link>
                </div>
              }
              </div>
            </div>

            <div className="flex items-center justify-center h-screen">
              <div className="md:w-1/3 w-full">
                <div className="text-center">
                  {/* <h3>User Logged in:</h3>
                  {userLogged ? <h1>{userLogged.email}</h1> : <h1>You're logged out</h1>} */}
                  {userLoggedData &&  <h2 className="capitalize text-4xl text-center">Hello {userLoggedData.username}</h2>}
                </div>

                <div className="">
                  <img className="object-contain mx-auto w-1/6 m-16" src="src/assets/ledger-logo.svg" />
                </div>
                <Link to="/signup">
                  <button className="my-2 w-full gradient-cta p-4 rounded-full bg-origin-border solid border-2 border-transparent" >
                    <h3 className="uppercase font-bold text-base">Sign up</h3>
                  </button>
                </Link>
                <Link to="/login">
                  <button className="my-2 w-full gradient-cta p-4 rounded-full bg-origin-border solid border-2 border-transparent" >
                    <h3 className="uppercase font-bold text-base">Login</h3>
                  </button>
                </Link>
                
                <div className="text-center p-4">
                  <div onClick={logOut}>Log Out</div>
                </div>

              </div>
            </div>
        </div>
  )

}

export default Intro
