import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDoc, setDoc, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import app from '../firebase'
import store from '../store'


const db = getFirestore(app)
const auth = getAuth(app)


const userRef = collection(db, 'users') 

export const addToFavouriteFBStore = (id) => {

    const userId = auth.currentUser.uid

    return new Promise((resolve, reject) => {

        updateDoc(doc(userRef, userId), {
            favourites: arrayUnion(id)
        }).then(() => resolve()).catch(error => reject(error))

    })
    

}

export const removeFromFavouriteFBStore = (id) => {

    return new Promise((resolve, reject) => {

        const userId = auth.currentUser.uid


        updateDoc(doc(userRef, userId), {
            favourites: arrayRemove(id)
        }).then(() => resolve()).catch(error => reject(error))

    })

}

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
            resolve(credentials) 
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