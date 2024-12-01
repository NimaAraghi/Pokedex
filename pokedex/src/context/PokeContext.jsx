import React, { createContext, useState } from 'react'

export const PokeContext = createContext();

const PokeContextProvider = (props) => {
  const [selectedPokemon, setSelectedPokemon] = useState(0);
  const [showSideMenu, setShowSideMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowSideMenu(!showSideMenu);
  };

  const handleCloseMenu = () => {
    setShowSideMenu(false);
  };

  const value = {
    selectedPokemon, setSelectedPokemon,
    showSideMenu, setShowSideMenu,
    handleToggleMenu, handleCloseMenu,
  }

    return (
        <PokeContext.Provider value={value}>
            { props.children }
        </PokeContext.Provider>
    )
}

export default PokeContextProvider;