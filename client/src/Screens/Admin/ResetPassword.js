import React, { Component } from 'react';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import ButtonMU from '@material-ui/core/Button';
import config from '../../config'
import '../../css/Main.css'


class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password:'',
            token:this.props ? this.props.match.params.token : '', // check if there is params and set the token if so 
            email:this.props ? this.props.match.params.email : '',  // check if there is params and set the email if so 
            redirectToLogin:false
        }
    }



    // get query params - this.props.match.params.redirectParam
    componentDidMount() {
        if (config.__DEBUGGING__) {
            console.log('this.props.match.params.token', this.props.match.params.token)
            console.log('this.props.match.params.email', this.props.match.params.email)
        }
        let token = this.props.match.params.token
        let email = this.props.match.params.email
    }

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;    
        this.setState({
          [name]: value
        });
    }



    // simple login
    Reset = (e) => {
        e.preventDefault()
        axios.post(`${config.backEndServer}/resetpasswordhandler`, {
            password:this.state.password,
            token:this.state.token,
            email:this.state.email
        })
        .then((res) => {
            if (config.__DEGUGGING__) {
                console.log('response on changing pw', res)
            }
            if (res.status == 200) {
                this.setState({redirectToLogin:true}) // redirect to 
            }
        })
        .catch(e => console.log('couldnt login', e))
    }


    render() {
        return(
            <div className='admin-signup-section container-signup container'>
            {this.state.redirectToLogin ? <Redirect to={`/admin`}/> : null}
                <h3 className='forgot-pass'>Reset password</h3>
                <div>
                    <input className='admin-form' onChange={e => this.handleInputChange(e)} value={this.state.password} name="password" type="password"  placeholder="password" />
                    <br/>
                    <ButtonMU variant="contained" color="primary" onClick={this.Reset}>set password</ButtonMU>
                </div> 
            </div>  
        )
    }
}

export default ResetPassword