/** @format */

import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
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

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
	signInWithPopup(auth, provider)
	.then((result) => {
		const name = result.user.displayName;
		const email = result.user.email;
		const profile = result.user.photoURL;

		localStorage.setItem("name",name);
		localStorage.setItem("email", email);
		localStorage.setItem("profile", profile);

	})
	.catch((error)=>{
		console.log(error);
	});
};
