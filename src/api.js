import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config(); 
const url = process.env.BACKURL

export default axios.create({
  baseURL: 'https://backpl.herokuapp.com/'
});