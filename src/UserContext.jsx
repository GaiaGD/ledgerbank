import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"
import { auth, db } from "./utils/firebase-config"
import { getAuth } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, onSnapshot, collection } from "firebase/firestore"; 
import { async } from "@firebase/util";


const UserContext = React.createContext()

function UserContextProvider({children}) {

// STATES
// _______________________________________________________________
    // data collected on the signup
    const [signinUp, setSigninUp] = useState({username: "", email: "", password: ""})
    const [currency, setCurrency] = useState("none")

    // data collected on login
    const [loggingIn, setLoggingIn] = useState({email: "", password: ""})
    const [userLogged, setUserLogged] = useState({})

    // checking transactions
    const [depositChecking, setDepositChecking] = useState({amount: "", info: ""})
    const [withdrawChecking, setWithdrawChecking] = useState({amount: "", info: ""})
    const [sendingToSaving, setSendingToSaving] = useState("")

    // saving transactions
    const [depositSaving, setDepositSaving] = useState({amount: "", info: ""})
    const [withdrawSaving, setWithdrawSaving] = useState({amount: "", info: ""})
    const [sendingToChecking, setSendingToChecking] = useState("")

    // data passed around the app
    const [userLoggedData, setUserLoggedData] = useState({})

// _______________________________________________________________


// timestamps for transactions:

    let dateRaw = new Date()
    let date = dateRaw.toString()
    let timestamp = date.replace(/-/g, ' ')



    // this checks that everytime the app loads, if no one is logged in, the current user is null, but if someone logs in, the current user will be automatically assigned to him
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUserLogged(currentUser)
            if (currentUser == null){
                setUserLoggedData({});
            } else {
                // link the current user to the one matching in the database and saves it in the shared data
                const matchUser = async () => {
                    const docRef = doc(db, "users", currentUser.uid)
                    const docSnap = await getDoc(docRef)
                    setUserLoggedData(docSnap.data())
                }
                matchUser()
            }
        })

    }, [])


    // use a useEffect that reloads the app everytime the document in the db changes
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {

            setUserLogged(currentUser)
            if (currentUser !== null){
                onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
                    setUserLoggedData(doc.data())
                })
            }

        })
    }, [])


    function handleSignup(event){
        setSigninUp(prevSigninUp => {
            return {
            ...prevSigninUp, [event.target.name]: event.target.value
            }
        })
    }

    function getCurrency(event){
        let selectedCurrency = event.target.id
        setCurrency(selectedCurrency)
    }

    function handleLogin(event){
        setLoggingIn(prevLoggingin => {
            return {
            ...prevLoggingin, [event.target.name]: event.target.value
            }
        })
    }

    const signUp = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, signinUp.email, signinUp.password)
            // storing the user info when signing up
            let fieldsData = {username: signinUp.username, email: signinUp.email, password: signinUp.password, currency: currency, savingBalance: 100, checkingBalance: 100}
            
            // this data will be shared around all the pages and can be edited and resubmitted to db
            setUserLoggedData(fieldsData)

            // MORE fields DATA TO BE ADDED FOR THEMES & BALANCES
            await setDoc(doc(db, "users", user.user.uid), fieldsData)

        } catch (error){
            console.log(error.message)
            setSigninUp({username: "", email: "", password: "", currency: ""})
        }
    }

    const logIn = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loggingIn.email, loggingIn.password)

            // matching user logged with user in db
            const docRef = doc(db, "users", user.user.uid)
            const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data())
        } else {
          // doc.data() will be undefined in this case
            console.log("No such data!")
        }

        } catch (error){
            console.log(error.message)
            setLoggingIn({email: "", password: ""})
        }
    }

    function handleDepositChecking(event){
        setDepositChecking(prevDepositChecking => {
            return {
            ...prevDepositChecking, [event.target.name]: event.target.value
            }
        })
    }

    function handleWithdrawChecking(event){
        setWithdrawChecking(prevWithdrawChecking => {
            return {
            ...prevWithdrawChecking, [event.target.name]: event.target.value
            }
        })
    }

    function handleDepositSaving(event){
        setDepositSaving(prevDepositSaving => {
            return {
            ...prevDepositSaving, [event.target.name]: event.target.value
            }
        })
    }

    function handleWithdrawSaving(event){
        setWithdrawSaving(prevWithdrawChecking => {
            return {
            ...prevWithdrawChecking, [event.target.name]: event.target.value
            }
        })
    }


    const depositToChecking = async () => {
        if(depositChecking.amount !== "" && depositChecking.info !== "" ){
            const auth = getAuth()
            const user = auth.currentUser
            // creating the new balance of current checking amount
            let totalPlusDeposit = parseInt(userLoggedData.checkingBalance) + parseInt(depositChecking.amount)
            // pushing it in the db
            const userRef = doc(db, "users", user.uid)
            await updateDoc(userRef, { checkingBalance: parseFloat(totalPlusDeposit) , [timestamp]: [ "transaction-checking", depositChecking.info, depositChecking.amount] })
            setDepositChecking({amount: "", info: ""})

        } else if (depositChecking.amount == "" && depositChecking.info !== "" ){
            alert("Enter amount")
        } else if (depositChecking.amount !== "" && depositChecking.info == "" ){
            alert("Enter deposit info")
        } else {
            alert("Enter amount and deposit info")
        }
        // now the useEffect and OnSnaposhot will refresh the userLoggedData
    }

    const depositToSaving = async () => {
        if(depositSaving.amount !== "" && depositSaving.info !== "" ){
            const auth = getAuth()
            const user = auth.currentUser
            // creating the new balance of current checking amount
            let totalPlusDeposit = parseInt(userLoggedData.savingBalance) + parseInt(depositSaving.amount)
            // pushing it in the db
            const userRef = doc(db, "users", user.uid)
            await updateDoc(userRef, { savingBalance: parseFloat(totalPlusDeposit) , [timestamp]: [ "transaction-saving", depositSaving.info, depositSaving.amount] })
            setDepositSaving({amount: "", info: ""})

        } else if (depositSaving.amount == "" && depositSaving.info !== "" ){
            alert("Enter amount")
        } else if (depositSaving.amount !== "" && depositSaving.info == "" ){
            alert("Enter deposit info")
        } else {
            alert("Enter amount and deposit info")
        }
        // now the useEffect and OnSnaposhot will refresh the userLoggedData
    }

    const withdrawFromChecking = async () => {
        if(withdrawChecking.amount !== "" && withdrawChecking.info !== "" ){
            const auth = getAuth()
            const user = auth.currentUser
            // creating the new balance of current checking amount
            let totalLessWithdraw = parseInt(userLoggedData.checkingBalance) - parseInt(withdrawChecking.amount)
            // pushing it in the db
            const userRef = doc(db, "users", user.uid)
            await updateDoc(userRef, { checkingBalance: parseFloat(totalLessWithdraw) , [timestamp]: [ "transaction-checking", withdrawChecking.info, withdrawChecking.amount] })
            setWithdrawChecking({amount: "", info: ""})

        } else if (withdrawChecking.amount == "" && withdrawChecking.info !== "" ){
            alert("Enter amount")
        } else if (withdrawChecking.amount !== "" && withdrawChecking.info == "" ){
            alert("Enter withdraw info")
        } else {
            alert("Enter amount and withdraw info")
        }
        // now the useEffect and OnSnaposhot will refresh the userLoggedData
    }

    const withdrawFromSaving = async () => {
        if(withdrawSaving.amount !== "" && withdrawSaving.info !== "" ){
            const auth = getAuth()
            const user = auth.currentUser
            // creating the new balance of current checking amount
            let totalLessWithdraw = parseInt(userLoggedData.savingBalance) - parseInt(withdrawSaving.amount)
            // pushing it in the db
            const userRef = doc(db, "users", user.uid)
            await updateDoc(userRef, { savingBalance: parseFloat(totalLessWithdraw) , [timestamp]: [ "transaction-saving", withdrawSaving.info, withdrawSaving.amount] })
            setWithdrawSaving({amount: "", info: ""})

        } else if (withdrawSaving.amount == "" && withdrawSaving.info !== "" ){
            alert("Enter amount")
        } else if (withdrawSaving.amount !== "" && withdrawSaving.info == "" ){
            alert("Enter withdraw info")
        } else {
            alert("Enter amount and withdraw info")
        }
        // now the useEffect and OnSnaposhot will refresh the userLoggedData
    }

    function handleSendToSaving(event){
        setSendingToSaving(event.target.value)
    }

    function handleSendToChecking(event){
        setSendingToChecking(event.target.value)
    }

    const sendToSaving = async () => {
        if(sendingToSaving !== ""){
            const auth = getAuth()
            const user = auth.currentUser
            // creating the new balance of current checking amount after subtracting what I want to send to saving
            let totalLessSentToSaving = parseInt(userLoggedData.checkingBalance) - parseInt(sendingToSaving)
            let newSavingBalance = parseInt(userLoggedData.savingBalance) + parseInt(sendingToSaving)

            const userRef = doc(db, "users", user.uid)
            await updateDoc(userRef, { checkingBalance: parseFloat(totalLessSentToSaving) , savingBalance: parseFloat(newSavingBalance), [timestamp]: [ "transaction-ToSaving", "Transfer to Saving Account", sendingToSaving] })

            setSendingToSaving("")
        } else {
            alert("Enter amount")
        }
    }

    const sendToChecking = async () => {
        if(sendingToChecking !== ""){
            const auth = getAuth()
            const user = auth.currentUser
            // creating the new balance of current saving amount after subtracting what I want to send to checking
            let totalLessSentToChecking = parseInt(userLoggedData.savingBalance) - parseInt(sendingToChecking)
            let newCheckingBalance = parseInt(userLoggedData.checkingBalance) + parseInt(sendingToChecking)

            const userRef = doc(db, "users", user.uid)
            await updateDoc(userRef, { savingBalance: parseFloat(totalLessSentToChecking) , checkingBalance: parseFloat(newCheckingBalance), [timestamp]: [ "transaction-ToChecking", "Transfer to Checking Account", sendingToChecking] })

            setSendingToChecking("")
        } else {
            alert("Enter amount")
        }
    }

// _______________________________________________________________

    const logOut = async () => {
        await signOut(auth)
        setSigninUp({username: "", email: "", password: "", currency: ""})
        setLoggingIn({email: "", password: ""})
    }

    function backHome (){
        console.log("back home")
        let navigate = useNavigate()
        navigate("/")
    }
// _______________________________________________________________

    return (
        <UserContext.Provider value={{signinUp,
        currency,
        loggingIn,
        userLogged,
        userLoggedData,
        depositChecking,
        withdrawChecking,
        sendingToSaving,
        sendingToChecking,
        depositSaving,
        withdrawSaving,
        handleSignup,
        getCurrency,
        handleLogin,
        signUp,
        logIn,
        logOut,
        backHome,

        handleDepositChecking,
        depositToChecking,
        handleWithdrawChecking,
        withdrawFromChecking,
        handleSendToSaving,
        sendToSaving,

        handleDepositSaving,
        depositToSaving,
        handleWithdrawSaving,
        withdrawFromSaving,
        handleSendToChecking,
        sendToChecking
        
        }}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContextProvider, UserContext}