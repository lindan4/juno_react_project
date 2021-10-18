import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setLoginStatus, setUserInfo } from "../redux/UserSlice";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 



const db = getFirestore()
const auth = getAuth()


export const signUpUser = (email, password) => {



    createUserWithEmailAndPassword(auth, email, password).then(credentials => {
        const user = userCredential.user;

        useDispatch(setLoginStatus(true))

    

    }).catch(error => {

    })
    
    
}