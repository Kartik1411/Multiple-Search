import React, { useState, useEffect, useContext, useReducer  } from 'react';

import Modal from './Modal/Index';
import AddNewUserModal from './AddNewUserModal';
import { UsersContext } from '../App';

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

const searchReducer = (state, action) => {
    if(action.type === "INPUT"){
        return{
            ...state,
            [action.id]: action.value
        }
    }
    return state;
} 

const editReducer = (state, action) => {
    if(action.type === "INPUT"){
        return{
            ...state,
            ...action
        }
    }
    if(action.type === "INPUTEDIT"){
        return{
            ...state,
            [action.id]: action.value
        }
    }
    if(action.type === "SUBMIT"){
        return{
            ...state,
            ...action.value
        }
    }
    return state;
} 

function MultiSearch() {

    const [users, setUsers] = useContext(UsersContext);

    const [searchValues, searchDispatch] = useReducer(
        searchReducer,
        initialSearchValues
    )

    const [editedRowValues, editDispatch] = useReducer(
        editReducer,
        initialEditedRow
    )

    // table states
    // const [inputValueName, setInputValueName] = useState("");
    // const [search, setSearch] = useState(initialSearchValues);

    // modal states
    const [showModal, setShowModal] = useState(false);
    const [showAddNewUserModal, setshowAddNewUserModal] = useState(false);

    // const [editedRow, setEditedRow] = useState(initialEditedRow);

    // const onChange = (e) => {
    //     const value = e.target.value;
    //     const id = e.target.id;
    //     setSearch((prevState) => ({ ...prevState, [id]: value }))
    // }

    const onChange = (e) => {
        searchDispatch({
            type: "INPUT",
            id: e.target.id,
            value: e.target.value
        })
    }

    const filteredData = users?.filter((user) =>
        (!searchValues.searchByName.toLowerCase() || user.name.toLowerCase().indexOf(searchValues.searchByName) !== -1) &&
        (!searchValues.searchByUsername.toLowerCase() || user.username.toLowerCase().indexOf(searchValues.searchByUsername) !== -1) &&
        (!searchValues.searchByPhone.toLowerCase() || user.phone.toLowerCase().indexOf(searchValues.searchByPhone) !== -1) && 
        (!searchValues.searchByEmail.toLowerCase() || user.email.toLowerCase().indexOf(searchValues.searchByEmail) !== -1)
    );

    // const debounceOnChange = (event) => {
    //     const inputValue = event.target.value;
    //     setInputValueName(inputValue);

    //     if(currentTimeOut){
    //         clearTimeout(currentTimeOut);
    //     }

    //     currentTimeOut = setTimeout(() => {
    //         setSearch((prevState) => ({...prevState, searchByName: inputValue.toLowerCase()}))
    //     }, 2000)
    // }

    // useEffect(() => {
    //     // console.log("making search call!");
    // }, [search.searchByName])
    

    const getSelectedRowValue = (user) => {
        setShowModal(true);
        editDispatch({
            type: "INPUT",
            name: user.name, 
            username: user.username, 
            phone: user.phone, 
            email: user.email,
            id: user.id
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setShowModal(false);
        const clickedRowID = users.findIndex((user) => user.id === editedRowValues.id);
        const newUsers = [...users];
        newUsers[clickedRowID] = editedRowValues;
        setUsers(newUsers);
        editDispatch({
            type: "SUBMIT",
            value: initialEditedRow
        })
    }

    const addNewUserButton = () => {
        setshowAddNewUserModal(true);
    }

    const addNewUserHandler = (e) => {
        e.preventDefault();
        setshowAddNewUserModal(false);
        const newUsers = [...users];
        newUsers.splice(editedRowValues.position - 1, 0, editedRowValues);

        setUsers(newUsers)
        editDispatch({
            type: "SUBMIT",
            value: initialEditedRow
        })
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
                                value={searchValues.searchByName}
                                onChange={onChange}
                                placeholder='Search by Name'/>
                            </span>
                        </th>
                        <th className='border-right'>
                            Username
                            <span style={{padding: "20px"}}>
                                <input 
                                    type="text"
                                    id="searchByUsername"
                                    value={searchValues.searchByUsername}
                                    onChange={onChange}
                                    placeholder='Search by Username'/>
                            </span>
                        </th>
                        <th className='border-right'>
                            Phone
                            <span style={{padding: "20px"}}>
                                <input 
                                    type="text"
                                    id="searchByPhone"
                                    value={searchValues.searchByPhone}
                                    onChange={onChange}
                                    placeholder='Search by Phone'/>
                            </span>
                        </th>
                        <th>
                            Email
                            <span style={{padding: "20px"}}>
                                <input 
                                    type="text"
                                    id="searchByEmail"
                                    value={searchValues.searchByEmail}
                                    onChange={onChange}
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
                    // setEditedRow={setEditedRow}
                    // editedRow={editedRow}   
                    editedRowValues={editedRowValues}
                    editDispatch={editDispatch}
                    cancel={cancelHandler}
                />
            }

            {
                showModal && <Modal 
                    show={showModal}
                    onSubmit={submitHandler}
                    // setEditedRow={setEditedRow}
                    // editedRow={editedRow}   
                    editedRowValues={editedRowValues}
                    editDispatch={editDispatch}
                />
            }

            
        </div>
    )
}

export default MultiSearch