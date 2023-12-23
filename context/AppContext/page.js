"use client"
import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const AppState = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [count, setCount] = useState(0)

    const checkIsLoggedIn = async () => {
      let token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);

        let userObj = localStorage.getItem('token');
        let parsedObj = await JSON.parse(userObj);
        setUser(parsedObj.userId);
        
      } else {
        setIsLoggedIn(false);
        setUser(null)
        setCount(0);
      }
    };
    
    useEffect(() => {
      checkIsLoggedIn();
    }, []);

    return(
        <AppContext.Provider value={{
            isLoggedIn, 
            setIsLoggedIn, 
            user, 
            setUser, 
            count, 
            setCount
          }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState;

