import { Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState, useContext } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../utils/firebase-config"
import { UserContext } from "../UserContext"

function Login() {

  const {loggingIn, loginError, userLogged, handleLogin, logIn, logOut} = useContext(UserContext)
  console.log(loginError)
  return (

    <div className="flex items-center justify-center h-screen">
      <div className="md:w-1/3 w-full">
        <Link to="/">
          <img className="object-contain mx-auto w-1/12 m-16" src="src/assets/ledger-logo.svg" />
        </Link>

        <div className="">
          <input className="w-full py-4 px-8 my-2 rounded-full border-solid border-white border-2 bg-black text-base font-light" placeholder="Email" name="email" value={loggingIn.email} onChange={handleLogin} />
        </div>
        <div>
          <input className="w-full py-4 px-8 my-2 rounded-full border-solid border-white border-2 bg-black text-base font-light" placeholder="Password" type="password" name="password" value={loggingIn.password} onChange={handleLogin} />
        </div>
        
        <Link to={loginError ? "/" : "/checkingBalance"} className="block my-2 w-full gradient-cta p-4 rounded-full bg-origin-border solid border-2 border-transparent" onClick={logIn} >
            <h3 className="uppercase font-bold text-base text-center">Log in</h3>
        </Link>

      </div>
    </div>
  )

}

export default Login
