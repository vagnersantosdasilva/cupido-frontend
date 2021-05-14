import {useContext, useEffect} from "react";
import {AuthContext} from "../hooks/useAuth";


const Messages = ()=>{
    const auth = useContext(AuthContext);

    useEffect(()=>{
        if (auth.credentials!==null){
            const username = auth.credentials.username;
            console.log("MyProfile-useeffect :"+username);

        }
    },[auth.credentials]);

    return (
        <div className="container">



        </div>
    );
}