import React from 'react';
import './style.scss'
const Selector = ({onChange, value, options = [], placeholder, className}) => {
    return(
        <select className={`selector ${className}`} onChange={onChange} value={value}>
            <option value="">
                {
                    placeholder
                }
            </option>
            {
                options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.text}
                    </option>
                ))
            }
        </select>
    );
}
export default Selector;