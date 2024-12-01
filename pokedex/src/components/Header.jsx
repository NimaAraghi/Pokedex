import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { PokeContext } from '../context/PokeContext'

const Header = () => {
    const { handleToggleMenu } = useContext(PokeContext);
    return (
        <header>
            <button onClick={() => handleToggleMenu()} className='open-nav-button'>
                <FontAwesomeIcon icon={faBars} />
            </button>
            <h1 className='text-gradient'>Pokédex</h1>
        </header>
    )
}

export default Header