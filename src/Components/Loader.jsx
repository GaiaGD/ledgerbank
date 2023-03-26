import React, { useState, useEffect } from 'react'

function Loader (){
    const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
        let element = document.getElementById("fadeIt");
        element.classList.add("fadeOut");
        element.classList.add("animated");
    }, 2000)

    setTimeout(() => {
        setLoading(false)
    }, 3000)
  }, [])

  return (
    <>
        { loading &&
            <div className="relative" id="fadeIt">
                <div className="absolute h-screen bg-black flex items-center">
                    <img className="mx-auto w-1/6 m-16 animate-pulse" src="./ledger-logo.svg" />
                </div>
            </div>
        }
    </>
  )
}

export default Loader;