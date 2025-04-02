import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react"
import { useEffect } from "react";

const updateApiToken = (token:string | null) => {
    if(token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization']
    }

}

const AuthProvider =  () => {
    const {getToken, userId} = useAuth();
    const {loading, setLoading} = useState(true);

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
        <div className="">
            
        </div>
    )
    
}

export default AuthProvider