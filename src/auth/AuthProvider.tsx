import { useContext, createContext, useState, useEffect } from "react";
import { AuthResponse } from "../types/Authtypes";
import { User } from "../types/GeneralTypes";

interface AuthProviderProps {
    children: React.ReactNode;
}

interface AuthContextType {
    isAuthenticated: boolean | null;
    getAccessToken: () => string;
    saveUser: (userData: AuthResponse) => void;
    getUser: () => User | undefined;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: null,
    getAccessToken: () => "",
    saveUser: () => {},
    getUser: () => ({} as User | undefined),
    signOut: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [accessToken, setAccessToken] = useState<string>("");
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const loggedUserJSON = localStorage.getItem("user");
        const loggedUserToken = localStorage.getItem("token");

        if (loggedUserJSON && loggedUserToken) {
            setAccessToken(loggedUserToken);
            const user = JSON.parse(loggedUserJSON) as User;
            setUser(user);
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    function getAccessToken() {
        return accessToken;
    }

    function saveUser(userData: AuthResponse) {
        setAccessToken(userData.token);
        localStorage.setItem("token", userData.token);
        setIsAuthenticated(true);
        setUser(userData.user);
        localStorage.setItem("user", JSON.stringify(userData.user));
    }

    function getUser() {
        return user;
    }

    function signOut() {
        setIsAuthenticated(false);
        setAccessToken("");
        setUser(undefined);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUser, getUser, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
