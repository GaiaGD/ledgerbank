import React, { useState, useEffect, useContext } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"
import { auth, db } from "./utils/firebase-config"
import { getAuth } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, onSnapshot, collection } from "firebase/firestore"; 
// import { async } from "@firebase/util";


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

    // data of the user passed around the app
    const [userLoggedData, setUserLoggedData] = useState({})

    // errors
    const [loginError, setLoginError] = useState('')
    const [signupError, setSignupError] = useState('')

    // test
    const [firstLoad, setFirstLoad] = useState(true)

// _______________________________________________________________

function onlyLoadOnce(){
    setFirstLoad(false)
}

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
        console.log(signinUp.username)
        console.log(currency)
        
            try {
                    // BLOCK TRY IF USERNAME AND CURRENCY ARE MISSING
                    if(signinUp.username !== "" && currency !== "none"){
                        const user = await createUserWithEmailAndPassword(auth, signinUp.email, signinUp.password)
                        // storing the user info when signing up
                        let fieldsData = {username: signinUp.username, email: signinUp.email, password: signinUp.password, currency: currency, savingBalance: 100, checkingBalance: 100}
                        console.log(fieldsData)
                        // MORE DATA TO BE ADDED FOR THEMES & BALANCES
                        await setDoc(doc(db, "users", user.user.uid), fieldsData)
                                    
                        // this data will be shared around all the pages and can be edited and resubmitted to db
                        setUserLoggedData(fieldsData)
                    }
                    else if (signinUp.username === "" && currency === "none") {
                        setSignupError("Please fill in all the fields")
                    }
                    else if (currency === "none") {
                        setSignupError("Please select your currency")
                    }
                    else if (signinUp.username === "") {
                        setSignupError("Please enter a username")
                    }
            } 

        catch (error){
            console.log(error.message)
            if(error.message === "Firebase: Error (auth/email-already-in-use)."){
                setSignupError("Email already in use")
            } else if (error.message === "Firebase: Error (auth/invalid-email)."){
                setSignupError("You've entered an invalid email address")
            } else if (error.message === "Firebase: Password should be at least 6 characters (auth/weak-password)."){
                setSignupError('Password should be at least 6 characters')
            } else {
                setSignupError(error.message)
            }
            // COMMENTED DOWN BECAUSE: for now, if "Invalid email or password", the form doesn't reset
            // setSigninUp({username: "", email: "", password: "", currency: ""})
        }
    }

    const logIn = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loggingIn.email, loggingIn.password)
            // matching user logged with user in db and all the data linked to him
            const docRef = doc(db, "users", user.user.uid)
            const docSnap = await getDoc(docRef)
        
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data())
            } else {
            // doc.data() will be undefined in this case
                console.log("No such data!")
            }
            setLoginError('')

        } catch (error){
            console.log(error.message)
            setLoginError("Invalid email or password")
            
            // COMMENTED DOWN BECAUSE: for now, if "Invalid email or password", the form doesn't reset
            // setLoggingIn({email: "", password: ""})
        }
    }

    function cleanLoginError(){
        setLoginError('')
    }

    function cleanSignupError(){
        setSignupError('')
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
            let totalPlusDeposit = parseFloat(userLoggedData.checkingBalance) + parseFloat(depositChecking.amount)
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
            let totalPlusDeposit = parseFloat(userLoggedData.savingBalance) + parseFloat(depositSaving.amount)
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
            let totalLessWithdraw = parseFloat(userLoggedData.checkingBalance) - parseFloat(withdrawChecking.amount)
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
            let totalLessWithdraw = parseFloat(userLoggedData.savingBalance) - parseFloat(withdrawSaving.amount)
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
            let totalLessSentToSaving = parseFloat(userLoggedData.checkingBalance) - parseFloat(sendingToSaving)
            let newSavingBalance = parseFloat(userLoggedData.savingBalance) + parseFloat(sendingToSaving)

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
            let totalLessSentToChecking = parseFloat(userLoggedData.savingBalance) - parseFloat(sendingToChecking)
            let newCheckingBalance = parseFloat(userLoggedData.checkingBalance) + parseFloat(sendingToChecking)

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
        setCurrency("none")
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
        sendToChecking,

        loginError,
        signupError,
        cleanLoginError,
        cleanSignupError,

        firstLoad,
        onlyLoadOnce
        
        }}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContextProvider, UserContext}