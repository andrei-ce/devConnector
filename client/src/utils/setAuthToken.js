//We wont make any calls with axios, only add token to the headers
import axios from 'axios';

//This will be a function that chekcs if there is a token in the localStorage, and if so, it inserts it into the headers of any axios call
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
