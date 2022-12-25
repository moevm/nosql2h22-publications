import BackButton from 'components/BackButton/BackButton';
import Title from 'components/Title/Title';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './style.scss';

import {paramsToObject} from 'helpers/urlParamsToObject';
import Button from 'components/Button/Button';
import { Link } from 'react-router-dom';

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

    const exportDB = async (params) => {
        let data = await fetch('http://localhost:8000/api/v1/export-table', {
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
            let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
            let dlAnchorElem = document.createElement("a");
            dlAnchorElem.setAttribute("href", dataStr);
            dlAnchorElem.setAttribute("download", "export_table.json");
            dlAnchorElem.click();
        }
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
                            Array.from(searchParams.values()).filter(item => item).map((item, index) => (
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
                                    {
                                        searchParams.get('number_quotes') ? <th>Количество цитат</th> : null
                                    }
                                    {
                                        searchParams.get('type_edition') ? <th>Типа издания</th> : null
                                    }
                                    {
                                        searchParams.get('index') ? <th>Индекс</th> : null
                                    }
                                    {
                                        searchParams.get('name_organization') ? <th>Организация</th> : null
                                    }
                                </tr>
                            </thead>
                            <tbody className="search-table__body">
                                {
                                    searchData.map(item => (
                                        <tr key={item.id_publication} className="search-table__row">
                                            <td><Link to={`/publication/${item['_id']}`} className="search__link">{item.name_publication}</Link></td>
                                            <td>{
                                                item.FIO.map((man, index) => <span key={index}>{man},</span>)
                                            }</td>
                                            <td>{item.year_publication}</td>
                                            <td>{item.name_edition}</td>
                                            <td>{item.API}</td>
                                            <td>{item.description.slice(0, 100) + '...'}</td>
                                            {
                                                searchParams.get('number_quotes') ? <td>{item.number_quotes}</td> : null
                                            }
                                            {
                                                searchParams.get('type_edition') ? <td>{item.type_edition}</td> : null
                                            }
                                            {
                                                searchParams.get('index') ? <td>{item.index}</td> : null
                                            }
                                            {
                                                searchParams.get('name_organization') ? <td>{item.name_organization}</td> : null
                                            }
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
                            <Button text='Экспорт' onClick={() => {exportDB(paramsToObject(searchParams.entries()))}} value="download"/>
                        </div>
                    </div> : <Title text='К сожалению, по заданным параметрам не удалось найти публикации.'/>
                }
                </div> 
            </div>
        </div>
    );
}
export default SearchPage;