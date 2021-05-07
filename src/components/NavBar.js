import React, {Component, useContext} from 'react';
import NavBarItem from './NavBarItem';

import {useNavBarItems} from "../hooks/useNavBarItems";
import {AuthContext} from "../hooks/useAuth";

const NavBar  = () =>{

    const navBarItems  = useNavBarItems();
    const  auth = useContext(AuthContext);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <span className="navbar-brand" href="#">Cupido</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav mr-auto">
                        {navBarItems.items.map(
                            i=> <NavBarItem
                                key = {i.name}
                                item ={i}
                            /> )}

                    </div>

                </div>

                {auth.isAuthenticated()?
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Encotrar alguém" aria-label="Search"/>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Pesquisar</button>
                    </form>:''
                }

            </nav>
        </div>
    );

}

export default NavBar;