import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import app from '../firebase'
import { collection, addDoc, getDoc, setDoc, doc } from "firebase/firestore"; 
import store from '../store'


const db = getFirestore(app)
const auth = getAuth(app)


const userRef = collection(db, 'users') 


export const signUpUser = (email, password, name) => {

    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password).then(credentials => {
            const user = credentials.user

            setDoc(doc(userRef, user.uid), {
                name
            }).then(() => {

                resolve({ username: name, uid: user.uid })

            }).catch(error => reject(error))
            
        }).catch(error => reject(error))

    })
    
}

export const loginUser = (email, password) => {

    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password).then(credentials => {
            const user = credentials.user

            getDoc(doc(userRef, user.uid)).then(doc => {
                if (doc.exists()) {
                    const data = doc.data()
                    resolve({...data, uid: user.uid})
                }
                else {
                    console.log("No such document!");
                    reject('')
                }
                

            }).catch(error => reject(error))
            
        }).catch(error => reject(error))

    })
}

export const logoutUser = () => {
    return new Promise((resolve, reject) => {
        signOut(auth).then(() => {
            resolve()
        }).catch(error => reject(error))
    })
}