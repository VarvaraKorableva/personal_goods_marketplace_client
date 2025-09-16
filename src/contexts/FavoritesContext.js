import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorite, setFavorite] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);

  return (
    <FavoritesContext.Provider value={{ favorite, setFavorite, favoriteItems, setFavoriteItems }}>
      {children}
    </FavoritesContext.Provider>
  );
};
