import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import App from '../componentes/App'
import {PrivateRoute} from './PrivateRoute'




function Routes ()
 {
    return(
        <BrowserRouter>        
        <Switch>                    
                <Route path="/" exact component={Login} />
                <Route path="/register" exact component={Registro} />                
                <Route path="/login" exact component={Login} />
                <Route path="/app" exact component={App} />                
                <PrivateRoute path="/admin" exact component={App}  />  
        </Switch>
        </BrowserRouter>
    )

};

export default Routes;
