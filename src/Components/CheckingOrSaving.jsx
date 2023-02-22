import { useState } from "react"
import { Link } from "react-router-dom"

function CheckingOrSaving(props){

    const [selectedAccount, setSelectedAccount] = useState(props.selected)
    
    function selectThisAccount(){
        setSelectedAccount(event.target.innerHTML)
    }

    let selectedStyle = {
        backgroundColor: "#FFFFFF",
        color: "#000000",
    }

    let notSelectedStyle = {
        backgroundColor: "#000000",
        color: "#ffffff",
    }


    return (
        <div className="my-4 w-full gradient-cta p-2 rounded-full bg-origin-border solid border-2 border-transparent flex justify-between">

            <div className="p-2 rounded-full w-3/6" style={selectedAccount == 'CHECKING' ? selectedStyle : notSelectedStyle } onClick={selectThisAccount} >
                <Link to="/checkingBalance" >
                    <h3 className="uppercase text-base text-center">CHECKING</h3>
                </Link>
            </div>

            <div className="p-2 rounded-full w-3/6" style={selectedAccount == 'SAVING' ? selectedStyle : notSelectedStyle } onClick={selectThisAccount} >
                <Link to="/savingBalance" >
                    <h3 className="uppercase text-base text-center">SAVING</h3>
                </Link>
            </div>
        </div>
    )
}

export default CheckingOrSaving