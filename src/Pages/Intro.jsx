import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../utils/firebase-config"
import { UserContext } from "../UserContext"
import CheckingOrSaving from "../Components/CheckingOrSaving"
import Loader from "../Components/Loader"
import { motion } from "framer-motion"

function Intro() {
  const {userLogged, userLoggedData, logOut} = useContext(UserContext)
  


    return (

        <div>
            <Loader />

            <div className="flex items-center justify-center h-screen">
              <div className="md:w-1/3 w-full">           

              {userLogged

                ?
                  <motion.div
                    initial={{ opacity: 0, x: 200 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 3, duration: 0.5 }}
                  >
                    <div className="">
                      <img className="object-contain mx-auto w-2/3 m-16" src="src/assets/ledger-logotype.svg" />
                    </div>
                    <div className="text-center">
                      <h2 className="capitalize text-4xl">Hello {userLoggedData.username}</h2>
                      <h3 className="mt-16 mb-4 mx-[25%]">What account would you like to view?</h3>
                      <CheckingOrSaving selected={""} />
                    </div>

                    <div className="my-16">
                      <h2 className="underline underline-offset-4 text-center" onClick={logOut}>Log out</h2>
                    </div>
                    
                  </motion.div>
                :
                  <div>
                    <div className="">
                      <img className="object-contain mx-auto w-2/3 m-16" src="src/assets/ledger-logotype.svg" />
                    </div>
                    <Link to="/signup">
                      <button className="my-2 w-full gradient-cta p-4 rounded-full bg-origin-border solid border-2 border-transparent" >
                        <h3 className="uppercase font-bold text-base">Create Account</h3>
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


        </div>
  )

}

export default Intro
