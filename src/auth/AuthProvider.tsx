import { useContext, createContext, useState, useEffect } from "react";
import { AuthResponse } from "../types/Authtypes";
import { User } from "../types/GeneralTypes"

interface AuthProviderProps {
    children: React.ReactNode;
}

interface AuthContextType {
    isAuthenticated: boolean;
    getAccessToken: () => string;
    saveUser: (userData: AuthResponse) => void;
    getUser: () => (User | undefined);
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    getAccessToken: () => "",
    saveUser: () => {},
    getUser: () => ({} as User | undefined),
    signOut: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        const token = localStorage.getItem('token');
        return !!token;
      });
    const [accessToken, setAccessToken] = useState<string>("");
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const loggedUserJSON = localStorage.getItem("user");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON) as User;
            setUser(user);
        }

        const loggedUserToken = localStorage.getItem("token");
        if (loggedUserToken) {
            setAccessToken(loggedUserToken);
            setIsAuthenticated(true);
        }
    }, []);

    function getAccessToken() {
        return accessToken;
    }

    function saveUser(userData: AuthResponse) {
        setAccessToken(userData.token);
        localStorage.setItem("token", JSON.stringify(userData.token));
        setIsAuthenticated(true);
        setUser(userData.user);
        localStorage.setItem("user", JSON.stringify(userData.user));
    }

    function getUser(){
        return user;
    }

    function signOut (){
        setIsAuthenticated(false);
        setAccessToken("");
        setUser(undefined);
        localStorage.removeItem("token");
        localStorage.removeItem("user")
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUser, getUser, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);