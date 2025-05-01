import React from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

function SearchBar() {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value;
    navigate(`/search?query=${query}`);
  };

  return (
    <Form className="d-flex" onSubmit={handleSearch}>
      <FormControl
        type="search"
        placeholder="Search..."
        className="me-2"
        aria-label="Search"
        name="search"  // Form input name to target the value easily
      />
      <button type="submit" className="btn btn-light" onSubmit={handleSearch}>
        <FaSearch />
      </button>
    </Form>
  );
}

export default SearchBar;