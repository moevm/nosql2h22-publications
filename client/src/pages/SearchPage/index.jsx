import BackButton from 'components/BackButton/BackButton';
import Title from 'components/Title/Title';
import React from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {useLocation} from "react-router-dom";
import './style.scss';

import {paramsToObject} from 'helpers/urlParamsToObject';
import Button from 'components/Button/Button';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const [searchData, setSearchData] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(0);

    const getSearchData = async (params) => {
        let data = await fetch('http://localhost:8000/api/v1/publication', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params),
        });
        if(!data.ok){
            console.error(data);
        } else{
            data = await data.json();
            setSearchData(data.result);
            setTotal(data.total);
        }
    }

    const handlePaginationClick = (page) => {
        setCurrentPage(page);
    }

    React.useEffect(() => {
        const obj = paramsToObject(searchParams.entries());
        getSearchData({params: obj, page: currentPage});
    }, [searchParams, currentPage]);

    return(
        <div className='search'>
            <div className="search__container">
                <div className="search__top">
                    <BackButton link='/'/>
                    <div className='search__title'><Title text='Поиск научных публикаций'/></div>
                </div>
                <div className="wrapper search__wrapper">
                    <div className="search__params">
                        {
                            Array.from(searchParams.values()).map((item, index) => (
                                <span key={index} className='search__param'>{item}</span>
                            ))
                        }
                    </div>
                    <Button text='Статистика' link='/description'/>
                </div>
                <div className="wrapper search__wrapper">
                { total ?
                    <div className="search-table">
                        <p className='search-table__amount'>
                            Количество результатов: {total}
                        </p>
                        <table className='search-table__table'>
                            <thead className="search-table__head">
                                <tr className='search-table__row'>
                                    <th>Название</th>
                                    <th>Авторы</th>
                                    <th>Год публикации</th>
                                    <th>Издание</th>
                                    <th>API</th>
                                    <th>Краткое описание</th>
                                </tr>
                            </thead>
                            <tbody className="search-table__body">
                                {
                                    searchData.map(item => (
                                        <tr key={item.id_publication} className="search-table__row">
                                            <td>{item.name_publication}</td>
                                            <td>{
                                                item.FIO.map((man, index) => <span key={index}>{man},</span>)
                                            }</td>
                                            <td>{item.year_publication}</td>
                                            <td>{item.name_edition}</td>
                                            <td>{item.API}</td>
                                            <td>{item.description.slice(0, 100) + '...'}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className="search-pagination">
                            {
                                [...Array(Math.ceil(total / 10)).keys()].map(item => (
                                    <div 
                                        key={item}
                                        onClick={() => handlePaginationClick(item)}
                                        className={`
                                            search-pagination__number 
                                            ${item === currentPage ? 
                                                'search-pagination_active' :
                                                ''}
                                        `}>
                                        {item}
                                    </div>
                                ))
                            }
                        </div>
                        <div className="search-table__btn">
                            <Button text='Экспорт' onClick={() => {}}/>
                        </div>
                    </div> : <Title text='К сожалению, по заданным параметрам не удалось найти публикации.'/>
                }
                </div> 
            </div>
        </div>
    );
}
export default SearchPage;