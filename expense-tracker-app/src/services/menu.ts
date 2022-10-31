import axios from 'axios';
import DataList from '../model/DataList';

const getDataFromJsonServer = () => {
    return axios.get<DataList[]>('http://localhost:3001/items')
            .then( response => response.data )
};

const pushDataToJsonServer = ( newDataAdded : Omit<DataList, 'id'> ) => {
    console.log(newDataAdded);
    return axios.post<DataList>(
        'http://localhost:3001/items',
        newDataAdded,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    .then( response => response.data )
};

export {
    getDataFromJsonServer,
    pushDataToJsonServer
}
