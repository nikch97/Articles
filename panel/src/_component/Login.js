import React, { Component } from 'react'
import { login } from "./UserFunctions"
import {Link} from 'react-router-dom'
import Axios from 'axios';

const style = {
    backgroundImage: 'url(./images/bg.jpg)'
};

class Login extends Component {
    state = {
        username: '',
        password: '',
        error:null
    }

    onChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value })
    }

    onSubmit = (e) => {
        // e.preventDefault()
        const user = {
            username: this.state.username,
            password: this.state.password,
        }
        Axios.post('http://localhost:3000/users/login',user)
        .then(response=>{
            if(response.user.success){
                window.location = '/profile';
            }else{
                this.setState({error:true})
            }
        })




        login(user)
            .then(res => {
                if (res) {
                    this.props.history.push(`/profile`)
                }

            })
    }

    render() {
        return (
            <div className="container-login100" style={style}>
                <div className="wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30">
                    <form onSubmit={this.onSubmit} className="login100-form validate-form">
                        <span className="login100-form-title p-b-37">
                            Sign In
				        </span>

                        <div className="wrap-input100 validate-input m-b-20" data-validate="Enter username">
                            <input className="input100" type="text" name="username" placeholder="username"
                                value={this.state.username}
                                onChange={this.onChange}
                            />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100  m-b-25" data-validate="Enter password">
                            <input className="input100" type="password" name="pass" placeholder="password"
                            onChange={this.onChange}   
                            />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn" type="submit">
                                Sign In
					</button>
                        </div>
                       
                        <div className="text-center">
                            <Link to="register" className=" txt2 hov1">
                                Sign Up
					        </Link>
                        </div>
                    </form>
                    {this.state.error && <p>Login failed!</p>}

                </div>
            </div>

        )
    }
}

export default Login