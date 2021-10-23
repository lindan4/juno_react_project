import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setLoginStatus, setUserInfo } from "../redux/UserSlice";
import { getFirestore } from "firebase/firestore";
import app from '../firebase'
import { collection, addDoc, getDoc, setDoc, doc } from "firebase/firestore"; 
import store from '../store'


const db = getFirestore(app)
const auth = getAuth(app)


export const signUpUser = (email, password, name) => {

    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password).then(credentials => {
            const user = credentials.user

            setDoc(doc(db, 'users', user.uid), {
                name
            }).then(() => {
                store.dispatch(setLoginStatus(true))
                store.dispatch(setUserInfo({ name, uid: user.uid }))

                resolve()

            }).catch(error => reject(error))
            
        }).catch(error => reject(error))

    })
    
}

export const loginUser = (email, password) => {

    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password).then(credentials => {
            const user = credentials.user

            getDoc(doc(db, 'users'), user.uid).then(doc => {
                if (doc.exists) {
                    const data = doc.data()
                    console.log("Document data:", data);
                    store.dispatch(setLoginStatus(true))
                    store.dispatch(setUserInfo(data))
                    resolve()
                }
                else {
                    console.log("No such document!");
                }
                

            }).catch(error => reject(error))
            
        }).catch(error => reject(error))

    })
    

}