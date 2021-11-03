import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { getFirestore, collection, setDoc, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { PASSWORD_CHANGE_ERROR, PASSWORD_CHANGE_SUCCESS, PASSWORD_MISMATCH, INVALID_CREDENTIALS, NAME_CHANGE_SUCCESS, NAME_CHANGE_ERROR, PASSWORDS_SAME } from "../Constants";
import app from '../firebase'


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

export const updateFBName = (newName) => {

    return new Promise((resolve, reject) => {

        const userId = auth.currentUser.uid

        const userDoc = doc(userRef, userId)
        

        updateDoc(userDoc, {
            name: newName
        }).then(() => {
            resolve(NAME_CHANGE_SUCCESS)
        }).catch(() => {
            reject(NAME_CHANGE_ERROR)
        })

    })

}


export const updateFBPassword = (currentPassword, newPassword) => {

    let currentUser = auth.currentUser
    let credentials = EmailAuthProvider.credential(currentUser.email, currentPassword)

    return new Promise((resolve, reject) => {
        reauthenticateWithCredential(currentUser, credentials).then(() => {
            if (currentPassword !== newPassword) {
                updatePassword(currentUser, newPassword).then(() => {
                    resolve(PASSWORD_CHANGE_SUCCESS)
                }).catch(() => reject(PASSWORD_CHANGE_ERROR))

            }
            else {
                reject(PASSWORDS_SAME)
            }
    
        }).catch(() => {
            reject(INVALID_CREDENTIALS)
        })

    })
    
    

}