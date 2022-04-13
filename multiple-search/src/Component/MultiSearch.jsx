import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Modal from './Modal/Index';
import AddNewUserModal from './AddNewUserModal';
import './MultiSearch.css'

let currentTimeOut;

const initialEditedRow = {
    name: "", 
    username: "", 
    phone: "", 
    email: "" ,
    position: ""
}

const initialSearchValues = {
    searchByName: "",
    searchByUsername: "",
    searchByPhone: "",
    searchByEmail: ""
} 

function MultiSearch() {
    // table states
    const [users, setUsers] = useState([]);
    const [inputValueDebounce, setInputValueDebounce] = useState(initialSearchValues);
    const [search, setSearch] = useState(initialSearchValues);

    // modal states
    const [showModal, setShowModal] = useState(false);
    const [showAddNewUserModal, setshowAddNewUserModal] = useState(false);

    const [editedRow, setEditedRow] = useState(initialEditedRow);
        
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
        (!search.searchByName.toLowerCase() || user.name.toLowerCase().indexOf(search.searchByName) !== -1) &&
        (!search.searchByUsername.toLowerCase() || user.username.toLowerCase().indexOf(search.searchByUsername) !== -1) &&
        (!search.searchByPhone.toLowerCase() || user.phone.toLowerCase().indexOf(search.searchByPhone) !== -1) && 
        (!search.searchByEmail.toLowerCase() || user.email.toLowerCase().indexOf(search.searchByEmail) !== -1)
    );

    const debounceOnChange = (event) => {
        const inputValue = event.target.value;
        const id = event.target.id;
        setInputValueDebounce((prevState) => ({...prevState, [id]: inputValue}));

        if(currentTimeOut){
            clearTimeout(currentTimeOut);
        }

        currentTimeOut = setTimeout(() => {
            setSearch((prevState) => ({...prevState, [id]: inputValue.toLowerCase()}))
        }, 2000)
    }

    useEffect(() => {
        // console.log("making search call!");
    }, [search.searchByName])
    

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
        setUsers(newUsers);
        setEditedRow(initialEditedRow)
    }

    const addNewUserButton = () => {
        setshowAddNewUserModal(true);
    }

    const addNewUserHandler = (e) => {
        e.preventDefault();
        setshowAddNewUserModal(false);
        const newUsers = [...users];
        newUsers.splice(editedRow.position - 1, 0, editedRow);

        setUsers(newUsers)
        setEditedRow(initialEditedRow)
    }

    const cancelHandler = (e) => {
        e.preventDefault();
        setshowAddNewUserModal(false);
    }

    return (
        <div className='container'>
            <button onClick={addNewUserButton}>Add New User</button>

            <table>
                <tbody>
                    <tr>
                        <th className='border-right'>
                            S.No.
                        </th>
                        <th className='border-right'>
                            Name  
                            <span style={{padding: "20px"}}>
                            <input 
                                type="text"
                                id="searchByName"
                                value={inputValueDebounce.name}
                                onChange={debounceOnChange}
                                placeholder='Search by Name'/>
                            </span>
                        </th>
                        <th className='border-right'>
                            Username
                            <span style={{padding: "20px"}}>
                                <input 
                                    type="text"
                                    id="searchByUsername"
                                    value={inputValueDebounce.username}
                                    onChange={debounceOnChange}
                                    placeholder='Search by Username'/>
                            </span>
                        </th>
                        <th className='border-right'>
                            Phone
                            <span style={{padding: "20px"}}>
                                <input 
                                    type="text"
                                    id="searchByPhone"
                                    value={inputValueDebounce.phone}
                                    onChange={debounceOnChange}
                                    placeholder='Search by Phone'/>
                            </span>
                        </th>
                        <th>
                            Email
                            <span style={{padding: "20px"}}>
                                <input 
                                    type="text"
                                    id="searchByEmail"
                                    value={inputValueDebounce.email}
                                    onChange={debounceOnChange}
                                    placeholder='Search by Email'/>
                            </span>
                        </th>
                    </tr>

                    {
                        filteredData?.map((user, key) => {
                            return (
                                <tr onClick={()=> getSelectedRowValue(user)} key={key}>
                                    <td className='border-right'>{key + 1}</td>
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
            

            {
                showAddNewUserModal && <AddNewUserModal 
                    showAddNewUserModal={showAddNewUserModal} 
                    onSubmit={addNewUserHandler}
                    usersLength={users.length}
                    setEditedRow={setEditedRow}
                    editedRow={editedRow}   
                    cancel={cancelHandler}
                />
            }

            {
                showModal && <Modal 
                    show={showModal}
                    onSubmit={submitHandler}
                    setEditedRow={setEditedRow}
                    editedRow={editedRow}   
                />
            }

            
        </div>
    )
}

export default MultiSearch