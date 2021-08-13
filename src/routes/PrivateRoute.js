import { isAuthenticated } from "./auth"
import {Redirect, Route } from "react-router-dom"


//criar separado depois
export const PrivateRoute = ({component:Component, ...rest}) => 
(<Route {...rest} render={props =>(
    isAuthenticated() ?  (<Component {...props} />) : (<Redirect to={{pathname:'/', state:{from: props.location}  }} />)
)}/>
)