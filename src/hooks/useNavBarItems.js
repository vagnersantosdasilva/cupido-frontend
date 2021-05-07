import {useContext, useEffect, useState} from "react";
import {AuthContext} from "./useAuth";

export const useNavBarItems = () => {

    const [items, setItems] = useState([]);
    const auth = useContext(AuthContext);

    useEffect(()=>{

        const activate = (clickedItem)=>{
            if(!clickedItem.active){
                setItems(items.map(item => item.name ===clickedItem.name ?
                    {...item,activate:true} : { ...item,activate: false}
                ));
            }

        }

        const  items =[
            {name:"Home" , href:"/" , active:true , onClick :activate},
            {name:"Meu perfil" , href:"/cupido/profile" ,active:false , onClick :activate},
            {name:"Outros perfis" , href:"/cupido/profilelist" ,active:false , onClick :activate}
        ];

        if (auth.isAuthenticated()){
            items.push({name:"Logout" , href:"#" , active:false , onClick :()=> {
                    auth.logout() ;

                }});
        }
        else { items.push({name:"Login" , href:"/login" , active:false , onClick :activate });}

        setItems(items);

    } ,[auth.credentials] );

    return {items}
}