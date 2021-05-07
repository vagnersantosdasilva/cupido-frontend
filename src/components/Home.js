import {useContext} from "react";
import {AuthContext} from "../hooks/useAuth";

const  Home = () =>{
    const  auth = useContext(AuthContext);

    if (auth.isAuthenticated()){
        return (
            <div>
                <p>olá {auth.credentials.username} bem vindo de volta. Veja suas novas mensagens</p>
            </div>
        );
    }else {
        return (
            <div>
                <p>Olá visitante  faça um cadastro para encontrar o amor de sua vida!</p>
            </div>
        );
    }
}

export default Home;