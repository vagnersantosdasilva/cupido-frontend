//const SERVER = 'http://localhost:8080';
const SERVER = 'http://34.227.46.227:8080';//process.env.REACT_APP_SERVER;
console.log('SERVER :'+SERVER);
export const APP_NAME = "Cupido";
export const AUTH_ENDPOINT = `${SERVER}/cupido/users/login`;
export const API_ENDPOINT = `${SERVER}/cupido`;
export const CREDENTIALS_NAME="credentials";
