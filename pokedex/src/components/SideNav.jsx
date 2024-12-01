import React, { useContext, useState } from 'react'
import { first151Pokemon, getFullPokedexNumber } from '../utils/index'
import { PokeContext } from '../context/PokeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'

const SideNav = () => {
    const {selectedPokemon, setSelectedPokemon, handleToggleMenu, showSideMenu} = useContext(PokeContext);
    const [searchValue, setSearchValue] = useState("");
    
    const filteredPokemon = first151Pokemon.filter((ele, eleIndex) => {
        // if the full pokedex number includes the current search value, then return true
        if(getFullPokedexNumber(eleIndex).includes(searchValue)) return true;
        // if the pokemon name icludes the search value, return true
        if(ele.toLowerCase().includes(searchValue.toLowerCase())) return true;
        // else exclude value from array
        return false;
    });
    return (
        <nav className={`${!showSideMenu ? 'open' : ''}`}>
            <div className={`header ${!showSideMenu ? 'open' : ''}`}>
                <button onClick={() => handleToggleMenu()} className='open-nav-button'>
                    <FontAwesomeIcon icon={faArrowLeftLong} />
                </button>
                <h1 className='text-gradient'>Pokédex</h1>
            </div>
            <input placeholder='E.g 001 or Bullba..' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="text" />
            {filteredPokemon.map((pokemon, pokemonIndex) => {
                const truePokedexNumber = first151Pokemon.indexOf(pokemon);
                return (
                    <button onClick={() => {
                        setSelectedPokemon(truePokedexNumber);
                        !showSideMenu && handleToggleMenu();
                    }} key={pokemonIndex} className={`nav-card ${pokemonIndex === selectedPokemon ? 'nav-card-selected' : ''}`}>
                        <p>{ getFullPokedexNumber(truePokedexNumber) }</p>
                        <p>{ pokemon }</p>
                    </button>
                )
            })}
        </nav>
    )
}

export default SideNav