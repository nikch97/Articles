import React, { Component } from 'react'
import { login } from "./UserFunctions"
import {Link} from 'react-router-dom'

const style = {
    backgroundImage: 'url(/images/bg.jpg)'
};

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',

        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
   

    onChange(e) {
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()
        const user = {
            username: this.state.username,
            password: this.state.password,
        }        

        login(user)
            .then(res => {
                if (res) {
                    this.props.history.push(`/profile`)
                    // console.log('Ok shod!')
                }

            })
    }

    render() {
        return (
            <div className="container-login100" style={style}>
                <div className="wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30">
                    <form noValidate onSubmit={this.onSubmit} className="login100-form validate-form">
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
                            <input className="input100" type="password" name="password" placeholder="password"
                            value={this.state.password}
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
                    

                </div>
            </div>

        )
    }
}

export default Login