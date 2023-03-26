import { Link } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import { UserContext } from "../UserContext"
import CheckingOrSaving from "../Components/CheckingOrSaving"
import Loader from "../Components/Loader"
import { motion } from "framer-motion"

function Intro() {
  const {userLogged, userLoggedData, logOut} = useContext(UserContext)

  const introVariants = {
    initial: { opacity: 0, translateX: 200 },
    animate: { opacity: 1,
      translateX: 0,
      transition: { staggerChildren: 0.1, duration: 0.8 },
    }
  }

    return (

        <div>
            {/* <Loader /> */}

            <div className="flex items-center justify-center h-screen">
              <div className="md:w-1/3 w-full">           

              {userLogged

                ?
                  <motion.div variants={introVariants} initial="initial" animate="animate">
                    
                    <motion.div variants={introVariants} className="">
                      <img className="object-contain mx-auto w-2/3 m-16" src="./ledger-logotype.svg" />
                    </motion.div>

                    <motion.div variants={introVariants} className="text-center">
                      <h2 className="capitalize text-4xl">Hello {userLoggedData.username}</h2>
                      <h3 className="mt-16 mb-4 mx-[25%]">What account would you like to view?</h3>
                    </motion.div>

                    <motion.div variants={introVariants}>
                      <CheckingOrSaving selected={""} />
                    </motion.div>

                    <motion.div variants={introVariants} className="my-16">
                      <h2 className="underline underline-offset-4 text-center" onClick={logOut}>Log out</h2>
                    </motion.div>
                    
                  </motion.div>
                :
                  <motion.div variants={introVariants} initial="initial" animate="animate">

                    <motion.div  variants={introVariants}>
                      <img className="object-contain mx-auto w-2/3 m-16" src="./ledger-logotype.svg" />
                    </motion.div>

                    <motion.div  variants={introVariants}>
                      <Link to="/ledgerbank/signup">
                        <button className="my-2 w-full gradient-cta p-4 rounded-full bg-origin-border solid border-2 border-transparent" >
                          <h3 className="uppercase font-bold text-base">Create Account</h3>
                        </button>
                      </Link>
                    </motion.div>

                    <motion.div  variants={introVariants}>
                      <Link to="/ledgerbank/login">
                        <button className="my-2 w-full gradient-cta p-4 rounded-full bg-origin-border solid border-2 border-transparent" >
                          <h3 className="uppercase font-bold text-base">Login</h3>
                        </button>
                      </Link>
                    </motion.div>

                  </motion.div>

              }
              </div>
            </div>


        </div>
  )

}

export default Intro
