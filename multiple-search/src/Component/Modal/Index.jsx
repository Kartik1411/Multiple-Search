import React, {useState, forwardRef, useImperativeHandle} from 'react';
import './Modal.css'

function Modal(props) {

    if(!props.show){
        return;
    }

    return (
        <div className='modal'>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h2 className='modal-title'>Edit Your Details</h2>
                </div>

                <div className='modal-body'>
                    <form className='edit-form' onSubmit={props.onSubmit}>
                        <label>Name</label>
                        <input type="text" defaultValue={props.selectedRowValue.name} onChange={(e) => props.setEditedRow((prevState) => ({ ...prevState, name: e.target.value }))} required="required" />
                        <label>Username</label>
                        <input type="text" defaultValue={props.selectedRowValue.username} onChange={(e) => props.setEditedRow((prevState) => ({ ...prevState, username: e.target.value }))} required="required" />
                        <label>Phone Number</label>
                        <input type="text" defaultValue={props.selectedRowValue.phone} onChange={(e) => props.setEditedRow((prevState) => ({ ...prevState, phone: e.target.value }))} required="required" />
                        <label>Email</label>
                        <input type="email"defaultValue={props.selectedRowValue.email} onChange={(e) => props.setEditedRow((prevState) => ({ ...prevState, email: e.target.value }))} required="required" />
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal;