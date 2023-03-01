import { useState, useContext } from "react"
import { UserContext } from "../UserContext"
import { Link } from "react-router-dom"

function Signup() {

  const {signinUp, userLogged, handleSignup, currency, getCurrency, signUp, logOut} = useContext(UserContext)
  const [clicked, setClicked] = useState(false)
  // this means that once the whole div is clicked, we have a currency stored in state

  let notSelected = { opacity: "30%" }
  let selected = { opacity: "100%" }

  return (
    <>
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

          <Link to="/checkingBalance" className=" block my-2 w-full gradient-cta p-4 rounded-full bg-origin-border solid border-2 border-transparent" onClick={signUp} >
            <h3 className="text-center uppercase font-bold text-base">Create Account</h3>
          </Link>

      </div>

    </div>

    </>
  )

}

export default Signup
