import React, { useRef, useContext } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { StaticContext } from '../../Contexts/StaticContext';

function Search() {
    const searchRef = useRef<HTMLInputElement|null>(null);

    const {website} = useContext(StaticContext);

    const search = () => {
        if(searchRef === null){return;}
        if(searchRef.current === null){return;}

        window.location.assign(`${website}/search?search=${searchRef.current.value}`);
    }

    return(
        <div>
            <Form 
                onSubmit={(e)=>{
                e.preventDefault();
                search();
                }} 
                className="d-flex">
                
                <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                ref={searchRef}
                />
                <Button onClick={()=>search()} variant="outline-success">Search</Button>
            </Form>
        </div>
    )
}

export default Search;
