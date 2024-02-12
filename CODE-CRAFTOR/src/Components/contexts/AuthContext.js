import React from 'react';
const AuthContext = React.createContext()
import {auth} from '../../firebase/firebaseconfig'

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [currentUser,setcurrentUser] = useState()
    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password)
    }
    auth.onAuthStateChange(user =>{
        setcurrentUser(user)
    })
    
    const value ={
    currentUser
}

}
