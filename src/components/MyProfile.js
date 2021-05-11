import {useProfileList} from "../hooks/useProfileList";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../hooks/useAuth";
import {Redirect} from "react-router-dom";
import {API_ENDPOINT} from "../constants";
import Alert from "./Alert";

const MyProfile = ()=>{
    const profiles = useProfileList();
    const auth = useContext(AuthContext);
    const [profile,setProfile] = useState(null);

    useEffect(()=>{
        if (auth.credentials!==null){
            const username = auth.credentials.username;
            console.log(username);
            profiles.loadProfileByUsername(username);
        }
    },[auth.credentials]);

    useEffect(()=>{
        setProfile(profiles.profile);;
    },[profiles.profile]);

    if (auth.credentials===null) return <Redirect to = { "/login"}/>
    if (profile!==null && profile.id!=="0" ) return <Redirect to = { `profile/${profile.id}`}/>

    return (
        <Alert message ="Ocorreu um erro inesperado! "/>
    );
}

export default MyProfile;