// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
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
