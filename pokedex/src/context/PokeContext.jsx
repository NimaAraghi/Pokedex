import React, { createContext, useState } from 'react'

export const PokeContext = createContext();

const PokeContextProvider = (props) => {
  const [selectedPokemon, setSelectedPokemon] = useState(0);

  const value = {
    selectedPokemon, setSelectedPokemon,
  }

    return (
        <PokeContext.Provider value={value}>
            { props.children }
        </PokeContext.Provider>
    )
}

export default PokeContextProvider;