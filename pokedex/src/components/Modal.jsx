import React, { useContext } from 'react'
import ReactDom from 'react-dom'
import { PokeContext } from '../context/PokeContext';

const Modal = (props) => {
    const { children, handleCloseModal } = useContext(PokeContext);
    return ReactDom.createPortal(
        <div className='modal-container'>
            <button onClick={handleCloseModal} className='modal-underlay'></button>
            <div className='modal-content'>
                {children}
            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default Modal