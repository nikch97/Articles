import axios from "axios";

export const register = newUser => {
    return axios
        .post('/users/register', {
            name: newUser.name,
            family: newUser.family,
            mobile: newUser.mobile,
            username: newUser.username,
            password: newUser.password,
            gender: newUser.gender,
            // avatar: 'images/users/' + FILE.originalname,
        })
        .then(res => {
            console.log('Registered!')
        })
}

export const login = user => {
    return axios
        .post('/users/login', {

            username: user.username,
            password: user.password

        })
        .then(res => {
            localStorage.setItem('userToken', res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}