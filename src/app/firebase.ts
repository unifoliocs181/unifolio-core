// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GithubAuthProvider,
  fetchSignInMethodsForEmail,
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBlgaq9zvVnb9fiP-febmSwRF4fr-X-Iss',
  authDomain: 'unifolio-d3ea7.firebaseapp.com',
  projectId: 'unifolio-d3ea7',
  storageBucket: 'unifolio-d3ea7.firebasestorage.app',
  messagingSenderId: '36799425249',
  appId: '1:36799425249:web:b479e98b91aae1fb3825a0',
  measurementId: 'G-K58374Z4SM',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const githubProvider = new GithubAuthProvider()

// Request user's profile information including name
githubProvider.addScope('user:email')
githubProvider.addScope('read:user')

// User data interface
export interface UserData {
  uid: string
  email: string
  fullName: string
  signInMethod: string
  agreeToTerms: boolean
  createdAt: string
  lastSignIn: string
}

// Save user data to Firestore
export const saveUserToDatabase = async (userData: UserData) => {
  try {
    const userRef = doc(db, 'users', userData.uid)
    await setDoc(userRef, userData, { merge: true })
    console.log('User data saved successfully')
  } catch (error) {
    console.error('Error saving user data:', error)
    throw error
  }
}

// Get user data from Firestore
export const getUserFromDatabase = async (uid: string) => {
  try {
    const userRef = doc(db, 'users', uid)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      return userSnap.data() as UserData
    } else {
      return null
    }
  } catch (error) {
    console.error('Error getting user data:', error)
    throw error
  }
}

// Check if an email is already registered
export const checkEmailExists = async (email: string) => {
  try {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email)
    return signInMethods.length > 0 ? signInMethods : null
  } catch (error) {
    console.error('Error checking email:', error)
    return null
  }
}

// Delete user data from Firestore
export const deleteUserFromDatabase = async (uid: string) => {
  try {
    const userRef = doc(db, 'users', uid)
    await deleteDoc(userRef)
    console.log('User data deleted successfully')
  } catch (error) {
    console.error('Error deleting user data:', error)
    throw error
  }
}
