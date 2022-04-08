import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MultiSearch.css'

function MultiSearch() {
    const [users, setUsers] = useState();
    const [searchByName, setSearchByName] = useState("");
    const [searchByUsername, setSearchByUsername] = useState("");
    const [searchByPhone, setSearchByPhone] = useState("");
    const [searchByEmail, setSearchByEmail] = useState("");

    const fetchedData = async () => {
        await axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            setUsers(response.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchedData();
    },[]);

    const filteredData = users?.filter((user) =>
        (user.name.indexOf(searchByName) !== -1) &&
        (user.username.indexOf(searchByUsername) !== -1) &&
        (user.phone.indexOf(searchByPhone) !== -1) && 
        (user.email.indexOf(searchByEmail) !== -1)
    );


    return (
        <div className='container'>
            <table>
                <tbody>
                    <tr>
                        <th className='border-right'>
                            Name  
                            <span style={{padding: "20px"}}>
                            <input 
                                type="text"
                                name='name'
                                value={searchByName}
                                onChange={(e) => setSearchByName(e.target.value)}
                                placeholder='Search by Name'/>
                            </span>
                        </th>
                        <th className='border-right'>
                            Username
                            <span style={{padding: "20px"}}>
                                <input 
                                    type="text"
                                    name='username'
                                    value={searchByUsername}
                                    onChange={(e) => setSearchByUsername(e.target.value)}
                                    placeholder='Search by Username'/>
                            </span>
                        </th>
                        <th className='border-right'>
                            Phone
                            <span style={{padding: "20px"}}>
                                <input 
                                    type="text"
                                    name='phone'
                                    value={searchByPhone}
                                    onChange={(e) => setSearchByPhone(e.target.value)}
                                    placeholder='Search by Phone'/>
                            </span>
                        </th>
                        <th>
                            Email
                            <span style={{padding: "20px"}}>
                                <input 
                                    type="text"
                                    name='email'
                                    value={searchByEmail}
                                    onChange={(e) => setSearchByEmail(e.target.value)}
                                    placeholder='Search by Email'/>
                            </span>
                        </th>
                    </tr>
                
                    {
                        filteredData?.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <td className='border-right'>{user.name}</td>
                                    <td className='border-right'>{user.username}</td>
                                    <td className='border-right'>{user.phone}</td>
                                    <td>{user.email}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MultiSearch