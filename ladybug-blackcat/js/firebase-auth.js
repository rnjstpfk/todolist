
// Firebase 인증 모듈
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-DFaNr6gtfCy_LeqfQv4oEaY4JfeB-dg",
  authDomain: "ladybug-blackcat.firebaseapp.com",
  projectId: "ladybug-blackcat",
  storageBucket: "ladybug-blackcat.appspot.com",
  messagingSenderId: "682976762246",
  appId: "1:682976762246:web:3b15cef586bbe0cd8d3407",
  measurementId: "G-X7C6J6KN2Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export function onUserChanged(callback) {
  return onAuthStateChanged(auth, callback);
}

export function getCurrentUser() {
  return auth.currentUser;
} 