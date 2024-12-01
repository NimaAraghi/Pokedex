import React, { useContext } from 'react'
import { first151Pokemon, getFullPokedexNumber } from '../utils/index'
import { PokeContext } from '../context/PokeContext';

const SideNav = () => {
    const {selectedPokemon, setSelectedPokemon} = useContext(PokeContext);
    return (
        <nav>
            <div className={`header`}>
                <h1 className='text-gradient'>Pokédex</h1>
            </div>
            <input type="text" />
            {first151Pokemon.map((pokemon, pokemonIndex) => {
                return (
                    <button onClick={() => setSelectedPokemon(pokemonIndex)} key={pokemonIndex} className={`nav-card`}>
                        <p>{ getFullPokedexNumber(pokemonIndex) }</p>
                        <p>{ pokemon }</p>
                    </button>
                )
            })}
        </nav>
    )
}

export default SideNav