import React, { Component } from 'react'
import { register } from "./UserFunctions"
import {Link} from 'react-router-dom'

const style = {
    backgroundImage: 'url(./images/bg.jpg)'
};
class Register extends Component {
    state = {
        name: '',
        family: '',
        mobile: '',
        username: '',
        password: '',
        gender: '',
        avatar: ''
    }

    onChange = ({ target: { name, value, type, checked } }) => {
        if (type === "radio") {
            this.setState({ [name]: checked })
        }
        else {
            this.setState({ [name]: value })
        }
    }


    onSubmit = (e) => {
        // e.preventDefault()
        const user = {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            family: this.state.family,
            mobile: this.state.mobile,
            gender: this.state.gender,
            avatar: this.state.avatar
        }

        register(user)
            .then(res => {

                this.props.history.push(`/login`)
            })
    }

    render() {
        return (
            <div className="container-login100" style={style}>
                <div className="wrap-reg-100  p-l-55 p-r-55 p-t-80 p-b-30">
                    <form onSubmit={this.onSubmit} className="login100-form validate-form">
                        <span className="login100-form-title p-b-37">
                            Sign Up
                        </span>

                        <div className="wrap-reg-input100 validate-input m-b-20" data-validate="Enter username">
                            <input className="input100" type="text" name="name" placeholder="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-reg-input100 validate-input m-b-20" data-validate="Enter username">
                            <input className="input100" type="text" name="family" placeholder="family"
                                value={this.state.family}
                                onChange={this.onChange}
                            />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-reg-input100 validate-input m-b-20" data-validate="Enter username">
                            <input className="input100" type="text" name="username" placeholder="username"
                                value={this.state.username}
                                onChange={this.onChange}
                            />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-reg-input100 validate-input m-b-25" data-validate="Enter password">
                            <input className="input100" type="password" name="pass" placeholder="password"
                                onChange={this.onChange}
                            />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-reg-input100  validate-input m-b-20" data-validate="Enter username">
                            <input className="input100" type="text" name="mobile" placeholder="mobile"
                                value={this.state.mobile}
                                onChange={this.onChange}
                            />
                            <span className="focus-input100"></span>
                        </div>
                        <div className="wrap-reg-input100 validate-input m-b-20 py-2 pr-1" data-validate="Enter username">
                            <select className="form-control border-0" name="gender">
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select>
                            <span className="focus-input100"></span>
                        </div>
                        <div className="validate-input " data-validate="Enter username">
                            <span className="sp mx-5">Choose an avatar: </span> <input type="file" className="py-2" name="avatar" id=""
                                checked={this.state.avatar}
                                onChange={this.onChange}
                            />
                            <span className="focus-input100"></span>
                        </div>
                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn my-4" type="submit">
                                Sign Up
					</button>
                        </div>

                        <div className="text-center">
                            <Link to="/" className=" txt2 hov1">
                                Sign In
					        </Link>
                        </div>
                    </form>


                </div>
            </div>
        )
    }
}

export default Register