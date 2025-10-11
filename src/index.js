import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './Fonts/font.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ItemsProvider } from "./contexts/ItemsContext";
import { FavoritesProvider } from "./contexts/FavoritesContext"
import { FiltersProvider } from "./contexts/FiltersContext"
import { LanguageProvider } from "./contexts/TranslationContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LanguageProvider>
  <ItemsProvider>
    <FiltersProvider>
    <FavoritesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FavoritesProvider>
    </FiltersProvider>
  </ItemsProvider>
  </LanguageProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
