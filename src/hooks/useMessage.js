import axios from "axios";
import {API_ENDPOINT} from "../constants";
import {useContext, useState} from "react";
import {AuthContext} from "./useAuth";


const useMessage = ()=>{

    const [messages,setMessages] = useState([ ]);
    const auth  = useContext(AuthContext);


    const loadMessages = async(id) =>{
        try {
            const response = await axios.get(`${API_ENDPOINT}/messages/${id}`,buildHeaders);
            const content = response.data;
            setMessages(content);
        }
        catch(error){
            handlerError(error);
        }
    }

    const sendMessage = async(idTo,idFrom,anonymous,text) =>{
       const message =  {id_to:idTo,id_from:idFrom,anonymous:anonymous,message:text}
        try {
            const response = await axios.post(`${API_ENDPOINT}/sendmessages/${idTo}`,message,buildHeaders);
            const content = response.data;
            setMessages(content);
        }
        catch(error){
            handlerError(error);
        }
    }



    const handlerError =(error)=>{

    }
    const buildHeaders = () =>{
        console.log(auth.credentials.token);
        return{
            headers:{
                'Authorization':`${auth.credentials.token}`
            }
        }
    }
}