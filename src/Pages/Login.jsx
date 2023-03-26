import { Link, useNavigate } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import { UserContext } from "../UserContext"
import { motion } from "framer-motion"

function Login() {
  const {loggingIn, userLogged, handleLogin, logIn, loginError, cleanLoginError} = useContext(UserContext)
  const [error, setError] = useState(false)

  let navigate = useNavigate()

  const loginVariants = {
    initial: { opacity: 0, translateX: 200 },
    animate: { opacity: 1,
      translateX: 0,
      transition: { staggerChildren: 0.1, duration: 0.6 },
    }
  }

  // making sure it doesn't load previous mistakes if i refresh the page or visit it again
  useEffect(() => {
    cleanLoginError()
  }, [])


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
      return navigate('/ledgerbank/checkingBalance')
    }
  }, [userLogged])

  // every time i click on login (function from usecontext) if i receive an error, it saves it in a state, so it triggers useEffect that shows the error
  useEffect(() => {
    if (loginError !== ''){
      setError(true)
    }
  }, [loginError])

  return (
    <motion.div variants={loginVariants} initial="initial" animate="animate" className="flex items-center justify-center h-screen">

        <div className="md:w-1/3 w-full">
          <motion.div variants={loginVariants}>
            <Link to="/ledgerbank/">
              <img className="object-contain mx-auto w-1/12 m-16" src="./ledger-logo.svg" />
            </Link>
          </motion.div>

          <motion.div variants={loginVariants}>
            <input className="w-full py-4 px-8 my-2 rounded-full border-solid border-white border-2 bg-black text-base font-light" placeholder="Email" name="email" value={loggingIn.email} onChange={handleLogin} />
          </motion.div>
          <motion.div variants={loginVariants}>
            <input className="w-full py-4 px-8 my-2 rounded-full border-solid border-white border-2 bg-black text-base font-light" placeholder="Password" type="password" name="password" value={loggingIn.password} onChange={handleLogin} />
          </motion.div>

          <div className="h-7">
            { error && <p className="text-red-900 text-sm text-center">{loginError}</p>}
          </div>

          <motion.div variants={loginVariants} className="w-full gradient-cta mt-4 p-4 rounded-full bg-origin-border solid border-2 border-transparent" onClick={logIn} >
              <h3 className="uppercase font-bold text-base text-center">Log in</h3>
          </motion.div>

          <motion.div variants={loginVariants} className="my-8">
            <Link to="/ledgerbank/signup">
                <h2 className="underline underline-offset-4 text-center">Sign in</h2>
            </Link>
          </motion.div>

        </div>

    </motion.div>
  )

}

export default Login
