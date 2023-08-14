import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCiFijAY4UC_0tnLI66OxTtKViLSMY1UsM',
  authDomain: 'fir-tutorial-6b63b.firebaseapp.com',
  projectId: 'fir-tutorial-6b63b',
  storageBucket: 'fir-tutorial-6b63b.appspot.com',
  messagingSenderId: '168152357813',
  appId: '1:168152357813:web:40e8d9b713432017df17fc',
  measurementId: 'G-DVWZNJK3WL',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app);
export const storage = getStorage(app);