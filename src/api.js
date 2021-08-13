import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config(); 
c
export default axios.create({
  baseURL: 'https://backpl.herokuapp.com/'
});