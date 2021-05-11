import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {API_ENDPOINT} from "../constants";


export const ProfileListItems = ({item})=>{

    return (

        <div className='col-sm-3 col-lg-3 col-md-3'>
            <div className='thumbnail'>
                <a href='#' data-toggle='modal'>
                    <iframe className='img-thumbnail' src={item.video}>
                    </iframe>
                </a>
                <div className='caption' align='center'>
                    <h4>
                        <Link to={`profile/${item.id}`}>
                            {item.name}
                        </Link>

                    </h4>
                </div>
            </div>
        </div>
    );

}
