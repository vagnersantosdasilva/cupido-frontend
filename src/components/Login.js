import {useContext, useState} from "react";
import {AuthContext} from "../hooks/useAuth";
import Alert from "./Alert";
import {Redirect} from "react-router-dom";

const Login  = () =>{
    const auth = useContext(AuthContext);
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");

    const handleSubmit = (event)=>{
        event.preventDefault();
        auth.login(username,password);

    }

    if(auth.isAuthenticated()){
        return <Redirect to="/"/>

    }

    return (
        <div className="container-login ">
            <div  className="jumbotron">

                <div className="panel-login">

                    <div className="center-section-container">
                        <div className="section-title">
                            <center><h5>Entre com seu perfil</h5></center>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username"><b>Usuário</b></label>
                                <input
                                    type = "text"
                                    className = "form-control"
                                    onChange = {(event)=>setUsername(event.target.value)}
                                    value={username}
                                    placeholder="Digite o usuário"/>

                            </div>

                            <div className="form-group">
                                <label htmlFor="password"><b>Senha</b></label>
                                <input
                                    type = "password"
                                    className = "form-control"
                                    onChange = {(event)=>setPassword(event.target.value)}
                                    value={password}
                                    placeholder="Digite a senha"/>

                            </div>

                            <button type="submit" className="btn btn-login" disabled={auth.processing}>Login
                            </button>
                            <button type="submit" className="btn btn-singleup" disabled={auth.processing}>Cadastrar
                            </button>
                            <div className="forgot-password"><a  href="#">Esqueceu a senha?</a></div>

                        </form>
                    </div><br/>
                    {auth.error && <Alert message={auth.error}/>}
                </div>

            </div>
        </div>

    );
}

export default Login;