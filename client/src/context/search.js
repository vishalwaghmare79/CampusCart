import React, { createContext, useContext, useState } from 'react';

// Create SearchContext
const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [values, setValues] = useState({
    keyword: '', 
    results: [], 
  });

  return (
    <SearchContext.Provider value={[values, setValues]}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to use the SearchContext
const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export { useSearch, SearchProvider };
