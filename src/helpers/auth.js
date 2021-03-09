import axios from 'axios';
import { getCookie } from '@/helpers';

export function getUser() {
    return getCookie('user');
}

export function isLoggedIn() {
    return (getCookie('user') && getCookie('access_token'));
}

export function setAuthorization(token) {
    axios.defaults.headers.common["Authorization"] = `${token}`;
}