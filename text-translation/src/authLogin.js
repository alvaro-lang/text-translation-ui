import axios from 'axios';
import API_URL from "./config.js";

export default async function login(username, password) {
    try {
        const response = await axios.post(`${API_URL}/api/auth/login`, {
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
