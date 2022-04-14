import './App.css';
import React, { useEffect, useState  } from 'react';
import axios from 'axios';
import MultiSearch from './Component/MultiSearch';

export const UsersContext = React.createContext([]);

function App() {
  
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    await axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
        // console.log("fetch called")
        setUsers(response.data);
    }).catch((err) => {
        console.log(err);
    })
}

  useEffect(() => {
      fetchData();
  },[])

  return (
    <UsersContext.Provider value={[users]}>
      <div className="App">
        <MultiSearch />
      </div>
    </UsersContext.Provider>
  );
}

export default App;
