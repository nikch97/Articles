import axios from "axios";


export const register = (formdata) => {
    return axios
        .post('/users/register', formdata)
        .then(res => {
            if (res) {
              console.log("registerd!")
          }
        })
        .catch(err => {
            console.log(formdata+err)

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

