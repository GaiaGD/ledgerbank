import { Routes, Route } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "./utils/firebase-config"
import { UserContext } from "./UserContext"
import Intro from "./Components/Intro"
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import CheckingBalance from "./Components/CheckingBalance"

function App() {

  const {signinUp, loggingIn, userLogged, handleSignup, handleLogin, signUp, logIn, logOut} = useContext(UserContext)

  return (

    <div className="App">

      <Routes>
          <Route exact path="/" element={<Intro />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/checkingBalance" element={<CheckingBalance />} />
      </Routes>


    </div>
  )

}

export default App
