import React from 'react';
import './style.scss';

const MainPage = () => {

    const [users, setUsers] = React.useState([]);

    const getUsers = async () => {
        let data = await fetch('http://localhost:8000/api/v1/hello');
        if(!data.ok){
            console.error(data);
        } else{
            data = await data.json();
            setUsers(data);
        }
    }

    return(
        <div className='main'>
            <h1 className="main__title">Hello world app!</h1>
            <button className="main__button" onClick={getUsers}>
                Click to get data from MongoDB:)
            </button>
            <ul className="main__list">
                {
                    users.map(item => (
                        <li className="main__item">{item.name}</li>
                    ))
                }
            </ul>
        </div>
    );
}
export default MainPage;