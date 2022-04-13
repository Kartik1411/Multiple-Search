import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Modal from './Modal/Index';
import './MultiSearch.css'

let currentTimeOut;

function MultiSearch() {
    // table states
    const [users, setUsers] = useState([]);
    const [inputValueName, setInputValueName] = useState("");
    const [searchByName, setSearchByName] = useState("");
    const [searchByUsername, setSearchByUsername] = useState("");
    const [searchByPhone, setSearchByPhone] = useState("");
    const [searchByEmail, setSearchByEmail] = useState("");

    // modal states
    const [showModal, setShowModal] = useState(false);

    const [editedRow, setEditedRow] = useState({
        name: "", 
        username: "", 
        phone: "", 
        email: "" })

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

    const filteredData = users?.filter((user) =>
        (!searchByName.toLowerCase() || user.name.toLowerCase().indexOf(searchByName) !== -1) &&
        (!searchByUsername.toLowerCase() || user.username.toLowerCase().indexOf(searchByUsername) !== -1) &&
        (!searchByPhone.toLowerCase() || user.phone.toLowerCase().indexOf(searchByPhone) !== -1) && 
        (!searchByEmail.toLowerCase() || user.email.toLowerCase().indexOf(searchByEmail) !== -1)
    );

    const debounceOnChange = (event) => {
        const inputValue = event.target.value;
        setInputValueName(inputValue);

        if(currentTimeOut){
            clearTimeout(currentTimeOut);
        }

        currentTimeOut = setTimeout(() => {
            setSearchByName(inputValue.toLowerCase());
        }, 2000)
    }

    useEffect(() => {
        // console.log("making search call!");
    }, [searchByName])
    

    const getSelectedRowValue = (user) => {
        setShowModal(true);
        setEditedRow(user)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setShowModal(false);
        const clickedRowID = users.findIndex((user) => user.id === editedRow.id);
        const newUsers = [...users];
        newUsers[clickedRowID] = editedRow;
        setUsers(newUsers)
    }

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
                                value={inputValueName}
                                onChange={debounceOnChange}
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
                                    onChange={(e) => setSearchByUsername((e.target.value).toLowerCase())}
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
                                    onChange={(e) => setSearchByPhone((e.target.value).toLowerCase())}
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
                                    onChange={(e) => setSearchByEmail((e.target.value).toLowerCase())}
                                    placeholder='Search by Email'/>
                            </span>
                        </th>
                    </tr>

                    {
                        filteredData?.map((user) => {
                            return (
                                <tr onClick={()=> getSelectedRowValue(user)} key={user.id}>
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
            {showModal && <Modal 
                show={showModal}
                onSubmit={submitHandler}
                setEditedRow={setEditedRow}
                editedRow={editedRow}
            />}
        </div>
    )
}

export default MultiSearch