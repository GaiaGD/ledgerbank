import React, { useState, useEffect, useContext } from "react"
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
    // saving transactions
    const [depositSaving, setDepositSaving] = useState(0)
    const [withdrawSaving, setwithdrawSaving] = useState(0)

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
            let fieldsData = {username: signinUp.username, email: signinUp.email, password: signinUp.password, currency: currency, creditBalance: 100, checkingBalance: 100}
            
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


    const depositToChecking = async () => {
        const auth = getAuth()
        const user = auth.currentUser

        // creating the new balance of current checking amount
        let totalPlusDeposit = parseInt(userLoggedData.checkingBalance) + parseInt(depositChecking.amount)

        // pushing it in the db
        const userRef = doc(db, "users", user.uid)
        await updateDoc(userRef, { checkingBalance: parseFloat(totalPlusDeposit) , [timestamp]: [ "transaction-checking", depositChecking.info, depositChecking.amount] })

        // now the useEffect and OnSnaposhot will refresh the userLoggedData
    }

    const withdrawFromChecking = async () => {
        const auth = getAuth()
        const user = auth.currentUser
        // creating the new balance of current checking amount

        let totalLessWithdraw = parseInt(userLoggedData.checkingBalance) - parseInt(withdrawChecking.amount)
        console.log(totalLessWithdraw)

        // pushing it in the db
        const userRef = doc(db, "users", user.uid)
        await updateDoc(userRef, { checkingBalance: parseFloat(totalLessWithdraw) , [timestamp]: [ "transaction-checking", withdrawChecking.info, withdrawChecking.amount] })

        // now the useEffect and OnSnaposhot will refresh the userLoggedData
    }

    function sendToSaving(){
        console.log("sendToSaving")
    }

// _______________________________________________________________

    const logOut = async () => {
        await signOut(auth)
        setSigninUp({username: "", email: "", password: "", currency: ""})
        setLoggingIn({email: "", password: ""})
    }
// _______________________________________________________________

    return (
        <UserContext.Provider value={{signinUp, currency, loggingIn, userLogged, userLoggedData, depositChecking, withdrawChecking, depositSaving, withdrawSaving, handleSignup, getCurrency, handleLogin, signUp, logIn, logOut, handleDepositChecking, handleWithdrawChecking, depositToChecking, withdrawFromChecking, sendToSaving }}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContextProvider, UserContext}