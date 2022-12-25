import BackButton from 'components/BackButton/BackButton';
import React from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {useLocation} from "react-router-dom";
import './style.scss';

const DescriptionPage = () => {

    /*const [users, setUsers] = React.useState([]);

    const getUsers = async () => {
        let data = await fetch('http://localhost:8000/api/v1/hello');
        if(!data.ok){
            console.error(data);
        } else{
            data = await data.json();
            setUsers(data);
        }
    }*/

    return(
        <div className='description'>
            <div class="description__container">
                <div class="description__block">
                    <div class="description__block-desc">
                        <BackButton link='../'/>
                        <h1 class="description__block-title">
                            Описание публикации
                        </h1>
                    </div>
                    <div class="description-block-info">
                        <h2 class="description-block-info__title">
                            Название публикации
                        </h2>
                        <div class="description-block-info__author">
                            Автор публикации
                        </div>
                        <div class="description-block-info__edition">
                            <div class="description-block-info__type-edition">Тип издания: </div>
                            <div class="description-block-info__name-edition">Название издания</div>
                        </div>
                        <div class="description-block-info__year-and-index">
                            <div class="description-block-info__year">Год издания</div>
                            <div class="description-block-info__index">Индекс издания</div>
                        </div>
                        <div class="description-block-info__annotation">
                            <div class="description-block-info__annotation-title">Аннотация:</div>
                            <div class="description-block-info_annotation-text"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DescriptionPage;