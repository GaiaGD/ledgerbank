import { Link, useNavigate } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import { UserContext } from "../UserContext"

function Login() {
  const {loggingIn, userLogged, handleLogin, logIn, loginError, cleanLoginError} = useContext(UserContext)
  let navigate = useNavigate()

  // making sure it doesn't load previous mistakes if i refresh the page or visit it again
  useEffect(() => {
    cleanLoginError()
  }, [])

  const [modal, setModal] = useState(false)

  // ALSO A GOOD SOLUTION
  // function goToChecking(){
  // // i have to wait for the userLogged value to change when authenticated or the checkingpage would go back to login
  //   setTimeout(() => {
  //     return navigate('/checkingBalance')
  //   }, "500")
  // }


  // every time i click on login (function from usecontext) the content of userLogged changes so it triggers useEffect, and allows the user to go to checkingbalance that is a private route, only accessible if userLogged is populated
  useEffect(() => {
    if (userLogged !== null){
      cleanLoginError()
      return navigate('/checkingBalance')
    }
  }, [userLogged])

  // every time i click on login (function from usecontext) if i receive an error, it saves it in a state, so it triggers useEffect that shows the error modal
  useEffect(() => {
    if (loginError !== ''){
      setModal(true)
    }
  }, [loginError])

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

        <div className="h-7">
          { modal && <p className="text-red-900 text-sm text-center">{loginError}</p>}
        </div>

        <div to="/checkingBalance" className="block my-2 w-full gradient-cta mt-8 p-4 rounded-full bg-origin-border solid border-2 border-transparent" onClick={logIn} >
            <h3 className="uppercase font-bold text-base text-center">Log in</h3>
        </div>
        <div className="my-8">
          <Link to="/signup">
              <h2 className="underline underline-offset-4 text-center">Sign in</h2>
          </Link>
        </div>
      </div>


    </div>
  )

}

export default Login
