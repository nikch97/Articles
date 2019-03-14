import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import axios from "axios";


class Profile extends Component {
    state = {
        name: '',
        family: '',
        mobile: '',
        username: '',
        password: '',
        gender: '',
        avatar: '',
        role: '',
        // people:[]
    }

    componentDidMount() {
        const token = localStorage.userToken
        const decoded = jwt_decode(token)
        // if (decoded.role == 1) {
            this.setState({
                name: decoded.name,
                family: decoded.family,
                mobile: decoded.mobile,
                username: decoded.username,
                password: decoded.password,
                gender: decoded.gender,
                avatar: decoded.avatar,
                role: decoded.role
            })
        // }

        // axios.get('/users/profile', { headers: { 'crossDomain': true, 'Content-Type': 'application/json' } })
        //     .then(res => {
        //         this.setState({ people: res.data })
        //             .then(profileState => {
        //                 console.log(JSON.stringify(this.state.people))
        //             });
                
        // })
        
    }

    


    render() {

            return (
                <div id="user-profile-2" className="user-profile">
                    <div className="tabbable">
                        <ul className="nav nav-tabs px-3 pt-3">
                            <li className="nav-item mx-2">
                                <a className="nav-link active" data-toggle="tab" href="#home"><i className="green ace-icon fa fa-user bigger-120"></i>
                                    Profile</a>
                            </li>
                            <li className="nav-item dropdown mx-2">
                                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#"> <i className="orange ace-icon fa fa-rss bigger-120"></i>
                                    Activity Feed</a>

                            </li>
                            <li className="nav-item mx-2">
                                <a className="nav-link" data-toggle="tab" href="#store"><i className="blue ace-icon fa fa-users bigger-120"></i>
                                    Friends</a>
                            </li>
                            <li className="nav-item mx-2">
                                <a className="nav-link" data-toggle="tab" href="#contact"> <i className="pink ace-icon fas fa-image bigger-120"></i>
                                    Pictures</a>
                            </li>
                        </ul>


                        <div className="tab-content no-border padding-24">
                            <div id="home" className="tab-pane in active">
                                <div className="row">
                                    <div className="col-xs-12 col-sm-3 center">
                                        <span className="profile-picture">
                                            <img className="size editable img-responsive" alt=" Avatar" id="avatar2" src={this.state.avatar} />
                                        </span>

                                        <div className="space space-4"></div>

                                        <a href="#" className="btn btn-sm btn-block btn-success">
                                            <i className="ace-icon fa fa-plus-circle bigger-120"></i>
                                            <span className="bigger-110">Add as a friend</span>
                                        </a>

                                        <a href="#" className="btn btn-sm btn-block btn-primary">
                                            <i className="ace-icon fa fa-envelope-o bigger-110"></i>
                                            <span className="bigger-110">Send a message</span>
                                        </a>
                                        <a href="/users/articles" className="btn btn-sm btn-block btn-primary">
                                            <i className="ace-icon fa fa-envelope-o bigger-110"></i>
                                            <span className="bigger-110">View Articles</span>
                                        </a>
                                    </div>

                                    <div className="col-xs-12 col-sm-9">
                                        <h4 className="blue">
                                            <span className="middle">Welcome {this.state.name}</span>
                                        </h4>

                                        <div className="profile-user-info">
                                            <div className="profile-info-row">
                                                <div className="profile-info-name">Name </div>

                                                <div className="profile-info-value">
                                                    <span>{this.state.name}</span>
                                                </div>
                                            </div>

                                            <div className="profile-info-row">
                                                <div className="profile-info-name">Family </div>

                                                <div className="profile-info-value">
                                                    <span>{this.state.family}</span>

                                                </div>
                                            </div>

                                            <div className="profile-info-row">
                                                <div className="profile-info-name"> Mobile</div>

                                                <div className="profile-info-value">
                                                    <span>{this.state.mobile}</span>
                                                </div>
                                            </div>

                                            <div className="profile-info-row">
                                                <div className="profile-info-name"> Username </div>

                                                <div className="profile-info-value">
                                                    <span>{this.state.username}</span>
                                                </div>
                                            </div>

                                            <div className="profile-info-row">
                                                <div className="profile-info-name"> Password</div>

                                                <div className="profile-info-value">
                                                    <span>{this.state.password}</span>
                                                </div>
                                            </div>
                                            <div className="profile-info-row">
                                                <div className="profile-info-name"> Gender </div>

                                                <div className="profile-info-value">
                                                    <span>{this.state.gender}</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="space-20"></div>

                            </div>
                        </div>
                    </div>
                </div>
            ) 

        // return (
        //     <div>
        //         {
        //             this.state.people.map(user =>
        //                 <tr>
        //                     <td>Username:</td>
        //                     <td>{user.username}</td>
        //                 </tr>
        //                 )
        //         }
        //     </div>
        // )
    }

}

export default Profile


