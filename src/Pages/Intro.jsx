import { Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState, useContext } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../utils/firebase-config"
import { UserContext } from "../UserContext"

function Intro() {

  const {userLogged, logOut} = useContext(UserContext)
  console.log(userLogged)
  return (

    <div className="flex items-center justify-center h-screen">

      <div className="md:w-1/3 w-full">

        <div className="text-center">
          <h3>User Logged in:</h3>
          {userLogged ? <h1>{userLogged.email}</h1> : <h1>You're logged out</h1>}
          <div onClick={logOut}>Log Out</div>
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
      </div>
    </div>
  )

}

export default Intro
