import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
export default function SignupHook() {
    // const navigate=useNavigate()
    const [isLoading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    const [success,setSuccess]=useState(null)
    const navigate=useNavigate()
    // fetching api end-point to register a new seller
    const userSignup=async( email, password)=>{
        setLoading(true)
        setSuccess(false)
        debugger
            try {
                const response=await fetch('/auth/user/signup',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({ email, password})
                })
        
                const json=await response.json()
                if(!response.ok){
                    setLoading(false)
                    setError(json.message)
                    
                    setSuccess(false)
                }
                if(response.ok){
                    setLoading(false)
                    setError(null)
                   
                    setSuccess(json.message)
                    
                    setTimeout(() => {
                navigate('/login')
                        
                    }, 2000);
                }
               } catch (error) {
                console.log(error)
                setError('Server is not responding')
            setLoading(false)

               }
        
        

       
    }
  return {isLoading,error,success,userSignup}
}
