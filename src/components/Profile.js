import {useContext, useEffect, useState} from "react";
import {useProfileList} from "../hooks/useProfileList";
import {AuthContext} from "../hooks/useAuth";
import Alert from "./Alert";
import {Redirect} from "react-router-dom";

const Profile = (props) =>{


    const profiles = useProfileList();
    const auth = useContext(AuthContext);

    const [profile,setProfile] = useState({ id:"0",name: "",age:"",email:"",sex :"",video :"",text :""});

    useEffect(()=>{
        const id = props.match.params.id;
        profiles.loadProfile(id);
    },[auth.credentials]);

    useEffect(()=>{
        setProfile(profiles.profile);
    },[profiles.profile]);

    if (auth.credentials===null) return <Redirect to = { "/login"}/>
    if (profile.id!=="0"){
        console.log(profile.email);
        if (auth.credentials.username!==profile.email){
            return (
                <div>
                    <div className="container">

                        <h3>{profile.name}</h3>

                        <p>{profile.text}</p>

                        <hr></hr>

                        <form>
                            <div className="form-group">
                                <label htmlFor="perfil">Envio para perfil</label>

                                <textarea  className="form-control" name="message" rows="5" cols="5" maxLength="500"/>
                                <br/>
                                <input type ="checkbox" name="anonymous" value="anonymous" />

                                <label htmlFor="anonymous">Enviar como anônimo</label>
                                <br/>
                                <button type="submit" className="btn btn-info" >Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }else{
            return (
                <div className="container">
                    <h3>{profile.name}</h3>

                    <form>
                        <div className="form-group">

                            <label htmlFor="video">Vídeo Descritivo</label>
                            <input type="text" className="form-control" name="video" placeholder="Link do seu vídeo descritivo criado no youtube" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="age">Idade</label>
                            <input type="text" className="form-control" name="age" placeholder="Qual sua idade"/>
                        </div>
                        <div className="form-group">

                            <input type="hidden" name="transp"/>
                            <label htmlFor="transp">Como você se identifica ?</label><br/>

                            <input type="radio" id="male" name="gender" value="m-cis" />
                            <label htmlFor="male">Homem Cis</label><br/>

                            <input type="radio" id="male" name="gender" value="m-trans"/>
                            <label htmlFor="male">Homem trans</label><br/>

                            <input type="radio" id="female" name="gender" value="w-cis"/>
                            <label htmlFor="female">Mulher cis</label><br/>

                            <input type="radio" id="female" name="gender" value="w-trans"/>
                            <label htmlFor="female">Mulher trans</label><br/>

                            <input type="radio" id="other" name="gender" value="other"/>
                            <label htmlFor="other">Outro</label>
                        </div>

                        <div className="form-group">
                            <label htmlFor="sex_interest">Você se interessa por :</label>
                            <input type="text" className="form-control" name="sex_interest" placeholder=""/>
                        </div>
                        <div className="form-group">


                        </div>

                        <div className="form-group">
                            <label htmlFor="perfil">Descreva quem é você</label>
                            <textarea  className="form-control" name="message" rows="5" cols="5" maxLength="500" placeholder="Diga suas preferências , filmes , hobes , músicas , etc ..."/>
                            <br/>
                        </div>



                        <button type="submit" className="btn btn-info" >Enviar</button>

                    </form>

                </div>
            );
        }
    }
    return (
        <div>
             <Alert message = "Ocorreu um erro inesperado!"/>
        </div>);

}
export default Profile;
