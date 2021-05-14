import {useContext, useState} from "react";
import axios from "axios";
import {API_ENDPOINT} from "../constants";
import {AuthContext} from "./useAuth";

export  const useProfileList = ()=>{
    const auth  = useContext(AuthContext);
    const [list , setList] = useState([]);
    const [error,setError] = useState(null);
    const [processing,setProcessing] = useState (false);
    const [profile , setProfile] = useState({ id:0,name: "",email:"",sex :"",video :"",text :"",birth:""});
    const [loaded,setLoaded] = useState (false);

    const clearProfile = ()=>{
        setProfile(null);
    }

    const loadedProfile = ()=>{
        if (profile !==null) setLoaded(true);
    }
    const handlerError = (error)=>{
        setError(error);
        console.log(error);
    }

    const seva = (profile)=>{
        try {

        }
        catch (error){
            handlerError(error);
        }
    }

    const buildHeaders = () =>{
        console.log(auth.credentials.token);
        return{
            headers:{
                'Authorization':`${auth.credentials.token}`
            }
        }
    }

    const loadProfile = async(id) =>{
        try {

            console.log(buildHeaders());
            setProcessing(true);
            const response = await axios.get(`${API_ENDPOINT}/profiles/${id}`,buildHeaders);
            const content = response.data;
            console.log("response >"+content);
            console.log(response.statusText);
            console.log(response.data.toString());
            console.log("response username>"+content);
            setProfile(content);
            setProcessing(false);
        }
        catch(error){
            handlerError(error);
        }
    }

    const loadProfileByUsername = async(username) =>{
        try {
            console.log(buildHeaders());
            setProcessing(true);
            const response = await axios.get(`${API_ENDPOINT}/profile/${username}`,buildHeaders);
            const content = response.data;

            setProfile(content);
            setProcessing(false);
        }
        catch(error){
            handlerError(error);
        }
    }


    const listProfile = async ()=>{
        try{
            console.log(buildHeaders());
            setProcessing(true);
            const response = await axios.get(`${API_ENDPOINT}/profiles`,buildHeaders);
            const content = response.data;
           console.log(response.data);
            setList(content);
            setProcessing(false);
        }catch (error){
            handlerError(error);
        }
    }

    return {profile,list,error,processing,loaded , listProfile,loadProfile,clearProfile,loadedProfile,loadProfileByUsername};
}

