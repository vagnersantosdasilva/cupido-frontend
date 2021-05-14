import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../hooks/useAuth";
import {useProfileList} from "../hooks/useProfileList";
import {Redirect} from "react-router-dom";
import Alert from "./Alert";

export const ProfileForm = (props)=>{
    const auth = useContext(AuthContext);
    const [profile,setProfile] = useState({ id:"",name: "",age:"",email:"",sex :"",video :"",text :"",birth:""});
    const [redirect,setRedirect] = useState(false);

    const profiles = useProfileList();

    useEffect(()=>{
        const id = props.match.params.id;
        if (id && auth.credentials.username!=null){
            profiles.loadProfile(id);
        }
    },[auth.credentials]);

    useEffect(()=>{
        if (profiles.profile!==null){
            setProfile(profiles.profile);

        }
    },[profiles.profile]);

    const onSubmitHandler = (event)=>{
        event.preventDefault();
        profiles.save(profile);
    }

    const onClickHandler = (event)=>{
        const field = event.target.name;
        const value = event.target.value;
        console.log(profile);
        setProfile ({...profile,[field]:value});
    }

    const onInputChangeHandler = (event)=>{
        const field = event.target.name;
        const value = event.target.value;
        console.log(profile);
        setProfile ({...profile,[field]:value});
    }

    if (!auth.isAuthenticated()){
        return <Redirect to ="/login"/>
    }
    console.log(auth.credentials.username);
    console.log(profile.email);
    if (auth.credentials.username===profile.email){
        return (
            <div className="container">
                <h5>{profile.name}</h5>
                <hr/>

                <form>

                    <div className="form-group">
                        <label htmlFor="email"><strong>Nome de usuário</strong></label>
                        <input type="email" className="form-control" name="email" placeholder="O seu email é também o nome de usuário"
                               value={profile.email}  onChange = {onInputChangeHandler} disabled={true}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name"><strong>Nome</strong></label>
                        <input type="text" className="form-control" name="name" placeholder="Informe o nome completo"
                               value={profile.name}  onChange = {onInputChangeHandler}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="birth"><strong>Data de Nascimento</strong></label>
                        <input type="date" className="form-control" name="birth" value ={convertDate(profile.birth)}
                               onChange ={onInputChangeHandler}/>
                    </div>
                    <div className="form-group">

                        <input type="hidden" name="transp"/>
                        <label htmlFor="transp"><strong>Como você se identifica ?</strong></label><br/>

                        <input type="radio" id="male" name="sex" value="Homem cis" checked={"Homem cis"===profile.sex}
                               onClick ={onClickHandler}
                        />
                        <label htmlFor="male">Homem Cis</label><br/>

                        <input type="radio" id="male" name="sex" value="Homem trans" checked={"Homem trans"===profile.sex}
                               onClick ={onClickHandler}
                        />
                        <label htmlFor="male">Homem trans</label><br/>

                        <input type="radio" id="female" name="sex" value="Mulher cis" checked={"Mulher cis"===profile.sex}
                               onClick ={onClickHandler}
                        />
                        <label htmlFor="female">Mulher cis</label><br/>

                        <input type="radio" id="female" name="sex" value="Mulher trans" checked={"Mulher trans"===profile.sex}
                               onClick ={onClickHandler}
                        />
                        <label htmlFor="female">Mulher trans</label><br/>

                        <input type="radio" id="other" name="sex" value="Outros" checked={"Outros"===profile.sex}
                               onClick ={onClickHandler}
                        />
                        <label htmlFor="other">Outros</label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="perfil"><strong>Descreva quem é você</strong></label>
                        <textarea  className="form-control" name="text" rows="5" cols="5" maxLength="500" placeholder="Diga suas preferências , filmes , hobes , músicas , etc ..."
                        value={profile.text}
                        onChange ={onInputChangeHandler}
                        />
                        <br/>
                    </div>
                    <button type="submit" className="btn btn-info" >Enviar</button>
                </form>
            </div>
        );
    }
    else{
        if (profile.error!=null) { return( <div><Alert message = {profile.error}/></div>);}
        else{ return(<div><Alert message="Ocorreu um erro inesperado !"/></div>);}

    }

}


const  convertDate = (birth) => {

    console.log(birth);
    if (birth!=="" && birth!==null && typeof (birth) !== 'undefined'){
        let b = birth.split('T')[0];
        return b;
    }

    return new Date(birth);
}

