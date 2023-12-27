import axios from "../axios"

// const handleLogin = (useremail, userPassword) => {
//     return axios.post('/api/login', { email: useremail, password: userPassword });
// }
//cach viet gan gon >>
const handleLogin = (email, password) => {
    return axios.post('/api/login', { email, password });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

export default {
    handleLogin: handleLogin,
    getAllUsers: getAllUsers,
};