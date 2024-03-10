/** @format */
import {  getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 
import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyCqa_Nmn5_J8YwtT6gT66_rnebDCm3ViU8",
	authDomain: "code--craftor.firebaseapp.com",
	projectId: "code--craftor",
	storageBucket: "code--craftor.appspot.com",
	messagingSenderId: "900648191521",
	appId: "1:900648191521:web:c71f51f563263e0e43c560",
	measurementId: "G-MEEZ55LCSC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);




 