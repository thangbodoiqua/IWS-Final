import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react"
import { useState, useEffect } from "react";
import { Loader } from 'lucide-react';


const updateApiToken = (token:string | null) => {
    if(token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization']
    }

}

const AuthProvider =  ({children} : {children: React.ReactNode}) => {
    const {getToken, userId} = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken();
                updateApiToken(token);

                
            } catch (error:any) {
                updateApiToken(null);
                console.log("error in AuthProvider", error)
            }finally{
                setLoading(false);
            }
        }

        initAuth();
    }, [getToken])
    if(loading) return(
        <div className="h-screen w-screen flex items-center justify-center">   
            <Loader className="size-8 text-emerald-500 animate-spin"></Loader>
        </div>
    )
    return <>{children}</>
    
}

export default AuthProvider