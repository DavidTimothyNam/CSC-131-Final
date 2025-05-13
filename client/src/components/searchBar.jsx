import React, { useEffect, useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState(''); // Local state to hold search input

  // Sync the query from the URL with the input field
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryParam = queryParams.get('query') || ''; // Get query from URL
    setQuery(queryParam); // Update state with query from URL
  }, [location.search]); // Effect will run when the location (URL) changes

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${query}`); // Update URL with the search query
  };

  return (
    <Form className="d-flex" onSubmit={handleSearch}>
      <FormControl
        type="search"
        placeholder="Search..."
        className="me-2"
        aria-label="Search"
        value={query} // Set the value to the query state
        onChange={(e) => setQuery(e.target.value)} // Update local state when user types
      />
      <button type="submit" className="btn btn-light buttonDark">
        <FaSearch />
      </button>
    </Form>
  );
}

export default SearchBar;
