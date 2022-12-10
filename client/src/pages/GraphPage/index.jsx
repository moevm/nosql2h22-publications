import React from 'react';
import './style.scss';

const GraphPage = () => {

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
            
        </div>
    );
}
export default GraphPage;