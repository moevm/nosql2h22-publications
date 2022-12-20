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
        value: 'google'
    },
    {
        text: 'КиберЛенинка',
        value: 'lenin'
    },
    {
        text: 'Publons API',
        value: 'publons'
    }
];

const optionEditionType = [
    {
        text: 'Журнал',
        value: 'journal'
    },
    {
        text: 'Конференция',
        value: 'conference'
    }  
];

const MainPage = () => {

    const [inputs, setInputs] = useState({
        FIO: '',
        publication: '',
        year: '',
        organisation: '',
        edition: '',
        edition_type: '',
        api: '',
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
                            value={inputs.publication} 
                            onChange={e => handleChange('publication', e.target.value)}
                            className='main__input'
                        />
                        <Input 
                            placeholder='Год публикации' 
                            value={inputs.year} 
                            onChange={e => handleChange('year', e.target.value)}
                            className='main__input'
                        />
                        <Input 
                            placeholder='Организация' 
                            value={inputs.organisation} 
                            onChange={e => handleChange('organisation', e.target.value)}
                            className='main__input'
                        />
                        <Selector 
                            placeholder='Тип издания' 
                            value={inputs.edition_type} 
                            onChange={e => handleChange('edition_type', e.target.value)}
                            options={optionEditionType}
                            className='main__selector'
                        />
                        <Input 
                            placeholder='Название издания'   
                            value={inputs.edition} 
                            onChange={e => handleChange('edition', e.target.value)}
                            className='main__input'
                        />
                        <Selector 
                            placeholder='API' 
                            value={inputs.api} 
                            onChange={e => handleChange('api', e.target.value)}
                            options={optionAPI}
                            className='main__selector'
                        />
                    </div>
                    <Button text='Поиск' onClick={() => {
                        navigate('/search', inputs);
                    }}/>
                </div>
            </div>
        </div>
    );
}
export default MainPage;