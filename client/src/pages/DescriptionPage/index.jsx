import BackButton from 'components/BackButton/BackButton';
import React from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {useLocation} from "react-router-dom";
import './style.scss';

const DescriptionPage = () => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState({});

    const getDescription = async (params) => {
        let data = await fetch('http://localhost:8000/api/v1/description', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({params: params}),
        });
        if(!data.ok){
            console.error(data);
        } else{
            data = await data.json();
            setData(data);
            console.log(data);
        }
    }

    React.useEffect(() => {
        const id = searchParams.get('id');
        getDescription(id);
    }, [searchParams]);


    return(
        <div className='description'>
            <div class="description__container">
                <div class="description__block">
                    <div class="description__block-desc">
                        <BackButton link='/search'/>
                        <h1 class="description__block-title">
                            Описание публикации
                        </h1>
                    </div>
                    <div class="description-block-info">
                        <h2 class="description-block-info__title">
                            {data.name_publication}
                        </h2>
                        <div class="description-block-info__author">
                            {data.FIO}
                        </div>
                        <div class="description-block-info__edition">
                            <div class="description-block-info__type-edition">Тип издания: {data.type_edition}</div>
                            <div class="description-block-info__name-edition">{data.name_edition}</div>
                        </div>
                        <div class="description-block-info__year-and-index">
                            <div class="description-block-info__year">{data.year_publication}</div>
                            <div class="description-block-info__index">{data.index}</div>
                        </div>
                        <div class="description-block-info__annotation">
                            <div class="description-block-info__annotation-title">Аннотация:</div>
                            <div class="description-block-info_annotation-text">{data.description}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DescriptionPage;