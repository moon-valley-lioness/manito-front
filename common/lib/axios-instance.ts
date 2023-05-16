import axios from 'axios';
import { SERVER_URL } from '../constants/url';

export const axiosInstance = axios.create({ baseURL: SERVER_URL });
