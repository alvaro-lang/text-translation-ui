import axios from 'axios';

export default async function login(username, password) {
    try {
        const response = await axios.post('http://localhost:8000/api/auth/login', {
            'username': username,
            'password': password
        })

        if (response.data.access) {
            localStorage.setItem("access_token", response.data.access);
            return { success: true };
        }
    } catch (error) {
        return { success: false, message: error.response?.data?.detail || "Login failed" }
    }
}
