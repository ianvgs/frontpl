import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config(); 
const url = process.env.URL

export default axios.create({
  baseURL: url
});