import React from 'react';
import '../Modal/Modal.css';

function AddNewUserModal(props) {

    if(!props.showAddNewUserModal){
        return;
    }

    const usersPosition = [];

    for(let i = 0; i < props.usersLength + 1; i++){
        usersPosition[i] = i + 1;
    }

    const editedRow = props.editedRow;
    const setEditedRow = props.setEditedRow;

    const onChange = (e) => {
        const value = e.target.value;
        const id = e.target.id; 
        setEditedRow((prevState) => ({ ...prevState, [id]: value }))
    }

    
    return (
        <div className='modal'>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h2 className='modal-title'>Add New User</h2>
                </div>

                <div className='modal-body'>
                    <form className='edit-form' onSubmit={props.onSubmit}>
                    <label>Name</label>
                    <label>Name</label>
                        <input type="text" id="name" value={editedRow.name} onChange={onChange} required="required" />
                        <label>Username</label>
                        <input type="text" id="username" value={editedRow.username} onChange={onChange} required="required" />
                        <label>Phone Number</label>
                        <input type="text" id="phone" value={editedRow.phone} onChange={onChange} required="required" />
                        <label>Email</label>
                        <input type="email" id="email" value={editedRow.email} onChange={onChange} required="required" />

                        <select id="position" onChange={onChange}>
                            <option>
                                Select Position to Add
                            </option>
                            {
                                
                                usersPosition.map((userPostion, key) => 
                                    <option value={userPostion} key={key}>{userPostion}</option>
                                )
                            }
                        </select>
                        <button>Submit</button>
                        <button onClick={props.cancel}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNewUserModal;