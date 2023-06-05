import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import queryString from "query-string";

function SocialLogin() {

    const token = queryString.parse(window.location.search).token;
    const [isAuthenticated, setIsAuthenticated] = useState(true);


    useEffect(() => {
        localStorage.setItem("ACCESS_TOKEN", token);
        setIsAuthenticated(true);
      }, []);

    console.log(isAuthenticated);

    if(isAuthenticated) {
        return(
            <Navigate
            to={{
                pathname: "/"
            }}>
            </Navigate>
        );
    } else {
        return(
            <Navigate
            to={{
                pathname: "/login"
            }}>
            </Navigate>
        );
    }
}

export default SocialLogin;