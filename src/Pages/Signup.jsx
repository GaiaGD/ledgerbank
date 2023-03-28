import { useState, useContext, useEffect } from "react"
import { UserContext } from "../UserContext"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

function Signup() {

  const {signinUp, userLogged, handleSignup, currency, getCurrency, signUp, signupError, cleanSignupError} = useContext(UserContext)
  const [error, setError] = useState(false)
  let navigate = useNavigate()

  const signupVariants = {
    initial: { opacity: 0, translateX: 200 },
    animate: { opacity: 1,
      translateX: 0,
      transition: { staggerChildren: 0.1, duration: 0.6 },
    }
  }


  const [clicked, setClicked] = useState(false)
  // this means that once the whole div is clicked, we have a currency stored in state

  let notSelected = { opacity: "30%" }
  let selected = { opacity: "100%" }


  // making sure it doesn't load previous mistakes if i refresh the page or visit it again
  useEffect(() => {
    cleanSignupError()
  }, [])

  // every time i click on signup (function from usecontext) the content of userLogged changes so it triggers useEffect,
  //and allows the user to go to checkingbalance that is a private route, only accessible if userLogged is populated
  useEffect(() => {
    if (userLogged !== null){
      cleanSignupError()
      return navigate('/checkingBalance')
    }
  }, [userLogged])

  // every time i click on signup (function from usecontext) if i receive an error, it saves it in a state,
  // so it triggers useEffect that shows the error 
  useEffect(() => {
    if (signupError !== ''){
      setError(true)
    }
  }, [signupError])


  const currenciesArray = ["$", "€", "£", "¥"];

  const notClickedCurrencies = currenciesArray.map((currencyElement) => {
    return <div key={currencyElement} className="py-4 px-6 my-2 rounded-full border-solid border-white border-2 bg-black text-base" onClick={getCurrency} id={currencyElement} name={currencyElement} > {currencyElement} </div>
  })

  const clickedCurrencies = currenciesArray.map((currencyElement) => {
    return <div key={currencyElement} style={ currency === currencyElement ? selected : notSelected } className="py-4 px-6 my-2 rounded-full border-solid border-white border-2 bg-black text-base" onClick={getCurrency} id={currencyElement} name={currencyElement} > {currencyElement} </div>
  })


  return (
    
    <motion.div variants={signupVariants} initial="initial" animate="animate" className="flex items-center justify-center h-screen">

        <div className="md:w-1/3 w-full">
          <motion.div variants={signupVariants}>
            <Link to="/">
              <img className="object-contain mx-auto w-1/12 m-16" src="./ledger-logo.svg" />
            </Link>
          </motion.div>

          <motion.div variants={signupVariants}>
            <input className="w-full py-4 px-8 my-2 rounded-full border-solid border-white border-2 bg-black text-base font-light" placeholder="Username" name="username" value={signinUp.username} onChange={handleSignup} />
          </motion.div>
          <motion.div variants={signupVariants}>
            <input className="w-full py-4 px-8 my-2 rounded-full border-solid border-white border-2 bg-black text-base font-light" placeholder="Email" name="email" value={signinUp.email} onChange={handleSignup} />
          </motion.div>
          <motion.div variants={signupVariants}>
            <input className="w-full py-4 px-8 my-2 rounded-full border-solid border-white border-2 bg-black text-base font-light" placeholder="Password" type="password" name="password" value={signinUp.password} onChange={handleSignup} />
          </motion.div>

          <motion.div variants={signupVariants}>
            <div onClick={() => setClicked(true)}>

              { !clicked ?
                // Try this with map later
                <div className="flex justify-between" >
                  {notClickedCurrencies}
                </div>
                :
                <div className="flex justify-between" >
                  {clickedCurrencies}
                </div>
              }
            </div>
          </motion.div>

          { error && <p className="text-red-900 text-sm text-center">{signupError}</p>}

          <motion.div variants={signupVariants} className="block mt-4 w-full gradient-cta p-4 rounded-full bg-origin-border solid border-2 border-transparent" onClick={signUp} >
              <h3 className="text-center uppercase font-bold text-base">Create Account</h3>
          </motion.div>

        </div>

      </motion.div>
  )

}

export default Signup
