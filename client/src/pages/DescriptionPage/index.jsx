import BackButton from 'components/BackButton/BackButton';
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {useLocation} from "react-router-dom";
import './style.scss';

const DescriptionPage = () => {
    const id = useParams();
    const [data, setData] = useState({});

    const getDescription = async () => {
        let data = await fetch('http://localhost:8000/api/v1/description', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({params: id}),
        });
        if(!data.ok){
            console.error(data);
        } else{
            data = await data.json();
            setData(data);
        }
    }

    React.useEffect(() => {
        getDescription();
    }, [id]);


    return(
        <div className='description'>
            <div className="description__container">
                <div className="description__block">
                    <div className="description__block-desc">
                        <BackButton link={-1}/>
                        <h1 className="description__block-title">
                            Описание публикации
                        </h1>
                    </div>
                    <div className="description-block-info">
                        <h2 className="description-block-info__title">
                            {data.name_publication}
                        </h2>
                        <div className="description-block-info__author">
                            {data.FIO && data.FIO.map((man, index) => <span key={index}>{man},</span>)}
                        </div>
                        <div className="description-block-info__edition">
                            <div className="description-block-info__type-edition">Тип издания: {data.type_edition}</div>
                            <div className="description-block-info__name-edition">{data.name_edition}</div>
                        </div>
                        <div className="description-block-info__year-and-index">
                            <div className="description-block-info__year">{data.year_publication}</div>
                            <div className="description-block-info__index">{data.index}</div>
                        </div>
                        <div className="description-block-info__edition">
                            <div className="description-block-info__type-edition">Организация: {data.name_organization}</div>
                            <div className="description-block-info__name-edition">Количество цитат: {data.number_quotes}</div>
                        </div>
                        <div className="description-block-info__annotation">
                            <div className="description-block-info__annotation-title">Аннотация:</div>
                            <div className="description-block-info_annotation-text">{data.description}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DescriptionPage;