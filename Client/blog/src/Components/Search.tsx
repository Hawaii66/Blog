import React from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';

function Search() {
    return(
        <Form className="d-flex">
            <FormControl
            type="search"
            placeholder="Sök: Användare / blog"
            className="me-2"
            aria-label="Search"
            />
            <Button variant="outline-success">Sök</Button>
        </Form>
    )
}

export default Search;
