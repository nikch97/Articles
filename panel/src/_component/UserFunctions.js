import axios from "axios";
let formdata = new FormData()

export const register = (newUser,formdata) => {
    return axios
        .post('/users/register', {
            name: newUser.name,
            family: newUser.family,
            mobile: newUser.mobile,
            username: newUser.username,
            password: newUser.password,
            gender: newUser.gender,
            avatar:formdata
        })
        .then(res => {
            if (res) {
              console.log("registerd!")
          }
        })
        .catch(err => {
            console.log(err)
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