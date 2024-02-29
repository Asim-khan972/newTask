import { useState } from "react";

import { useAuthContext } from "./useAuthContext";

export default function  LoginHook(){
    const [error,setError]=useState(null)
    const[isLoading, setIsLoading]=useState(null)
    const[success,setSuccess]=useState(null)

    const {dispatch}=useAuthContext()

    
    const UseLogin=async(email,password)=>{

        setIsLoading(true)
        setError(null)
        setSuccess(null)
        const response=await fetch('/auth/user/login', {
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({email, password})
        })

        const json=await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.message)
        setSuccess(null)

        }

        if(response.ok){
        setSuccess(json.message)

            // save the user to the local Storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth Context
            dispatch({type: 'LOGIN', payload:json})
            setIsLoading(false)
        }
}

return {UseLogin, isLoading, error,success}
}