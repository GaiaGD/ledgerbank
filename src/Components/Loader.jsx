import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from "../UserContext"

function Loader (){
    const {firstLoad, onlyLoadOnce} = useContext(UserContext)

    useEffect(() => {
        console.log("load")
        setTimeout(() => {
            onlyLoadOnce()
        }, "3000")
    }, [])

    console.log(firstLoad)

    return (
        <>
            { firstLoad &&
                <div className="h-screen bg-black flex items-center">
                    <img className="mx-auto w-1/6 m-16 animate-pulse" src="./ledger-logo.svg" />
                </div>
            }
        </>
    )
}

export default Loader