import React from 'react';
import './style.scss'
const Input = ({placeholder, onChange, value, className, ...props}) => {
    return(
        <input {...props} className={`input ${className}`} placeholder={placeholder} onChange={onChange} value={value}/>
    );
}
export default Input;