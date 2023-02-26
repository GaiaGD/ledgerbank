import { Routes, Route } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "./utils/firebase-config"
import { UserContext } from "./UserContext"
import Intro from "./Pages/Intro"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"

import PrivateRoute from "./utils/PrivateRoute"

import CheckingBalance from "./Pages/CheckingBalance"
import SavingBalance from "./Pages/SavingBalance"

function App() {

  const {userLogged, logOut} = useContext(UserContext)

  return (

    <div className="App p-4">

      <Routes>
          <Route exact path="/" element={<Intro />} />
          <Route exact path="/signup" element={<Signup />} />          
          <Route exact path="/login" element={<Login />} />
          
          <Route element={<PrivateRoute userLogged={userLogged} />}>
            <Route exact path="/checkingBalance" element={<CheckingBalance />} />
          </Route>
          
          <Route element={<PrivateRoute userLogged={userLogged} />}>
            <Route exact path="/savingBalance" element={<SavingBalance />} />
          </Route>
          
      </Routes>


    </div>
  )

}

export default App
