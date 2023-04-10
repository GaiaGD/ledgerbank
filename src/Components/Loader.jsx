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
                <div className="absolute z-20">
                    <div className="w-screen h-screen bg-black">
                        <div className='h-1/6'>
                        </div>
                        <div className='h-2/6 flex'>
                            <img className="mx-auto w-1/6 animate-pulse" src="./ledger-logo.svg" />
                        </div>
                        <div className='h-3/6 flex'>
                            <div className='star w-3/6'></div>
                            <div className='loader w-3/6'></div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Loader