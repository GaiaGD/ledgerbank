import { useState, useContext, useEffect } from "react"
import { UserContext } from "../UserContext"
import { Link, useNavigate } from "react-router-dom"

function Signup() {

  const {signinUp, userLogged, handleSignup, currency, getCurrency, signUp, signupError, cleanSignupError} = useContext(UserContext)
  const [error, setError] = useState(false)
  let navigate = useNavigate()

  const [clicked, setClicked] = useState(false)
  // this means that once the whole div is clicked, we have a currency stored in state

  let notSelected = { opacity: "30%" }
  let selected = { opacity: "100%" }


  // making sure it doesn't load previous mistakes if i refresh the page or visit it again
  useEffect(() => {
    cleanSignupError()
  }, [])

  // every time i click on signup (function from usecontext) the content of userLogged changes so it triggers useEffect, and allows the user to go to checkingbalance that is a private route, only accessible if userLogged is populated
  useEffect(() => {
    if (userLogged !== null){
      cleanSignupError()
      return navigate('/checkingBalance')
    }
  }, [userLogged])

  // every time i click on signup (function from usecontext) if i receive an error, it saves it in a state, so it triggers useEffect that shows the error 
  useEffect(() => {
    if (signupError !== ''){
      setError(true)
    }
  }, [signupError])



  return (
    
      <div className="flex items-center justify-center h-screen">
        <div className="md:w-1/3 w-full">
          <Link to="/">
            <img className="object-contain mx-auto w-1/12 m-16" src="src/assets/ledger-logo.svg" />
          </Link>

          <div className="">
            <input className="w-full py-4 px-8 my-2 rounded-full border-solid border-white border-2 bg-black text-base font-light" placeholder="Username" name="username" value={signinUp.username} onChange={handleSignup} />
          </div>
          <div className="">
            <input className="w-full py-4 px-8 my-2 rounded-full border-solid border-white border-2 bg-black text-base font-light" placeholder="Email" name="email" value={signinUp.email} onChange={handleSignup} />
          </div>
          <div>
            <input className="w-full py-4 px-8 my-2 rounded-full border-solid border-white border-2 bg-black text-base font-light" placeholder="Password" type="password" name="password" value={signinUp.password} onChange={handleSignup} />
          </div>

          <div onClick={() => setClicked(true)}>

            { !clicked ?
              // Try this with map later
              <div className="flex justify-between" >
                <div className="py-4 px-6 my-2 rounded-full border-solid border-white border-2 bg-black text-base" onClick={getCurrency} id="$" name="$" > $ </div>
                <div className="py-4 px-6 my-2 rounded-full border-solid border-white border-2 bg-black text-base" onClick={getCurrency} id="€" name="€" > € </div>
                <div className="py-4 px-6 my-2 rounded-full border-solid border-white border-2 bg-black text-base" onClick={getCurrency} id="£" name="£" > £ </div>
                <div className="py-4 px-6 my-2 rounded-full border-solid border-white border-2 bg-black text-base" onClick={getCurrency} id="¥" name="¥" > ¥ </div>
              </div>
              :
              <div className="flex justify-between" >
                <div style={ currency === "$" ? selected : notSelected } className="py-4 px-6 my-2 rounded-full border-solid border-white border-2 bg-black text-base" onClick={getCurrency} id="$" name="$" > $ </div>
                <div style={ currency === "€" ? selected : notSelected } className="py-4 px-6 my-2 rounded-full border-solid border-white border-2 bg-black text-base" onClick={getCurrency} id="€" name="€" > € </div>
                <div style={ currency === "£" ? selected : notSelected } className="py-4 px-6 my-2 rounded-full border-solid border-white border-2 bg-black text-base" onClick={getCurrency} id="£" name="£" > £ </div>
                <div style={ currency === "¥" ? selected : notSelected } className="py-4 px-6 my-2 rounded-full border-solid border-white border-2 bg-black text-base" onClick={getCurrency} id="¥" name="¥" > ¥ </div>
              </div>
            }

          </div>
          { error && <p className="text-red-900 text-sm text-center">{signupError}</p>}

            <div className=" block mt-4 w-full gradient-cta p-4 rounded-full bg-origin-border solid border-2 border-transparent" onClick={signUp} >
              <h3 className="text-center uppercase font-bold text-base">Create Account</h3>
            </div>

        </div>
      </div>

    </>
  )

}

export default Signup
