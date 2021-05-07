/* eslint-disable react-hooks/rules-of-hooks */
import {AUTH_ENDPOINT, CREDENTIALS_NAME} from '../constants.js';

import { createContext,useEffect,useState } from "react";

export const AuthContext = createContext();

//const cors = require("cors");

export const useAuth =() =>{
    const [credentials,setCredentials] = useState({username:null,displayName:null,token:null});
    const [error,setError] = useState(null);
    const [processing,setProcessing] = useState(false);

    useEffect(()=>{
        loadCredentials();
    },[]);
    
    const login = async(username,password)=>{

       const loginInfo = JSON.stringify({username:username,password:password});
       const headers = {headers: {'Content-Type': 'application/json' }}

       try{
           setProcessing(true);
            //const response = await axios.post(`${AUTH_ENDPOINT}`,loginInfo,headers);
            //const jwtToken = response.headers['authorization'].replace("Bearer ","");
            storeCredentials("dksakdj1923923asdkasdjkasdlaskd");
            setProcessing(false);
       }catch(error){
           console.log(error);
           setError("O login não pode ser realizado.");
           setProcessing(false);
       }
    }

    const storeCredentials = (token)=>{

        const credentials_ = {username:"fulano@gmail.com",displayName:"fulano",token:token};
        sessionStorage.setItem(CREDENTIALS_NAME,JSON.stringify(credentials_));
        setCredentials(credentials_);
    }

    const logout = ()=>{
        sessionStorage.removeItem(CREDENTIALS_NAME);
        setCredentials({username:null,displayName:null,token:null});
    }

    const isAuthenticated = ()=> {
        return sessionStorage.getItem(CREDENTIALS_NAME)!==null;
    }

    const loadCredentials =() =>{
        const storeCredentials = sessionStorage.getItem(CREDENTIALS_NAME);
        if (credentials!==null){
           setCredentials(JSON.parse(storeCredentials));
        }
    }

    return {login,logout,isAuthenticated,credentials,error,processing};
}