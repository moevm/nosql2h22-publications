import React from 'react';
import './style.scss'
const Input = ({placeholder, onChange, value}) => {
    return(
        <input className='input' placeholder={placeholder} onChange={onChange} value={value}/>
    );
}
export default Input;