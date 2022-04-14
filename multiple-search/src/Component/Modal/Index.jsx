import React from 'react';
import './Modal.css'

function Modal(props) {

    if(!props.show){
        return;
    }
    
    // const editedRow = props.editedRow;
    // const setEditedRow = props.setEditedRow;

    // const onChange = (e) => {
    //     const value = e.target.value;
    //     const id = e.target.id; 
    //     setEditedRow((prevState) => ({ ...prevState, [id]: value }))
    // }

    const editedRowValues = props.editedRowValues
    const editDispatch = props.editDispatch;

    const onChange = (e) => {
        editDispatch({
            type: "INPUTEDIT",
            id: e.target.id,
            value: e.target.value
        })
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
                        <input type="text" id="name" value={editedRowValues.name} onChange={onChange} required="required" />
                        <label>Username</label>
                        <input type="text" id="username" value={editedRowValues.username} onChange={onChange} required="required" />
                        <label>Phone Number</label>
                        <input type="text" id="phone" value={editedRowValues.phone} onChange={onChange} required="required" />
                        <label>Email</label>
                        <input type="email" id="email" value={editedRowValues.email} onChange={onChange} required="required" />
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal;