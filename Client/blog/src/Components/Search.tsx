import React, { useRef } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';

function Search() {
    const searchRef = useRef<HTMLInputElement|null>(null);

    const search = () => {
        if(searchRef === null){return;}

        console.log(searchRef?.current?.value);
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
