// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'
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
