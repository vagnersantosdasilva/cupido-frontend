import {useContext, useEffect, useState} from "react";
import {useProfileList} from "../hooks/useProfileList";
import {AuthContext} from "../hooks/useAuth";
import Alert from "./Alert";
import {Redirect} from "react-router-dom";

const Profile = (props) =>{


    const profiles = useProfileList();
    const auth = useContext(AuthContext);

    const [profile,setProfile] = useState({ id:"0",name: "",age:"",email:"",sex :"",video :"",text :"",birth:""});
    const [id,setId]=useState("0");
    const [redirect,setRedirect] = useState(false);
    useEffect(()=>{
        const id = props.match.params.id;
        setId(id);
        profiles.loadProfile(id);
    },[auth.credentials]);

    useEffect(()=>{
        setProfile(profiles.profile);
    },[profiles.profile]);

    const onClickHandler = (event)=>{
        console.log(id);
        setRedirect(true);

    }
    if (redirect) {return <Redirect to ={ `/cupido/profileForm/${id}`} />}
    if (!auth.isAuthenticated()) return <Redirect to = { "/login"}/>
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


                    <div className ="profile-header"><br/>
                        <h6>Dados pessoais :</h6>
                        <hr/>
                    </div>
                    <div className = "profile-block">

                        <ul>
                            <li> <strong>Nome:</strong> {profile.name}</li>
                            <li> <strong>Idade:</strong> {profile.age}</li>
                            <li> <strong>Sexo:</strong> {profile.sex}</li>
                            <li> <strong>Nome de usuário:</strong> {profile.email}</li>

                        </ul>
                    </div>

                    <div className ="profile-header"><br/>
                        <h6>Auto descrição :</h6>
                        <hr/>
                    </div>
                    <div className = "profile-block">

                        <ul>
                            <li> <strong>Link de vídeo : </strong> {profile.video}</li>
                            <li> <strong>Quem você é :</strong> {profile.text}</li>
                        </ul>
                    </div>


                    <br/>
                    <input type="button" className="btn btn-info" value="Editar" onClick = {onClickHandler}/>
                </div>
            );
        }
    }
    if (profiles.error!==null)
        return (
                <div>
                     <Alert message = "Ocorreu um erro inesperado!"/>
                </div>
        );
    return ( <div></div>);

}
export default Profile;
