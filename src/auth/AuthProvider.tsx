import { useContext, createContext, useState, useEffect } from "react";
import { AuthResponse } from "../types/types";

interface AuthProviderProps{
    children: React.ReactNode;
}

const AuthContext = createContext({
    isAuthenticated: false,
    getAccesToken: () => {},
    saveUser: (userData: AuthResponse) => {}
});

export function AuthProvider({children}: AuthProviderProps){
    const [isAuthenticated, setIsAuthenticated] = useState (false);
    const [accesToken, setAccessToken] = useState<String>("");

    function getAccesToken(){
        return accesToken
    }

    function saveUser(userData: AuthResponse){
        setAccessToken(userData.token);
        
        localStorage.setItem("token",JSON.stringify(userData.token))
        setIsAuthenticated(true);
    }
 
    return (
    <AuthContext.Provider value = {{isAuthenticated, getAccesToken, saveUser}}>
        {children}
    </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);