import {useProfileList} from "../hooks/useProfileList";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../hooks/useAuth";
import {ProfileListItems} from "./ProfileListItems";
import {Redirect} from "react-router-dom";

const ProfileList = () =>{
    const auth = useContext(AuthContext);
    const profiles = useProfileList();

    useEffect(()=>{
        profiles.listProfile();//console.log(profiles.listProfile());
    },[auth.credentials]);

    if (!auth.isAuthenticated()) return <Redirect to = { "/login"}/>
    return (
            <section id="videos">
                <div className="container">
                    <center>
                        <h2>Pessoas interessantes</h2>
                    </center>
                    <br/>
                    <div className="row">
                        {profiles.list.map (
                             i => <ProfileListItems
                                item = {i}
                            />
                        )}
                    </div>
                </div>
            </section>
    );
}

export  default ProfileList;