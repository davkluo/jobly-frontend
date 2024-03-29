import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './SearchForm.css';

const DEFAULT_SEARCH_FORM_DATA = { searchTerm: '' };

/** Search Form
 *
 * Props:
 * - search - function to search Jobs or Companies
 * - message - message to display in search input
 *
 * { CompaniesPage, JobsPage } -> SearchForm
*/

function SearchForm({ search, message="Enter Search Term..." }) {
  const [formData, setFormData] = useState(DEFAULT_SEARCH_FORM_DATA);

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  }

  /** Call parent function and clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    search(formData.searchTerm);
    setFormData(DEFAULT_SEARCH_FORM_DATA);
  }

  return (
    <Container>
      <Row>
        <Col lg={5} md={7} sm={8} xs={10} className="mx-auto">
          <Form className="SearchForm mt-4 mb-3" onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
            <Form.Control
              id="search"
              name="searchTerm"
              placeholder={message}
              onChange={ handleChange }
              value={ formData.searchTerm }
              aria-label="Search Term"
              className='bg-dark'
            />
            <Button
              type='submit'
              className='searchBtn text-dark'
              variant='light'
            >
              Search
            </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SearchForm;
