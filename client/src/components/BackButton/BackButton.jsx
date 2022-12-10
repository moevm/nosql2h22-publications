import React from 'react';
import Button from '../Button/Button';
import './style.scss';

import ArrowBack from 'assets/arrow-back.svg';
const BackButton = ({link}) => {
    return(
        <Button 
            text={
                <img src={ArrowBack} alt='Go back' />
            }
            link={link}
            type='small'
        />
    );
}
export default BackButton;