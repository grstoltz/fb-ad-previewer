import React, { Component } from 'react';
import { BrowserRouter , Route , Switch , Link} from 'react-router-dom'
import Home from '../Home/Home'
import Admin from '../Admin/Admin'
import AskResetPassword from '../Admin/AskResetPassword'
import ResetPassword from '../Admin/ResetPassword'
// import Post from '../UserPage/Post'
//import UserPage from '../UserPage/UserPage'
import '../../css/Main.css'

 const Main = () => {

    return (

        <Switch>
            <Route exact path='/admin' component={Admin}/>
            <Route exact path='/resetpassword/:token/:email' component={ResetPassword}/>
            <Route exact path='/resetpassword' component={AskResetPassword}/>
            {/* <Route exact path='/:user/:postId' component={Post}/> */}
            {/* <Route exact path='/:user' component={UserPage}/> */}
            <Route exact path='/' component={Home}/>
        </Switch>

    )
}

export default Main