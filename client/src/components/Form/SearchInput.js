import React from 'react';
import { useSearch } from '../../context/search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchInput() {
  const [values, setValues] = useSearch(); 
  const navigate = useNavigate(); 

  // Handle search submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword.trim()}`;
        const { data } = await axios.get(API_BASE_URL);
      
        console.log("Fetched Data:", data.data);
      
        setValues((prev) => ({ ...prev, results: data.data }));
      
        console.log("Updated Context State:", values); 
      
        navigate("/search"); 
      } catch (error) {
        console.error("Error fetching search results:", error.message);
      }
      
      
  };
  
  return (
    <div className='search-container'>
    <form className='unique-search-container' onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search"
        value={values.keyword}
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        className="unique-search-input"
      />
      <button type="submit" className="unique-search-button">
        <i className="ri-search-line"></i>
      </button>
    </form>
  </div>
  
  
  );
}

export default SearchInput;
