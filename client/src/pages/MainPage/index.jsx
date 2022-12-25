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
        year_publication: {},
        name_organization: null,
        name_edition: null,
        type_edition: null,
        API: null,
        index: null,
        number_quotes: {},
    });

    const handleChange = (name, value) => {
        setInputs({
            ...inputs, 
            [name]: value,
        });
    }

    const handleChangeRange = (name, second, value) => {
        setInputs({
            ...inputs, 
            [name]: {
                ...inputs[name],
                [second]: value
            },
        });
    }

    const navigate = useNavigateSearch();

    const importDB = async () => {
        const upload = document.createElement("input");
        upload.setAttribute("type", "file");
        upload.addEventListener('change', function (e) {
            try {
                const upload = e.target.files[0];
                const reader = new FileReader();
                reader.addEventListener('load', (function (file) {
                    return async function (e) {
                        let json = JSON.parse(e.target.result);
                        let data = await fetch('http://localhost:8000/api/v1/import', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(json)
                        });
                    }
                })(upload));
                reader.readAsText(upload);
                  
            }
            catch (ex) {
                console.log(ex);
            }
        });
        upload.click();
    }
    

    const exportDB = async () => {
        let data = await fetch('http://localhost:8000/api/v1/export', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if(!data.ok){
            console.error(data);
        } else{
            data = await data.json();
            let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
            let dlAnchorElem = document.createElement("a");
            dlAnchorElem.setAttribute("href", dataStr);
            dlAnchorElem.setAttribute("download", "export_data.json");
            dlAnchorElem.click();
        }
    }
 
    return(
        <div className='main'>
            <div className="main__container">
                <div className="main__buttons">
                    <Button onClick={importDB} type='medium' text='Импорт БД' value = "load"/>
                    <Button onClick={exportDB} type='medium' text='Экспорт БД' value="download"/>
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
                        <div className="main-range main__input">
                            <Input 
                                type='number'
                                min={1000}
                                max={inputs.year_publication.to || 2023}
                                placeholder='Год(от)' 
                                value={inputs.year_publication.from} 
                                onChange={e => handleChangeRange('year_publication', 'from', e.target.value)}
                                className='main-range__input'
                            />
                            <Input 
                                type='number'
                                min={inputs.year_publication.from || 1000}
                                max={2023}
                                placeholder='Год(до)' 
                                value={inputs.year_publication.to} 
                                onChange={e => handleChangeRange('year_publication', 'to', e.target.value)}
                                className='main-range__input'
                            />
                        </div>

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
                        <div className="main-range main__input">
                            <Input
                                type='number'
                                min={0}
                                max={inputs.number_quotes.to || 'none'}
                                placeholder='Цитаты(от)'
                                value={inputs.number_quotes.from} 
                                onChange={e => handleChangeRange('number_quotes', 'from', e.target.value)}
                                className='main-range__input'
                            />
                            <Input
                                type='number'
                                min={inputs.number_quotes.from || 0}
                                placeholder='Цитаты(до)'
                                value={inputs.number_quotes.to} 
                                onChange={e => handleChangeRange('number_quotes', 'to', e.target.value)}
                                className='main-range__input'
                            />
                        </div>
                        
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
                            .filter((k) => inputs[k] !== null && (inputs[k].constructor === Object ? Object.keys(inputs[k]).length !== 0 : true))
                            .reduce((a, k) => {
                                const value = inputs[k].constructor === Object ? JSON.stringify(inputs[k]) : inputs[k];
                                return ({ ...a, [k]: value })
                            }, {});
                        navigate('/search', inputsClear);
                    }}/>
                </div>
            </div>
        </div>
    );
}
export default MainPage;