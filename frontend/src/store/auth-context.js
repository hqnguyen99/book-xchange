import React, {useState} from 'react'

const AuthContext= React.createContext({
    accessToken:'',
    isLoggedIn: false,
    login:(token)=>{},
    logout:()=>{}
});
export const AuthContextProvider=(props)=>{
    const [accessToken, setAccessToken]= useState(null);
    const userIsLoggedIn = !!accessToken;
    const loginHandler= (token)=>{
        setAccessToken(token);
    }
    const logoutHandler= ()=>{
        setAccessToken(null);
    }
    const contextValue ={
        accessToken:accessToken,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }
    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}
export default AuthContext;