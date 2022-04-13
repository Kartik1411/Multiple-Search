import React, {useState, forwardRef, useImperativeHandle} from 'react';
import './Modal.css'

function Modal(props) {

    if(!props.show){
        return;
    }
    
    const editedRow = props.editedRow;
    const setEditedRow = props.setEditedRow;

    return (
        <div className='modal'>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h2 className='modal-title'>Edit Your Details</h2>
                </div>

                <div className='modal-body'>
                    <form className='edit-form' onSubmit={props.onSubmit}>
                        <label>Name</label>
                        <input type="text" value={editedRow.name} onChange={(e) => setEditedRow((prevState) => ({ ...prevState, name: e.target.value }))} required="required" />
                        <label>Username</label>
                        <input type="text" value={editedRow.username} onChange={(e) => setEditedRow((prevState) => ({ ...prevState, username: e.target.value }))} required="required" />
                        <label>Phone Number</label>
                        <input type="text" value={editedRow.phone} onChange={(e) => setEditedRow((prevState) => ({ ...prevState, phone: e.target.value }))} required="required" />
                        <label>Email</label>
                        <input type="email" value={editedRow.email} onChange={(e) => setEditedRow((prevState) => ({ ...prevState, email: e.target.value }))} required="required" />
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal;