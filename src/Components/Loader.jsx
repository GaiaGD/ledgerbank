import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from "../UserContext"

function Loader (){
    const {firstLoad, onlyLoadOnce} = useContext(UserContext)

    useEffect(() => {
        // this only loads once opened in the tab. not even if refreshing
        setTimeout(() => {
            onlyLoadOnce()
        }, "30000")
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