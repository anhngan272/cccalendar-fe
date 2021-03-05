import axios from 'axios';
import { getCookie } from '@/helpers';

export function getUser() {
    return getCookie('user');
}

export function setAuthorization(token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}