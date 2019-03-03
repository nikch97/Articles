import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

class Profile extends Component{
    state = {
        name: '',
        family: '',
        mobile: '',
        username: '',
        password: '',
        gender: '',
        avatar: ''
    }

    componentDidMount(){
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            name:decoded.name,
            family:decoded.family,
            mobile:decoded.mobile,
            username:decoded.username,
            password:decoded.password,
            gender:decoded.gender,
            avatar:decoded.avatar,
        })
    }

    render(){
        <div>
            welcome {this.state.name}
        </div>
    }

}

export default Profile
   
    
