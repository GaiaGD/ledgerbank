import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from "../UserContext"
import { AnimatePresence, motion } from "framer-motion"

function Loader (){
    const {firstLoad, onlyLoadOnce} = useContext(UserContext)

    useEffect(() => {
        // this only loads once opened in the tab. not even if refreshing
        setTimeout(() => {
            onlyLoadOnce()
        }, "3000")
    }, [])


    return (
        <>
            <AnimatePresence>
                { firstLoad &&
                    <motion.div key="modal" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>

                        <div className="absolute z-20">
                            <div className="w-screen h-screen bg-black">
                                <div className='h-1/6'>
                                </div>
                                <div className='h-1/6 flex'>
                                    <img className="mx-auto md:w-1/6 w-3/6" src="./ledger-logotype.svg" />
                                </div>
                                <div className='h-4/6 relative'>
                                    <div className='absolute inset-x-0 top-1/3 z-30'>
                                        <h2 className='text-center text-xl font-light'>Welcome</h2>
                                    </div>
                                    <div className='loaderBlue absolute bottom-0 left-0 h-5/6 w-full'></div>
                                    <div className='loaderPurple absolute bottom-0 right-0 h-full w-full'></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}

export default Loader