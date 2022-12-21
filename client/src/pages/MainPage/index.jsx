import React, {useState} from 'react';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import './style.scss';
import Selector from 'components/Selector/Selector';

import useNavigateSearch from 'hooks/useNavigateQuery';
import Title from 'components/Title/Title';

const optionAPI = [
    {
        text: 'Google Scholar',
        value: 'Google Scholar'
    },
    {
        text: 'КиберЛенинка',
        value: 'CyberLeninka'
    },
    {
        text: 'Elibrary',
        value: 'elibrary'
    }
];

const optionEditionType = [
    {
        text: 'Журнал',
        value: 'Журнал'
    },
    {
        text: 'Конференция',
        value: 'Конференция'
    }  
];

const optionIndex = [
    {
        text: 'ВАК',
        value: 'ВАК'
    },
    {
        text: 'РИНЦ',
        value: 'РИНЦ',
    },
    {
        text: 'Scopus',
        value: 'Scopus',
    },
]

const MainPage = () => {

    const [inputs, setInputs] = useState({
        FIO: null,
        name_publication: null,
        year_publication: null,
        name_organization: null,
        name_edition: null,
        type_edition: null,
        API: null,
        index: null,
        number_quotes: null,
    });

    const handleChange = (name, value) => {
        setInputs({
            ...inputs, 
            [name]: value,
        });
    }

    const navigate = useNavigateSearch();

    const importDB = () => {}
    const exportDB = () => {}
 
    return(
        <div className='main'>
            <div className="main__container">
                <div className="main__buttons">
                    <Button onClick={importDB} type='medium' text='Импорт БД'/>
                    <Button onClick={exportDB} type='medium' text='Экспорт БД'/>
                </div>
                <div className="main__actions wrapper">
                    <Title text='Поиск научных публикаций'/>
                    <div className="main__inputs">
                        <Input 
                            placeholder='ФИО' 
                            value={inputs.FIO} 
                            onChange={e => handleChange('FIO', e.target.value)}
                            className='main__input'
                        />
                        <Input 
                            placeholder='Название публикации' 
                            value={inputs.name_publication} 
                            onChange={e => handleChange('name_publication', e.target.value)}
                            className='main__input'
                        />
                        <Input 
                            type='number'
                            min={1000}
                            max={2023}
                            placeholder='Год публикации' 
                            value={inputs.year_publication} 
                            onChange={e => handleChange('year_publication', e.target.value)}
                            className='main__input'
                        />
                        <Input 
                            placeholder='Организация' 
                            value={inputs.name_organization} 
                            onChange={e => handleChange('name_organization', e.target.value)}
                            className='main__input'
                        />
                        <Selector 
                            placeholder='Тип издания' 
                            value={inputs.type_edition} 
                            onChange={e => handleChange('type_edition', e.target.value)}
                            options={optionEditionType}
                            className='main__selector'
                        />
                        <Input 
                            placeholder='Название издания'   
                            value={inputs.name_edition} 
                            onChange={e => handleChange('name_edition', e.target.value)}
                            className='main__input'
                        />
                        <Input
                            type='number'
                            min={0}
                            placeholder='Количество цитат'
                            value={inputs.number_quotes}
                            onChange={e => handleChange('number_quotes', e.target.value)}
                            className='main__input'
                        />
                        <Selector 
                            placeholder='API' 
                            value={inputs.API} 
                            onChange={e => handleChange('API', e.target.value)}
                            options={optionAPI}
                            className='main__selector'
                        />
                        <Selector 
                            placeholder='index' 
                            value={inputs.index} 
                            onChange={e => handleChange('index', e.target.value)}
                            options={optionIndex}
                            className='main__selector'
                        />
                    </div>
                    <Button text='Поиск' onClick={() => {
                        let inputsClear = Object.keys(inputs)
                            .filter((k) => inputs[k] != null)
                            .reduce((a, k) => ({ ...a, [k]: inputs[k] }), {});
                        navigate('/search', inputsClear);
                    }}/>
                </div>
            </div>
        </div>
    );
}
export default MainPage;