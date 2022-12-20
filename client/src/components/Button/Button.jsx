import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
const Button = ({type='large', onClick, link, text}) => {
    return(
        link ? (
            <Link className={`btn btn_${type}`} to={link}>
                {text}
            </Link>
            ) :
            (
                <button onClick={onClick} className={`btn btn_${type}`}>
                    {text}
                </button>
            )
    );
}
export default Button;