import {useState} from "react";
import axios from "axios";
import {API_ENDPOINT} from "../constants";

export  const useProfileList = ()=>{
    const [list , setList] = useState([]);
    const [error,setError] = useState(null);
    const [processing,setProcessing] = useState (false);
    const [profile , setProfile] = useState({ id:"0",name: "",age:"",email:"",sex :"",video :"",text :""});
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

    const buildHeaders = ()=> {
        return {
            headers:{

            }
        }
    }

    const loadProfile = async(id) =>{
        try {
            setProcessing(true);
            const response = await axios.get(`${API_ENDPOINT}/profiles/${id}`,buildHeaders);
            const content = response.data;
            console.log("response >"+content);
            setProfile(content);
            setProcessing(false);
        }
        catch(error){
            handlerError(error);
        }
    }

    const loadProfileByUsername = async(username) =>{
        try {
            setProcessing(true);
            const response = await axios.get(`${API_ENDPOINT}/profile/${username}`,buildHeaders);
            const content = response.data;
            console.log("response username>"+content);
            setProfile(content);
            setProcessing(false);
        }
        catch(error){
            handlerError(error);
        }
    }


    const listProfile = async ()=>{
        try{
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

