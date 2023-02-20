import { useState, useContext } from "react"
import { UserContext } from "../UserContext"
import { Link } from "react-router-dom"
import InputAndInfo from "../Components/InputAndInfo"

function SavingBalance() {

    const {
        userLoggedData,
        depositSaving,
        withdrawSaving,
        handleDepositSaving,
        depositToSaving,
        handleWithdrawSaving,
        withdrawFromSaving,
        handleSendToChecking,
        sendingToChecking,
        sendToChecking,
        logOut
    } = useContext(UserContext)
    
    // filter checking transactions only (and reverse the order chronologically)
    const dataAsArray = Object.entries(userLoggedData)
    let savingTransactionsHistoryArray = (dataAsArray.filter(i => (i[1][0] === "transaction-checking" || i[1][0] === "transaction-ToSaving" || i[1][0] === "transaction-ToChecking"))).reverse()

    let savingTransactionsHistory = savingTransactionsHistoryArray.map(transaction => {
        // fix date
        let transactionDate = (transaction[0]).substring(4,15)
        let transactionHour = (transaction[0]).substring(16,21)

        return (
            <div key={transaction[0]} className="w-full border-b-2 border-slate-600 py-4">
                <div className="flex justify-between">
                    <p className="font-light text-sm">{transactionDate}</p>
                    <p className="font-light text-sm">{transactionHour}</p>
                </div>
                <div className="flex justify-between">
                    <h2 className="font-semibold">{transaction[1][1]}</h2>
                    <h2 className="font-semibold">{transaction[1][2]}{userLoggedData.currency}</h2>
                </div>
            </div>
        )
    })


    return (
        <>
            <div className="flex items-center justify-center">
                <div className="md:w-1/3 w-full">
                    <Link to="/">
                        <img className="object-contain mx-auto w-1/12 m-16" src="src/assets/ledger-logo.svg" />
                    </Link>
                    <h2 className="capitalize text-4xl text-center">Hello {userLoggedData.username}</h2>

                    <div className="my-4 w-full gradient-cta p-2 rounded-full bg-origin-border solid border-4 border-transparent flex justify-between">
                        <div className="p-2 rounded-full w-3/6">
                            <Link to="/checkingBalance">
                                <h3 className="uppercase text-base text-center">CHECKING</h3>
                            </Link>
                        </div>
                        <div className="bg-white p-2 text-black p-2 rounded-full w-3/6">
                            <Link to="/savingBalance">
                                <h3 className="uppercase text-base text-center">SAVING</h3>
                            </Link>
                        </div>
                    </div>

                    <div className="pt-16 pb-4">
                        <h1 className="capitalize text-6xl text-center">{userLoggedData.savingBalance}{userLoggedData.currency}</h1>
                    </div>

                    <div className="bg-white text-black p-2 rounded-full md:w-3/6 w-full mx-auto">
                        <h3 className="uppercase text-base text-center">TOTAL BALANCE</h3>
                    </div>

                    <div className="flex justify-between my-4">

                        <InputAndInfo
                            currency={userLoggedData.currency}
                            buttonCopy= "DEPOSIT"
                            valueAmount={depositSaving.amount}
                            valueInfo={depositSaving.info}
                            onChange={handleDepositSaving}
                            onClick={depositToSaving}
                        />

                        <InputAndInfo
                            currency={userLoggedData.currency}
                            buttonCopy= "WITHDRAW"
                            valueAmount={withdrawSaving.amount}
                            valueInfo={withdrawSaving.info}
                            onChange={handleWithdrawSaving}
                            onClick={withdrawFromSaving}
                        />

                    </div>

                    <div className="flex justify-between my-4">
                        <div className="mr-2 rounded-[40px] border-solid border-white border-4 bg-black w-full flex">
                            <input className="w-full text-base bg-transparent p-2 pr-0 text-white outline-none text-right" placeholder="0" type="number" value={sendingToChecking} onChange={handleSendToChecking} />
                            <span className="p-2 pt-[1.4rem]">{userLoggedData.currency}</span>
                            <button className="w-full gradient-cta p-4 rounded-full bg-origin-border solid border-4 border-transparent" onClick={sendToChecking}>
                                <h3 className="uppercase font-bold text-base">To checking</h3>
                            </button>
                        </div>
                    </div>
                    <div className="bg-white text-black p-2 mt-16 mb-8 rounded-full md:w-4/6 w-full mx-auto">
                         <h3 className="uppercase text-base text-center">TRANSACTION HISTORY</h3>
                    </div>
                    <div className="flex justify-between">
                        <div className="w-full mb-8">
                            {savingTransactionsHistory}
                        </div>
                    </div>

                </div>
            </div>
        </>)
}

export default SavingBalance
